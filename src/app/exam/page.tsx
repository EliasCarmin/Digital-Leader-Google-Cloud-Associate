import { getQuestions } from "@/lib/data"
import { ExamSession } from "@/components/feature/ExamSession"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function ExamPage() {
    const questions = getQuestions();

    if (!questions || questions.length === 0) {
        return (
            <div className="container py-10 text-center">
                <h2 className="text-xl font-bold mb-4">No se encontraron preguntas.</h2>
                <Link href="/">
                    <Button>Volver al Inicio</Button>
                </Link>
            </div>
        )
    }

    // Shuffle questions for exam mode?
    const shuffledQuestions = [...questions].sort(() => 0.5 - Math.random()).slice(0, 60);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
            <div className="container py-4">
                <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Volver
                </Link>
            </div>
            <ExamSession questions={shuffledQuestions} />
        </div>
    )
}
