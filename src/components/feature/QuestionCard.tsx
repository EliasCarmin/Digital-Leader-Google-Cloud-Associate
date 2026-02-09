"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { CheckCircle2, XCircle, HelpCircle } from "lucide-react"
import type { Question } from "@/lib/data"

interface QuestionCardProps {
    question: Question
    selectedAnswer: string | string[]
    onAnswerChange: (answer: string | string[]) => void
    showFeedback: boolean
    onCheckAnswer?: () => void
    className?: string
}

export function QuestionCard({
    question,
    selectedAnswer,
    onAnswerChange,
    showFeedback,
    onCheckAnswer,
    className,
}: QuestionCardProps) {
    const isMultiSelect = question.correct_answer.length > 1

    // Helper to convert index to letter (0 -> A, 1 -> B)
    const getLetter = (index: number) => String.fromCharCode(65 + index)

    const handleRadioChange = (value: string) => {
        onAnswerChange(value)
    }

    const handleCheckboxChange = (value: string, checked: boolean) => {
        const currentAnswers = Array.isArray(selectedAnswer) ? selectedAnswer : []
        if (checked) {
            onAnswerChange([...currentAnswers, value])
        } else {
            onAnswerChange(currentAnswers.filter((a) => a !== value))
        }
    }

    const isCorrect = (optionLetter: string) => {
        return question.correct_answer.includes(optionLetter)
    }

    const isSelected = (optionLetter: string) => {
        if (isMultiSelect) {
            return Array.isArray(selectedAnswer) && selectedAnswer.includes(optionLetter)
        }
        return selectedAnswer === optionLetter
    }

    // Determine styling for options based on feedback
    const getOptionStyle = (optionLetter: string) => {
        if (!showFeedback) return ""

        if (isCorrect(optionLetter)) {
            return "bg-green-100 border-green-500 dark:bg-green-900/30 dark:border-green-500"
        }
        if (isSelected(optionLetter) && !isCorrect(optionLetter)) {
            return "bg-red-100 border-red-500 dark:bg-red-900/30 dark:border-red-500"
        }
        return ""
    }

    return (
        <Card className={cn("w-full max-w-3xl mx-auto", className)}>
            <CardHeader>
                <CardTitle className="text-xl font-medium leading-relaxed">
                    <span className="mr-2 text-muted-foreground">#{question.number_id}</span>
                    {question.question}
                </CardTitle>
                <CardDescription>
                    {isMultiSelect ? "Selecciona múltiples opciones." : "Selecciona una opción."}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {isMultiSelect ? (
                    <div className="grid gap-3">
                        {question.alternatives.map((alt, index) => {
                            const letter = getLetter(index)
                            return (
                                <div
                                    key={index}
                                    className={cn(
                                        "flex items-start space-x-3 rounded-md border p-4 transition-colors hover:bg-accent hover:text-accent-foreground",
                                        isSelected(letter) && "border-primary bg-accent/50",
                                        getOptionStyle(letter)
                                    )}
                                >
                                    <Checkbox
                                        id={`q-${question.number_id}-${index}`}
                                        checked={isSelected(letter)}
                                        onCheckedChange={(checked) => handleCheckboxChange(letter, checked as boolean)}
                                        disabled={showFeedback}
                                    />
                                    <Label
                                        htmlFor={`q-${question.number_id}-${index}`}
                                        className="flex-1 cursor-pointer font-normal leading-snug"
                                    >
                                        <span className="font-semibold mr-2">{letter}.</span>
                                        {alt}
                                    </Label>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <RadioGroup
                        value={selectedAnswer as string}
                        onValueChange={handleRadioChange}
                        className="grid gap-3"
                        disabled={showFeedback}
                    >
                        {question.alternatives.map((alt, index) => {
                            const letter = getLetter(index)
                            return (
                                <div
                                    key={index}
                                    className={cn(
                                        "flex items-start space-x-3 space-y-0 rounded-md border p-4 transition-colors hover:bg-accent hover:text-accent-foreground",
                                        isSelected(letter) && "border-primary bg-accent/50",
                                        getOptionStyle(letter)
                                    )}
                                >
                                    <RadioGroupItem value={letter} id={`q-${question.number_id}-${index}`} className="mt-1" />
                                    <Label
                                        htmlFor={`q-${question.number_id}-${index}`}
                                        className="flex-1 cursor-pointer font-normal leading-snug"
                                    >
                                        <span className="font-semibold mr-2">{letter}.</span>
                                        {alt}
                                    </Label>
                                </div>
                            )
                        })}
                    </RadioGroup>
                )}

                {showFeedback && (
                    <div className="mt-6 rounded-lg border bg-muted/50 p-4">
                        <div className="flex items-center gap-2 mb-2 font-semibold">
                            <HelpCircle className="h-5 w-5 text-primary" />
                            Explicación
                        </div>
                        <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">
                            {question.explanation || "No hay explicación disponible."}
                        </p>
                        <div className="mt-2 text-sm font-medium">
                            Respuesta correcta: <span className="text-green-600 dark:text-green-400">{question.correct_answer}</span>
                        </div>
                    </div>
                )}
            </CardContent>
            <CardFooter className="justify-end">
                {!showFeedback && onCheckAnswer && (
                    <Button onClick={onCheckAnswer} disabled={!selectedAnswer || selectedAnswer.length === 0}>
                        Verificar Respuesta
                    </Button>
                )}
            </CardFooter>
        </Card>
    )
}
