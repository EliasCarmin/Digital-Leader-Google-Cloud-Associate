import { getQuestions } from "@/lib/data"
import { StudySession } from "@/components/feature/StudySession"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function StudyPage() {
    const questions = getQuestions();

    if (!questions || questions.length === 0) {
        return (
            <div className="container py-10 text-center">
                <h2 className="text-xl font-bold mb-4">No se encontraron preguntas.</h2>
                <p className="text-muted-foreground mb-8">Por favor verifica la configuración de datos.</p>
                <Link href="/">
                    <Button>Volver al Inicio</Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
            <div className="container py-4">
                <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Volver
                </Link>
            </div>
            <StudySession questions={questions} />
        </div>
    )
}
