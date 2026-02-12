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
            return "bg-google-green/10 border-google-green text-google-green font-bold shadow-sm shadow-google-green/10"
        }
        if (isSelected(optionLetter) && !isCorrect(optionLetter)) {
            return "bg-google-red/10 border-google-red text-google-red font-bold shadow-sm shadow-google-red/10"
        }
        return "opacity-50"
    }

    return (
        <Card className={cn("w-full max-w-3xl mx-auto overflow-hidden border-2 shadow-lg", className)}>
            <div className="h-1.5 w-full bg-gradient-to-r from-google-blue via-google-red to-google-yellow"></div>
            <CardHeader className="pt-8 px-8">
                <CardTitle className="text-2xl font-bold leading-tight">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 text-google-blue mr-3 text-sm">
                        {question.number_id}
                    </span>
                    {question.question}
                </CardTitle>
                <CardDescription className="text-base pt-2 font-medium">
                    {isMultiSelect ? (
                        <span className="text-google-red">Selecciona múltiples opciones (Casillas)</span>
                    ) : (
                        <span className="text-google-blue">Selecciona una sola opción (Radio)</span>
                    )}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 px-8 py-6">
                {isMultiSelect ? (
                    <div className="grid gap-4">
                        {question.alternatives.map((alt, index) => {
                            const letter = getLetter(index)
                            return (
                                <div
                                    key={index}
                                    className={cn(
                                        "flex items-start space-x-4 rounded-xl border-2 p-5 transition-all duration-200 cursor-pointer",
                                        isSelected(letter) ? "border-google-blue bg-google-blue/5" : "hover:border-slate-300 hover:bg-slate-50",
                                        getOptionStyle(letter)
                                    )}
                                    onClick={() => !showFeedback && handleCheckboxChange(letter, !isSelected(letter))}
                                >
                                    <Checkbox
                                        id={`q-${question.number_id}-${index}`}
                                        checked={isSelected(letter)}
                                        className="mt-1 border-2 border-slate-300 data-[state=checked]:bg-google-blue data-[state=checked]:border-google-blue"
                                        disabled={showFeedback}
                                    />
                                    <Label
                                        htmlFor={`q-${question.number_id}-${index}`}
                                        className="flex-1 cursor-pointer font-medium text-lg leading-relaxed select-none"
                                    >
                                        <span className="font-extrabold mr-3 opacity-60">{letter}.</span>
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
                        className="grid gap-4"
                        disabled={showFeedback}
                    >
                        {question.alternatives.map((alt, index) => {
                            const letter = getLetter(index)
                            return (
                                <div
                                    key={index}
                                    className={cn(
                                        "flex items-start space-x-4 rounded-xl border-2 p-5 transition-all duration-200 cursor-pointer",
                                        isSelected(letter) ? "border-google-blue bg-google-blue/5" : "hover:border-slate-300 hover:bg-slate-50",
                                        getOptionStyle(letter)
                                    )}
                                    onClick={() => !showFeedback && handleRadioChange(letter)}
                                >
                                    <RadioGroupItem
                                        value={letter}
                                        id={`q-${question.number_id}-${index}`}
                                        className="mt-1.5 border-2 border-slate-300 data-[state=checked]:border-google-blue data-[state=checked]:text-google-blue"
                                    />
                                    <Label
                                        htmlFor={`q-${question.number_id}-${index}`}
                                        className="flex-1 cursor-pointer font-medium text-lg leading-relaxed select-none"
                                    >
                                        <span className="font-extrabold mr-3 opacity-60">{letter}.</span>
                                        {alt}
                                    </Label>
                                </div>
                            )
                        })}
                    </RadioGroup>
                )}

                {showFeedback && (
                    <div className="mt-8 rounded-2xl border-2 bg-slate-50 dark:bg-slate-900 shadow-inner overflow-hidden">
                        <div className="bg-google-blue/5 px-6 py-4 flex items-center gap-3 border-b-2">
                            <HelpCircle className="h-6 w-6 text-google-blue" />
                            <h4 className="font-bold text-lg">Análisis de la Respuesta</h4>
                        </div>
                        <div className="p-6 space-y-4">
                            <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-wrap italic">
                                "{question.explanation || "No hay explicación disponible para esta pregunta."}"
                            </p>
                            <div className="flex items-center gap-3 p-4 rounded-xl bg-google-green/10 border-2 border-google-green/20">
                                <CheckCircle2 className="h-6 w-6 text-google-green" />
                                <div className="text-base">
                                    <span className="font-bold text-google-green">Respuesta Correcta:</span>
                                    <span className="ml-2 font-mono text-xl font-black">{question.correct_answer}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
            <CardFooter className="px-8 pb-8 pt-2 justify-end">
                {!showFeedback && onCheckAnswer && (
                    <Button
                        onClick={onCheckAnswer}
                        disabled={!selectedAnswer || (Array.isArray(selectedAnswer) && selectedAnswer.length === 0)}
                        size="lg"
                        className="bg-google-blue hover:bg-google-blue/90 px-8 py-6 text-lg font-bold shadow-lg shadow-google-blue/20"
                    >
                        Verificar Respuesta
                    </Button>
                )}
            </CardFooter>
        </Card>
    )
}
