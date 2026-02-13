"use client"

import * as React from "react"
import { getQuestions, Question } from "@/lib/data"
import { ExamSession } from "@/components/feature/ExamSession"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ChevronLeft, Loader2, ClipboardList } from "lucide-react"

export default function ExamPage() {
    const [allQuestions, setAllQuestions] = React.useState<Question[]>([])
    const [loading, setLoading] = React.useState(true)
    const [showSurvey, setShowSurvey] = React.useState(true)
    const [shuffledQuestions, setShuffledQuestions] = React.useState<Question[]>([])

    // Survey state
    const [surveyData, setSurveyData] = React.useState({
        country: "",
        reason: "",
        profession: ""
    })

    React.useEffect(() => {
        const fetchQuestions = async () => {
            const data = await getQuestions()
            setAllQuestions(data)
            // Preparing questions (60 for exam)
            const shuffled = [...data].sort(() => 0.5 - Math.random()).slice(0, 60)
            setShuffledQuestions(shuffled)
            setLoading(false)
        }
        fetchQuestions()
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
                <div className="text-center space-y-4">
                    <Loader2 className="h-12 w-12 animate-spin text-google-red mx-auto" />
                    <p className="text-lg font-medium text-muted-foreground">Cargando simulador...</p>
                </div>
            </div>
        )
    }

    if (!allQuestions || allQuestions.length === 0) {
        return (
            <div className="container py-10 text-center">
                <h2 className="text-xl font-bold mb-4">No se encontraron preguntas.</h2>
                <Link href="/">
                    <Button>Volver al Inicio</Button>
                </Link>
            </div>
        )
    }

    const startExam = () => {
        setShowSurvey(false)
        // Later we will send surveyData to an API
        console.log("Survey submitted:", surveyData)
    }

    const skipSurvey = () => {
        setShowSurvey(false)
    }

    if (showSurvey) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
                <Card className="w-full max-w-xl shadow-2xl border-2">
                    <CardHeader className="text-center space-y-2">
                        <div className="bg-google-red/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-2">
                            <ClipboardList className="h-8 w-8 text-google-red" />
                        </div>
                        <CardTitle className="text-3xl font-black">Antes de comenzar</CardTitle>
                        <CardDescription className="text-base">
                            Ayúdanos a mejorar completando esta breve encuesta.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="country" className="font-bold">País</Label>
                                <Input
                                    id="country"
                                    placeholder="Ej. México, España, Perú..."
                                    value={surveyData.country}
                                    onChange={(e) => setSurveyData({ ...surveyData, country: e.target.value })}
                                    className="h-12 border-2 focus-visible:ring-google-red"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="reason" className="font-bold">Motivo del examen</Label>
                                <Select onValueChange={(val) => setSurveyData({ ...surveyData, reason: val })}>
                                    <SelectTrigger className="h-12 border-2">
                                        <SelectValue placeholder="Selecciona un motivo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="certification">Obtener certificación oficial</SelectItem>
                                        <SelectItem value="job">Mejora laboral</SelectItem>
                                        <SelectItem value="learning">Aprendizaje personal</SelectItem>
                                        <SelectItem value="university">Requisito académico</SelectItem>
                                        <SelectItem value="other">Otro</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="profession" className="font-bold">Oficio/Profesión</Label>
                                <Input
                                    id="profession"
                                    placeholder="Ej. Estudiante, Desarrollador, Manager..."
                                    value={surveyData.profession}
                                    onChange={(e) => setSurveyData({ ...surveyData, profession: e.target.value })}
                                    className="h-12 border-2 focus-visible:ring-google-red"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 pt-4">
                            <Button onClick={startExam} size="lg" className="h-14 bg-google-red hover:bg-google-red/90 text-white font-bold text-lg shadow-lg shadow-google-red/20">
                                Comenzar Examen
                            </Button>
                            <Button onClick={skipSurvey} variant="ghost" size="lg" className="h-14 font-bold text-muted-foreground">
                                Omitir
                            </Button>
                        </div>
                    </CardContent>
                </Card>
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
            <ExamSession questions={shuffledQuestions} />
        </div>
    )
}
