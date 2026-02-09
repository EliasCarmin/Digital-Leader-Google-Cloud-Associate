import fs from 'fs';
import path from 'path';

export interface Question {
    number_id: number;
    question: string;
    alternatives: string[];
    correct_answer: string;
    explanation: string | null;
}

// Map specific weird answers to valid ones if necessary, or logic to handle them.
// "ANUNCIO" likely means "AD" (Auto-correction of AD -> ANUNCIO in Spanish context?)
const normalizeAnswer = (answer: string): string => {
    if (answer === "ANUNCIO") return "AD";
    // Add other corrections if found
    return answer.toUpperCase().replace(/[^A-Z]/g, '');
};

export const getQuestions = (): Question[] => {
    try {
        const filePath = path.join(process.cwd(), 'src', 'data', 'gcp_digital_leader_es_transformed.json');
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const questions: Question[] = JSON.parse(fileContents);

        return questions.map(q => ({
            ...q,
            correct_answer: normalizeAnswer(q.correct_answer),
            // Clean alternatives potentially?
            alternatives: q.alternatives.map(a => a.trim())
        }));
    } catch (error) {
        console.error("Error loading questions:", error);
        return [];
    }
};

export const getQuestionById = (id: number): Question | undefined => {
    const questions = getQuestions();
    return questions.find(q => q.number_id === id);
};
