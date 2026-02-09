import json
import re
from typing import List, Dict, Any

def is_alternative_line(line: str) -> bool:
    """Verifica si una línea es una alternativa (empieza con letra seguida de punto)"""
    # Patrón para alternativas con letras: A., B., C., D., etc.
    if re.match(r'^[A-Z]\.\s', line.strip()):
        return True
    return False

def find_answer_index(lines: List[str]) -> int:
    """Encuentra el índice de la línea que contiene 'Respuesta correcta:' o variantes"""
    for i, line in enumerate(lines):
        if 'Respuesta correcta:' in line or 'La respuesta correcta' in line:
            return i
    return -1

def extract_correct_answer(line: str, context_lines: List[str] = None) -> str:
    """Extrae la respuesta correcta de una línea"""
    # Buscar patrón "Respuesta correcta: X" o "Respuesta correcta: XY"
    match = re.search(r'Respuesta correcta:\s*([A-Z]+)', line)
    if match:
        return match.group(1)
    
    # Si la línea contiene "La respuesta correcta" pero no tiene el formato estándar,
    # intentar buscar en el contexto o inferir de las alternativas
    if 'La respuesta correcta' in line:
        # Buscar si hay alguna referencia a letras en el contexto
        if context_lines:
            for ctx_line in context_lines[-3:]:  # Revisar últimas 3 líneas antes
                # Buscar patrones como "respuesta B" o "opción C"
                match = re.search(r'(?:respuesta|opci[oó]n)\s+([A-Z])', ctx_line, re.IGNORECASE)
                if match:
                    return match.group(1).upper()
    
    return ""

def find_explanation_start(lines: List[str], answer_idx: int) -> int:
    """Encuentra el índice donde comienza la explicación"""
    # Buscar la palabra "Explicación" después de la respuesta
    for i in range(answer_idx + 1, len(lines)):
        if lines[i].strip().lower() == 'explicación':
            return i + 1
    # Si no hay "Explicación", la explicación empieza después de la respuesta
    # (si hay contenido después)
    if answer_idx + 1 < len(lines):
        # Saltar líneas que son marcadores especiales
        for i in range(answer_idx + 1, len(lines)):
            line = lines[i].strip()
            if line and not re.match(r'^(SOR|9SO|Entonces|La respuesta)', line, re.IGNORECASE):
                return i
    return -1

def clean_marker_lines(lines: List[str]) -> List[str]:
    """Elimina líneas que son marcadores especiales (SOR, SORPPR, etc.) pero mantiene respuestas correctas"""
    cleaned = []
    markers = ['SOR,', 'SORPPR', '9SOmPr', 'Entonces,']
    for line in lines:
        line_stripped = line.strip()
        is_marker = False
        # Solo eliminar si es un marcador Y no contiene información de respuesta
        for marker in markers:
            if marker in line_stripped and 'Respuesta correcta' not in line:
                is_marker = True
                break
        # También eliminar líneas que parecen ser ruido (muy cortas y sin sentido)
        if not is_marker and len(line_stripped) < 5 and not line_stripped.isdigit():
            # Verificar si es ruido como "C t Al 7B"
            if re.match(r'^[A-Z]\s+t\s+[A-Z]', line_stripped):
                is_marker = True
        if not is_marker:
            cleaned.append(line)
    return cleaned

