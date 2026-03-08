"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PROVIDERS } from "@/lib/certifications"
import { BookOpen, Clock, ArrowRight, Lock } from "lucide-react"

export default function StudySelectPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-16">
            <div className="container max-w-5xl px-4 md:px-6 space-y-12 text-center mx-auto mt-14">
                {/* Header */}
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 bg-google-blue/10 text-google-blue px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest">
                        <BookOpen className="h-4 w-4" />
                        Modo Estudio
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Elige tu Certificación</h1>
                    <p className="text-xl text-muted-foreground max-w-lg mx-auto">
                        Selecciona el proveedor de nube y la certificación que deseas estudiar.
                    </p>
                </div>

                {/* Provider + Exam Grid */}
                <div className="space-y-10 text-left">
                    {PROVIDERS.map((provider) => (
                        <div key={provider.slug} className="space-y-4">
                            {/* Provider header */}
                            <div className="flex items-center gap-3">
                                <div
                                    className="h-8 w-1.5 rounded-full"
                                    style={{ backgroundColor: provider.color }}
                                />
                                <h2 className="text-2xl font-black">{provider.fullName}</h2>
                            </div>

                            {/* Exam cards */}
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {provider.exams.map((exam) => (
                                    <Card
                                        key={exam.slug}
                                        className="overflow-hidden border-2 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
                                    >
                                        <div
                                            className="h-1.5 w-full"
                                            style={{ backgroundColor: provider.color }}
                                        />
                                        <CardHeader className="pb-3 pt-6">
                                            <div className="flex items-start justify-between">
                                                <CardTitle className="text-xl font-black">{exam.name}</CardTitle>
                                                {exam.available ? (
                                                    <Badge
                                                        className="text-white text-xs font-bold"
                                                        style={{ backgroundColor: provider.color }}
                                                    >
                                                        Disponible
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="secondary" className="text-xs font-bold">
                                                        <Lock className="h-3 w-3 mr-1" /> Próximamente
                                                    </Badge>
                                                )}
                                            </div>
                                            <CardDescription className="text-base font-medium pt-1">
                                                {exam.fullName}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="flex-1">
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                {exam.description}
                                            </p>
                                            <div className="mt-4 flex items-center gap-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                                <span className="flex items-center gap-1">
                                                    <Clock className="h-3.5 w-3.5" />
                                                    {exam.duration} min
                                                </span>
                                                <span>·</span>
                                                <span>{exam.questionsInExam} preguntas</span>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="pt-0 pb-6">
                                            {exam.available ? (
                                                <Link
                                                    href={`/study/${provider.slug}/${exam.slug}`}
                                                    className="w-full"
                                                >
                                                    <Button
                                                        className="w-full h-12 font-bold text-base group text-white"
                                                        style={{ backgroundColor: provider.color }}
                                                    >
                                                        Estudiar
                                                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                                    </Button>
                                                </Link>
                                            ) : (
                                                <Button disabled className="w-full h-12 font-bold text-base">
                                                    <Lock className="mr-2 h-4 w-4" />
                                                    Próximamente
                                                </Button>
                                            )}
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
