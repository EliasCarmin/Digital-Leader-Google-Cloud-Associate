"use client"

import * as React from "react"
import { Question } from "@/lib/data"
import { QuestionCard } from "@/components/feature/QuestionCard"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChevronRight, ChevronLeft } from "lucide-react"

interface StudySessionProps {
    questions: Question[]
}

export function StudySession({ questions }: StudySessionProps) {
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const [selectedAnswers, setSelectedAnswers] = React.useState<Record<number, string | string[]>>({})
    const [showFeedback, setShowFeedback] = React.useState<Record<number, boolean>>({})

    const currentQuestion = questions[currentIndex]
    const totalQuestions = questions.length
    const progress = ((currentIndex + 1) / totalQuestions) * 100

    const handleAnswerChange = (answer: string | string[]) => {
        setSelectedAnswers((prev) => ({
            ...prev,
            [currentQuestion.number_id]: answer,
        }))
    }

    const handleCheckAnswer = () => {
        setShowFeedback((prev) => ({
            ...prev,
            [currentQuestion.number_id]: true,
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

    return (
        <div className="container max-w-4xl py-10 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-950 p-6 rounded-2xl border shadow-sm">
                <div className="space-y-1">
                    <h2 className="text-2xl font-bold tracking-tight text-google-blue">Modo de Estudio</h2>
                    <p className="text-muted-foreground font-medium">
                        Pregunta <span className="text-foreground">{currentIndex + 1}</span> de <span className="text-foreground">{totalQuestions}</span>
                    </p>
                </div>
                <div className="w-full md:w-1/3 space-y-2">
                    <div className="flex justify-between text-xs font-bold text-google-blue uppercase tracking-wider">
                        <span>Progreso</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-3 bg-google-blue/10" />
                </div>
            </div>

            <QuestionCard
                question={currentQuestion}
                selectedAnswer={selectedAnswers[currentQuestion.number_id] || ""}
                onAnswerChange={handleAnswerChange}
                showFeedback={!!showFeedback[currentQuestion.number_id]}
                onCheckAnswer={handleCheckAnswer}
            />

            <div className="flex justify-between pt-4">
                <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Anterior
                </Button>
                <Button
                    onClick={handleNext}
                    disabled={currentIndex === totalQuestions - 1}
                >
                    Siguiente
                    <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}