def parse_question(text_lines: List[str]) -> Dict[str, Any]:
    """Parsea las líneas de texto y extrae pregunta, alternativas, respuesta y explicación"""
    # Limpiar líneas de marcadores especiales
    lines = clean_marker_lines(text_lines)
    
    # Encontrar dónde está la respuesta correcta
    answer_idx = find_answer_index(lines)
    
    if answer_idx == -1:
        # Si no hay respuesta, intentar parsear de otra manera
        return {
            "question": " ".join(lines).strip(),
            "alternatives": [],
            "correct_answer": "",
            "explanation": ""
        }
    
    # Primero buscar el final de la pregunta (generalmente termina con ?)
    question_end = -1
    for i in range(answer_idx):
        if '?' in lines[i]:
            question_end = i + 1
    
    # Buscar dónde empiezan las alternativas (líneas que empiezan con A., B., C., D., etc.)
    alternative_start_idx = -1
    for i in range(answer_idx):
        line = lines[i].strip()
        if is_alternative_line(line):
            alternative_start_idx = i
            break
    
    # Si no encontramos alternativas con letras, usar el final de la pregunta como inicio
    if alternative_start_idx == -1:
        if question_end != -1 and question_end < answer_idx:
            alternative_start_idx = question_end
        else:
            # Buscar hacia atrás desde la respuesta para encontrar el inicio de alternativas
            # Las alternativas suelen estar cerca de la respuesta y son líneas más cortas
            for i in range(answer_idx - 1, max(0, answer_idx - 15), -1):
                line = lines[i].strip()
                # Si encontramos una línea que parece ser alternativa (no es pregunta)
                if line and len(line) > 5 and len(line) < 300:
                    # Verificar si hay múltiples líneas consecutivas que podrían ser alternativas
                    consecutive_count = 0
                    for j in range(i, min(len(lines), i + 5)):
                        if j < answer_idx and lines[j].strip() and len(lines[j].strip()) > 5:
                            consecutive_count += 1
                    if consecutive_count >= 2:  # Al menos 2 líneas consecutivas
                        alternative_start_idx = i
                        break
    
    # Separar pregunta de alternativas
    if alternative_start_idx != -1:
        question_parts = lines[:alternative_start_idx]
        alternative_lines = lines[alternative_start_idx:answer_idx]
    else:
        # Si no encontramos alternativas claras, buscar el final de la pregunta
        # La pregunta generalmente termina con un signo de interrogación
        question_end = -1
        for i in range(answer_idx):
            if '?' in lines[i]:
                question_end = i + 1
        if question_end != -1:
            question_parts = lines[:question_end]
            alternative_lines = lines[question_end:answer_idx]
        else:
            # Todo hasta la respuesta es pregunta
            question_parts = lines[:answer_idx]
            alternative_lines = []
    
    # Procesar alternativas
    current_alternative = ""
    alternatives_list = []
    has_lettered_alternatives = False
    
    # Primero verificar si hay alternativas con letras
    for line in alternative_lines:
        if re.match(r'^[A-Z]\.\s', line.strip()):
            has_lettered_alternatives = True
            break
    
    for line in alternative_lines:
        line = line.strip()
        if not line:
            continue
        
        # Si la línea empieza con letra y punto, es una nueva alternativa
        if re.match(r'^[A-Z]\.\s', line):
            if current_alternative:
                alternatives_list.append(current_alternative.strip())
            current_alternative = line
        else:
            # Continuación de la alternativa anterior
            if current_alternative:
                current_alternative += " " + line
            # Si no hay alternativas con letras, tratar cada línea como una alternativa potencial
            elif not has_lettered_alternatives:
                # Verificar si es una línea que podría ser alternativa
                # Debe tener un tamaño razonable y no ser parte de la pregunta
                if len(line) > 5 and len(line) < 400:
                    # No incluir líneas que parecen ser continuación de pregunta
                    if not (line.endswith('?') or line.endswith(':')):
                        alternatives_list.append(line)
    
    # Agregar la última alternativa
    if current_alternative:
        alternatives_list.append(current_alternative.strip())
    
    # Limpiar ruido de las alternativas (eliminar texto que parece ser ruido al final)
    cleaned_alternatives = []
    for alt in alternatives_list:
        # Eliminar patrones de ruido al final como "C t Al 7B"
        alt_cleaned = re.sub(r'\s+[A-Z]\s+t\s+[A-Z]l\s+\d+[A-Z]$', '', alt)
        # Eliminar espacios múltiples
        alt_cleaned = re.sub(r'\s+', ' ', alt_cleaned).strip()
        if alt_cleaned:
            cleaned_alternatives.append(alt_cleaned)
    
    alternatives_list = cleaned_alternatives
    
    # Extraer respuesta correcta
    context_before = lines[max(0, answer_idx-3):answer_idx] if answer_idx > 0 else []
    correct_answer = extract_correct_answer(lines[answer_idx], context_before)
    
    # Si no se encontró la respuesta en la línea actual, buscar en las siguientes
    if not correct_answer and answer_idx + 1 < len(lines):
        # A veces la respuesta está en la siguiente línea
        next_line = lines[answer_idx + 1]
        if 'Respuesta correcta:' in next_line:
            correct_answer = extract_correct_answer(next_line)
            answer_idx += 1
    
    # Extraer explicación
    explanation_start = find_explanation_start(lines, answer_idx)
    explanation = ""
    if explanation_start != -1:
        explanation_parts = lines[explanation_start:]
        explanation = " ".join(explanation_parts).strip()
    
    return {
        "question": " ".join(question_parts).strip(),
        "alternatives": alternatives_list,
        "correct_answer": correct_answer,
        "explanation": explanation
    }

def transform_json(input_file: str, output_file: str):
    """Transforma el JSON de entrada a una estructura más definida"""
    with open(input_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    transformed_data = []
    
    for item in data:
        number_id = item.get('number_id', 0)
        text = item.get('text', [])
        
        parsed = parse_question(text)
        
        transformed_item = {
            "number_id": number_id,
            "question": parsed["question"],
            "alternatives": parsed["alternatives"],
            "correct_answer": parsed["correct_answer"],
            "explanation": parsed["explanation"] if parsed["explanation"] else None
        }
        
        transformed_data.append(transformed_item)
    
    # Guardar el JSON transformado
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(transformed_data, f, ensure_ascii=False, indent=2)
    
    print(f"Transformación completada. Se procesaron {len(transformed_data)} preguntas.")
    print(f"Resultado guardado en: {output_file}")

if __name__ == "__main__":
    input_file = "gcp_digital_leader_es.json"
    output_file = "gcp_digital_leader_es_transformed.json"
    
    transform_json(input_file, output_file)
