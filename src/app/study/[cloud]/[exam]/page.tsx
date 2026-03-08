"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import { getQuestions, type Question } from "@/lib/data"
import { getProvider, getExam, type CloudProvider, type ExamSlug } from "@/lib/certifications"
import { StudySession } from "@/components/feature/StudySession"
import { Button } from "@/components/ui/button"
import { ChevronLeft, BookOpen, Loader2 } from "lucide-react"

export default function StudyCloudPage() {
    const params = useParams()
    const router = useRouter()

    const cloudSlug = params.cloud as CloudProvider
    const examSlug = params.exam as ExamSlug

    const provider = getProvider(cloudSlug)
    const exam = getExam(cloudSlug, examSlug)

    const [selectedQuestions, setSelectedQuestions] = React.useState<Question[]>([])
    const [loading, setLoading] = React.useState(false)
    const [countSelected, setCountSelected] = React.useState<number | null>(null)
    const [error, setError] = React.useState<string | null>(null)

    if (!provider || !exam) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center space-y-4">
                    <p className="text-2xl font-bold">Certificación no encontrada.</p>
                    <Button onClick={() => router.push("/study")}>Volver al selector</Button>
                </div>
            </div>
        )
    }

    const startStudy = async (count: number) => {
        setLoading(true)
        setError(null)
        try {
            const data = await getQuestions(count, cloudSlug, examSlug)
            if (data.length === 0) {
                setError("No se encontraron preguntas. Intenta con una cantidad menor.")
            } else {
                setSelectedQuestions(data)
                setCountSelected(count)
            }
        } catch {
            setError("Error al cargar las preguntas. Intenta de nuevo.")
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
                <div className="text-center space-y-4">
                    <Loader2
                        className="h-12 w-12 animate-spin mx-auto"
                        style={{ color: provider.color }}
                    />
                    <p className="text-lg font-medium text-muted-foreground">Cargando preguntas…</p>
                </div>
            </div>
        )
    }

    // Count selection screen
    if (!countSelected) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-2xl space-y-10 text-center">
                    {/* Provider badge */}
                    <div className="space-y-3">
                        <div
                            className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4"
                            style={{ backgroundColor: `${provider.color}18` }}
                        >
                            <BookOpen className="h-10 w-10" style={{ color: provider.color }} />
                        </div>
                        <div
                            className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full text-white"
                            style={{ backgroundColor: provider.color }}
                        >
                            {provider.name}
                        </div>
                        <h1 className="text-4xl font-extrabold tracking-tight">
                            {exam.fullName}
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-lg mx-auto">
                            Elige cuántas preguntas deseas resolver en esta sesión.
                        </p>
                    </div>

                    {/* Count buttons */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[5, 10, 30, 60].map((num) => (
                            <Button
                                key={num}
                                onClick={() => startStudy(num)}
                                disabled={loading}
                                className="h-24 text-2xl font-black bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-700 hover:border-current transition-all shadow-sm"
                                style={
                                    {
                                        "--tw-ring-color": provider.color,
                                    } as React.CSSProperties
                                }
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLButtonElement).style.borderColor = provider.color
                                        ; (e.currentTarget as HTMLButtonElement).style.backgroundColor = `${provider.color}08`
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLButtonElement).style.borderColor = ""
                                        ; (e.currentTarget as HTMLButtonElement).style.backgroundColor = ""
                                }}
                            >
                                {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : num}
                            </Button>
                        ))}
                    </div>

                    {error && <p className="font-medium" style={{ color: provider.color }}>{error}</p>}

                    <Button
                        variant="ghost"
                        className="font-bold text-muted-foreground"
                        onClick={() => router.push("/study")}
                    >
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Cambiar certificación
                    </Button>
                </div>
            </div>
        )
    }

    // Active study session
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-16">
            <div className="container py-4 flex items-center gap-4 mx-auto px-4">
                <button
                    onClick={() => setCountSelected(null)}
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground font-medium transition-colors"
                >
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Cambiar cantidad
                </button>
                <div className="h-4 w-px bg-slate-200"></div>
                <button
                    onClick={() => router.push("/study")}
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground font-medium transition-colors"
                >
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Cambiar certificación
                </button>
            </div>
            <StudySession questions={selectedQuestions} providerColor={provider.color} />
        </div>
    )
}
