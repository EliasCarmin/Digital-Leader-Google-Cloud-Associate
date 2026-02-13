

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

const API_URL = "https://gcpquestions-187204921288.us-central1.run.app";

interface RawQuestion {
    id: string;
    question: string;
    alternatives: string[];
    correct_answer: string;
    explanation: string | null;
}

export const getQuestions = async (): Promise<Question[]> => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Error fetching questions: ${response.statusText}`);
        }
        const result = await response.json();

        // The API returns { data: Question[], count: number, status: "ok" }
        const questionsData: RawQuestion[] = Array.isArray(result) ? result : (result.data || []);

        return questionsData.map((q, index) => {
            // Extract a number for number_id. If q.id is a string number, use it.
            // Otherwise, try to extract from the question text (e.g. "1) ...")
            // Or just use index + 1 as fallback.
            let numId = parseInt(q.id);
            if (isNaN(numId)) {
                const match = q.question.match(/^(\d+)/);
                numId = match ? parseInt(match[1]) : index + 1;
            }

            return {
                number_id: numId,
                question: q.question,
                alternatives: Array.isArray(q.alternatives) ? q.alternatives.map((a) => a.trim()) : [],
                correct_answer: normalizeAnswer(q.correct_answer || ""),
                explanation: q.explanation
            };
        });
    } catch (error) {
        console.error("Error loading questions:", error);
        return [];
    }
};

export const getQuestionById = async (id: number): Promise<Question | undefined> => {
    const questions = await getQuestions();
    return questions.find(q => q.number_id === id);
};
