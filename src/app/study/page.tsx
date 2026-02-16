"use client"

import * as React from "react"
import { getQuestions, Question } from "@/lib/data"
import { StudySession } from "@/components/feature/StudySession"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ChevronLeft, BookOpen, Loader2 } from "lucide-react"

import { ExitButton } from "@/components/feature/ExitButton"

export default function StudyPage() {
    const [selectedQuestions, setSelectedQuestions] = React.useState<Question[]>([])
    const [loading, setLoading] = React.useState(false) // Start false, only load when count selected
    const [countSelected, setCountSelected] = React.useState<number | null>(null)
    const [error, setError] = React.useState<string | null>(null)

    const startStudy = async (count: number) => {
        setLoading(true)
        setError(null)
        try {
            const data = await getQuestions(count)
            if (data.length === 0) {
                setError("No se encontraron preguntas para la cantidad seleccionada.")
            } else {
                setSelectedQuestions(data)
                setCountSelected(count)
            }
        } catch (err) {
            setError("Error al cargar las preguntas. Intenta de nuevo.")
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
                <div className="text-center space-y-4">
                    <Loader2 className="h-12 w-12 animate-spin text-google-blue mx-auto" />
                    <p className="text-lg font-medium text-muted-foreground">Cargando preguntas...</p>
                </div>
            </div>
        )
    }

    // Initial selection screen

    const startStudyAction = (count: number) => {
        startStudy(count)
    }

    if (!countSelected) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-2xl space-y-8 text-center">
                    <div className="space-y-2">
                        <div className="bg-google-blue/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <BookOpen className="h-10 w-10 text-google-blue" />
                        </div>
                        <h1 className="text-4xl font-extrabold tracking-tight">Modo Estudio</h1>
                        <p className="text-xl text-muted-foreground max-w-lg mx-auto">
                            Elige cuántas preguntas deseas resolver para esta sesión de práctica.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                        {[5, 10, 30, 60].map((num) => (
                            <Button
                                key={num}
                                onClick={() => startStudyAction(num)}
                                disabled={loading}
                                className="h-24 text-2xl font-black bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-700 hover:border-google-blue hover:bg-google-blue/5 transition-all shadow-sm"
                            >
                                {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : num}
                            </Button>
                        ))}
                    </div>

                    {error && (
                        <p className="text-google-red font-medium mt-4">{error}</p>
                    )}

                    <div className="pt-4">
                        <Link href="/">
                            <Button variant="ghost" className="font-bold text-muted-foreground">
                                <ChevronLeft className="mr-2 h-4 w-4" />
                                Cancelar y volver
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
            <div className="container py-4 flex flex-col items-start gap-2">
                <button
                    onClick={() => setCountSelected(null)}
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground font-medium"
                >
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Cambiar cantidad
                </button>
                <ExitButton variant="outline" className="h-9 px-4 text-sm" />
            </div>
            <StudySession questions={selectedQuestions} />
        </div>
    )
}
