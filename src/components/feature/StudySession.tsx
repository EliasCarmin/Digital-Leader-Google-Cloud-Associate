"use client"

import * as React from "react"
import { Question } from "@/lib/data"
import { QuestionCard } from "@/components/feature/QuestionCard"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChevronRight, ChevronLeft, RefreshCcw } from "lucide-react"

interface StudySessionProps {
    questions: Question[]
    providerColor?: string
}

export function StudySession({ questions, providerColor = "#4285F4" }: StudySessionProps) {
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const [selectedAnswers, setSelectedAnswers] = React.useState<Record<number, string | string[]>>({})
    const [showFeedback, setShowFeedback] = React.useState<Record<number, boolean>>({})

    const currentQuestion = questions[currentIndex]
    const totalQuestions = questions.length

    const handleAnswerChange = (answer: string | string[]) => {
        setSelectedAnswers((prev) => ({
            ...prev,
            [currentQuestion.number_id]: answer,
        }))
    }

    const toggleFeedback = () => {
        setShowFeedback((prev) => ({
            ...prev,
            [currentIndex]: !prev[currentIndex],
        }))
    }

    const handleNext = () => {
        if (currentIndex < totalQuestions - 1) {
            setCurrentIndex(prev => prev + 1)
        }
    }

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1)
        }
    }

    const progress = ((currentIndex + 1) / totalQuestions) * 100

    return (
        <div className="container max-w-4xl py-10 space-y-8 mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-950 p-6 rounded-2xl border shadow-sm">
                <div className="space-y-1">
                    <h2 className="text-2xl font-bold tracking-tight" style={{ color: providerColor }}>Modo de Estudio</h2>
                    <p className="text-muted-foreground font-medium">
                        Pregunta <span className="text-foreground font-bold">{currentIndex + 1}</span> de <span className="text-foreground font-bold">{totalQuestions}</span>
                    </p>
                </div>
                <div className="w-full md:w-1/3 space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider" style={{ color: providerColor }}>
                        <span>Progreso</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2 bg-slate-100 dark:bg-slate-800" />
                </div>
            </div>

            <div className="py-4">
                <QuestionCard
                    question={currentQuestion}
                    selectedAnswer={selectedAnswers[currentQuestion.number_id] || ""}
                    onAnswerChange={handleAnswerChange}
                    showFeedback={showFeedback[currentIndex] || false}
                    className="shadow-xl"
                />
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white dark:bg-slate-950 p-6 rounded-2xl border shadow-sm">
                <div className="flex gap-3 w-full md:w-auto">
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={handlePrevious}
                        disabled={currentIndex === 0}
                        className="flex-1 md:flex-none h-14 px-8 border-2 font-bold"
                    >
                        <ChevronLeft className="mr-2 h-5 w-5" />
                        Anterior
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={handleNext}
                        disabled={currentIndex === totalQuestions - 1}
                        className="flex-1 md:flex-none h-14 px-8 border-2 font-bold"
                    >
                        Siguiente
                        <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                    <Button
                        size="lg"
                        onClick={toggleFeedback}
                        className="flex-1 md:flex-none h-14 px-8 font-bold text-lg text-white shadow-lg"
                        style={{ backgroundColor: providerColor }}
                    >
                        <RefreshCcw className="mr-2 h-5 w-5" />
                        {showFeedback[currentIndex] ? "Ocultar Explicación" : "Verificar Respuesta"}
                    </Button>
                </div>
            </div>
        </div>
    )
}
