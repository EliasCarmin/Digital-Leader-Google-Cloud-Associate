export interface Question {
    number_id: number;
    question: string;
    options: string[];
    correct_answer: string;
    explanation: string;
    category?: string;
}

export async function getQuestions(count: number = 50, provider?: string, exam?: string): Promise<Question[]> {
    try {
        // En el futuro, usaremos provider y exam para filtrar las preguntas en la API
        // Por ahora, consumimos la API existente que devuelve preguntas de GCP
        const url = `https://eliascarmin.pythonanywhere.com/api/preguntas?count=${count}${provider ? `&provider=${provider}` : ''}${exam ? `&exam=${exam}` : ''}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // La API devuelve un array de preguntas con este formato:
        // { number_id, question, options, correct_answer, explanation }
        return data as Question[];
    } catch (error) {
        console.error("Error fetching questions:", error);
        return [];
    }
}

export async function getTotalQuestionsCount(provider?: string, exam?: string): Promise<number> {
    try {
        const url = `https://eliascarmin.pythonanywhere.com/api/preguntas/count${provider ? `?provider=${provider}` : ''}${exam ? `${provider ? '&' : '?'}exam=${exam}` : ''}`;
        const response = await fetch(url);
        if (!response.ok) return 0;
        const data = await response.json();
        return data.count || 0;
    } catch (error) {
        return 0;
    }
}
