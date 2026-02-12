"use client"

import * as React from "react"
import { Question } from "@/lib/data"
import { QuestionCard } from "@/components/feature/QuestionCard"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChevronRight, ChevronLeft, Clock, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { cn } from "@/lib/utils"

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
        const passed = score >= 70
        return (
            <div className="container max-w-2xl py-20 px-4">
                <Card className="text-center overflow-hidden border-2 shadow-2xl">
                    <div className={cn("h-2 w-full", passed ? "bg-google-green" : "bg-google-red")}></div>
                    <CardHeader className="pt-10">
                        <CardTitle className="text-4xl font-extrabold tracking-tight">Resultado Final</CardTitle>
                        <CardDescription className="text-lg">Has completado el simulador de examen.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8 p-10">
                        <div className="relative inline-flex items-center justify-center">
                            <svg className="w-40 h-40 transform -rotate-90">
                                <circle
                                    className="text-slate-100 dark:text-slate-800"
                                    strokeWidth="10"
                                    stroke="currentColor"
                                    fill="transparent"
                                    r="70"
                                    cx="80"
                                    cy="80"
                                />
                                <circle
                                    className={passed ? "text-google-green" : "text-google-red"}
                                    strokeWidth="10"
                                    strokeDasharray={440}
                                    strokeDashoffset={440 - (440 * score) / 100}
                                    strokeLinecap="round"
                                    stroke="currentColor"
                                    fill="transparent"
                                    r="70"
                                    cx="80"
                                    cy="80"
                                />
                            </svg>
                            <span className="absolute text-5xl font-black font-mono">{score}%</span>
                        </div>

                        <div className={cn(
                            "py-3 px-8 rounded-full inline-block text-2xl font-black uppercase tracking-widest mx-auto",
                            passed ? "bg-google-green/10 text-google-green border-2 border-google-green/20" : "bg-google-red/10 text-google-red border-2 border-google-red/20"
                        )}>
                            {passed ? "¡APROBADO!" : "NO APROBADO"}
                        </div>

                        <p className="text-muted-foreground text-lg">
                            Puntaje mínimo para aprobar: <span className="font-bold text-foreground">70%</span>
                        </p>

                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <Button size="lg" onClick={() => window.location.reload()} className="h-14 font-bold text-lg">
                                Intentar de Nuevo
                            </Button>
                            <Button size="lg" variant="outline" onClick={() => window.location.href = '/'} className="h-14 font-bold text-lg border-2">
                                Volver al Inicio
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="container max-w-4xl py-10 px-4 space-y-8">
            <div className="flex flex-col md:flex-row items-center justify-between sticky top-14 bg-background/95 backdrop-blur z-40 p-6 border-2 rounded-2xl shadow-lg gap-4">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 bg-google-red/10 px-4 py-2 rounded-xl border border-google-red/20">
                        <Clock className="h-6 w-6 text-google-red animate-pulse" />
                        <span className="text-2xl font-black font-mono text-google-red">{formatTime(timeLeft)}</span>
                    </div>
                    <div className="h-10 w-px bg-slate-200 hidden md:block"></div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Pregunta</span>
                        <span className="text-xl font-black">{currentIndex + 1} <span className="text-muted-foreground font-medium text-base">de {totalQuestions}</span></span>
                    </div>
                </div>
                <Button variant="destructive" size="lg" onClick={finishExam} className="font-bold px-8 shadow-lg shadow-google-red/20">
                    Terminar Examen
                </Button>
            </div>

            <Progress value={((currentIndex + 1) / totalQuestions) * 100} className="h-3 bg-slate-100" />

            <div className="py-4">
                <QuestionCard
                    question={currentQuestion}
                    selectedAnswer={selectedAnswers[currentQuestion.number_id] || ""}
                    onAnswerChange={handleAnswerChange}
                    showFeedback={false}
                    className="shadow-xl"
                />
            </div>

            <div className="flex justify-between items-center bg-white dark:bg-slate-950 p-6 rounded-2xl border-2 shadow-sm">
                <Button
                    variant="outline"
                    size="lg"
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                    className="h-14 px-8 border-2 font-bold"
                >
                    <ChevronLeft className="mr-2 h-5 w-5" />
                    Anterior
                </Button>
                <div className="flex gap-4 font-bold text-muted-foreground">
                    {currentIndex + 1} / {totalQuestions}
                </div>
                <div className="flex gap-3">
                    {currentIndex === totalQuestions - 1 ? (
                        <Button onClick={finishExam} size="lg" className="h-14 px-10 bg-google-green hover:bg-google-green/90 font-bold shadow-lg shadow-google-green/20">
                            Finalizar Examen
                        </Button>
                    ) : (
                        <Button onClick={handleNext} size="lg" className="h-14 px-10 bg-slate-900 font-bold">
                            Siguiente
                            <ChevronRight className="ml-2 h-5 w-5" />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}
