"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import { getQuestions, type Question } from "@/lib/data"
import { getProvider, getExam, type CloudProvider, type ExamSlug } from "@/lib/certifications"
import { ExamSession } from "@/components/feature/ExamSession"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ClipboardList, Loader2 } from "lucide-react"

export default function ExamCloudPage() {
    const params = useParams()
    const router = useRouter()

    const cloudSlug = params.cloud as CloudProvider
    const examSlug = params.exam as ExamSlug

    const provider = getProvider(cloudSlug)
    const exam = getExam(cloudSlug, examSlug)

    const [loading, setLoading] = React.useState(false)
    const [showSurvey, setShowSurvey] = React.useState(true)
    const [questions, setQuestions] = React.useState<Question[]>([])
    const [error, setError] = React.useState<string | null>(null)
    const [surveyData, setSurveyData] = React.useState({ country: "", reason: "", profession: "" })

    if (!provider || !exam) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center space-y-4">
                    <p className="text-2xl font-bold">Examen no encontrado.</p>
                    <Button onClick={() => router.push("/exam")}>Volver al selector</Button>
                </div>
            </div>
        )
    }

    const fetchQuestions = async () => {
        setLoading(true)
        setError(null)
        try {
            const data = await getQuestions(exam.questionsInExam, cloudSlug, examSlug)
            if (data.length === 0) {
                setError("No se pudieron cargar las preguntas del examen.")
            } else {
                setQuestions(data)
                setShowSurvey(false)
            }
        } catch {
            setError("Error de conexión. Intenta de nuevo.")
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
                <div className="text-center space-y-4">
                    <Loader2 className="h-12 w-12 animate-spin mx-auto" style={{ color: provider.color }} />
                    <p className="text-lg font-medium text-muted-foreground">Cargando simulador…</p>
                </div>
            </div>
        )
    }

    if (showSurvey) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4 pt-20">
                <Card className="w-full max-w-xl shadow-2xl border-2 overflow-hidden">
                    <div className="h-1.5 w-full" style={{ backgroundColor: provider.color }} />
                    <CardHeader className="text-center space-y-2 pt-8">
                        <div
                            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-2"
                            style={{ backgroundColor: `${provider.color}18` }}
                        >
                            <ClipboardList className="h-8 w-8" style={{ color: provider.color }} />
                        </div>
                        <div
                            className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mx-auto text-white"
                            style={{ backgroundColor: provider.color }}
                        >
                            {provider.name} — {exam.name}
                        </div>
                        <CardTitle className="text-3xl font-black">Antes de comenzar</CardTitle>
                        <CardDescription className="text-base">
                            Ayúdanos a mejorar completando esta breve encuesta.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 px-8 pb-8">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="country" className="font-bold">País</Label>
                                <Input
                                    id="country"
                                    placeholder="Ej. México, España, Perú..."
                                    value={surveyData.country}
                                    onChange={(e) => setSurveyData({ ...surveyData, country: e.target.value })}
                                    className="h-12 border-2"
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
                                    className="h-12 border-2"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 pt-2">
                            <Button
                                onClick={fetchQuestions}
                                disabled={loading}
                                size="lg"
                                className="h-14 text-white font-bold text-lg shadow-lg"
                                style={{ backgroundColor: provider.color }}
                            >
                                {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : "Comenzar Examen"}
                            </Button>
                            <Button
                                onClick={fetchQuestions}
                                disabled={loading}
                                variant="ghost"
                                size="lg"
                                className="h-14 font-bold text-muted-foreground"
                            >
                                Omitir
                            </Button>
                        </div>
                        {error && <p className="text-center font-medium" style={{ color: provider.color }}>{error}</p>}

                        <button
                            onClick={() => router.push("/exam")}
                            className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mt-2 mx-auto"
                        >
                            <ChevronLeft className="mr-1 h-4 w-4" />
                            Cambiar certificación
                        </button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-16">
            <ExamSession questions={questions} providerColor={provider.color} passingScore={exam.passingScore} duration={exam.duration} />
        </div>
    )
}
