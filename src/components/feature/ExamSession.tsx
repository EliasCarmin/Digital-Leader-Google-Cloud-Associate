"use client"

import * as React from "react"
import { Question } from "@/lib/data"
import { QuestionCard } from "@/components/feature/QuestionCard"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChevronRight, ChevronLeft, Clock, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface ExamSessionProps {
    questions: Question[]
}

const EXAM_DURATION_MINUTES = 90

export function ExamSession({ questions }: ExamSessionProps) {
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const [selectedAnswers, setSelectedAnswers] = React.useState<Record<number, string | string[]>>({})
    const [isFinished, setIsFinished] = React.useState(false)
    const [timeLeft, setTimeLeft] = React.useState(EXAM_DURATION_MINUTES * 60)
    const [score, setScore] = React.useState(0)

    React.useEffect(() => {
        if (isFinished) return

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer)
                    finishExam()
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [isFinished])

    const currentQuestion = questions[currentIndex]
    const totalQuestions = questions.length

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, "0")}`
    }

    const handleAnswerChange = (answer: string | string[]) => {
        setSelectedAnswers((prev) => ({
            ...prev,
            [currentQuestion.number_id]: answer,
        }))
    }

    const finishExam = () => {
        let correctCount = 0
        questions.forEach((q) => {
            const userAns = selectedAnswers[q.number_id]
            if (Array.isArray(userAns)) {
                // Multi-select check (exact match?? or partial?) usually exact match of all letters
                // Normalize userAns to string "ABC" sorted?
                // q.correct_answer is string "AC"
                const userAnsString = [...userAns].sort().join("")
                const correctString = q.correct_answer.split("").sort().join("")
                if (userAnsString === correctString) correctCount++
            } else {
                if (userAns === q.correct_answer) correctCount++
            }
        })
        setScore(Math.round((correctCount / totalQuestions) * 100))
        setIsFinished(true)
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

    if (isFinished) {
        const passed = score >= 70 // Google usually 70%?
        return (
            <div className="container max-w-2xl py-10">
                <Card className="text-center">
                    <CardHeader>
                        <CardTitle className="text-3xl">Resultado del Examen</CardTitle>
                        <CardDescription>Has completado el simulador.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="text-6xl font-bold font-mono">
                            {score}%
                        </div>
                        <div className={passed ? "text-green-600 font-bold text-xl" : "text-red-600 font-bold text-xl"}>
                            {passed ? "¡APROBADO!" : "NO APROBADO"}
                        </div>
                        <p className="text-muted-foreground">
                            Se requiere 70% para aprobar.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Button onClick={() => window.location.reload()}>Intentar de Nuevo</Button>
                            <Button variant="outline" onClick={() => window.location.href = '/'}>Volver al Inicio</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="container max-w-4xl py-6 space-y-8">
            <div className="flex items-center justify-between sticky top-14 bg-background/95 backdrop-blur z-40 py-4 border-b">
                <div className="space-y-1">
                    <h2 className="text-xl font-bold tracking-tight flex items-center">
                        <Clock className="mr-2 h-5 w-5 text-primary" />
                        {formatTime(timeLeft)}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Pregunta {currentIndex + 1} de {totalQuestions}
                    </p>
                </div>
                <Button variant="destructive" size="sm" onClick={finishExam}>
                    Terminar Examen
                </Button>
            </div>

            <Progress value={(currentIndex / totalQuestions) * 100} className="h-1" />

            <QuestionCard
                question={currentQuestion}
                selectedAnswer={selectedAnswers[currentQuestion.number_id] || ""}
                onAnswerChange={handleAnswerChange}
                showFeedback={false}
                className="mt-4"
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
                <div className="flex gap-2">
                    {currentIndex === totalQuestions - 1 ? (
                        <Button onClick={finishExam} className="bg-green-600 hover:bg-green-700">
                            Finalizar
                        </Button>
                    ) : (
                        <Button onClick={handleNext}>
                            Siguiente
                            <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}
