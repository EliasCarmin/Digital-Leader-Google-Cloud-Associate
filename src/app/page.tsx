import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Trophy, Heart, Code2, Mail, ArrowRight } from "lucide-react";
import { PROVIDERS } from "@/lib/certifications";

export default function Home() {
    return (
        <div className="flex flex-col items-center">
            {/* Hero Section */}
            <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-50 dark:bg-slate-900 border-b relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-google-blue via-google-red to-google-yellow"></div>
                <div className="container px-4 md:px-6 relative z-10">
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
                                Cloud Certifications <span className="text-google-blue">Prep</span>
                            </h1>
                            <p className="mx-auto max-w-[800px] text-gray-500 md:text-xl dark:text-gray-400 font-medium">
                                La plataforma definitiva para preparar tus certificaciones en la nube.
                                Estudia GCP, Azure y más con preguntas reales, simuladores y explicaciones detalladas.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-4 justify-center pt-4">
                            <div className="relative group">
                                <Link href="/study">
                                    <Button size="lg" className="h-14 px-10 text-lg bg-google-blue hover:bg-google-blue/90 shadow-lg shadow-google-blue/20">
                                        <BookOpen className="mr-2 h-6 w-6" />
                                        Modo Estudio
                                    </Button>
                                </Link>
                                <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-64 p-3 bg-white dark:bg-slate-800 rounded-xl shadow-xl border-2 border-google-blue/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                        Practica a tu ritmo con retroalimentación inmediata y explicaciones detalladas.
                                    </p>
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white dark:border-t-slate-800"></div>
                                </div>
                            </div>

                            <div className="relative group">
                                <Link href="/exam">
                                    <Button variant="outline" size="lg" className="h-14 px-10 text-lg border-2 border-google-gray/20 hover:bg-slate-100 transition-all">
                                        <Clock className="mr-2 h-6 w-6 text-google-red" />
                                        Simulador de Examen
                                    </Button>
                                </Link>
                                <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-64 p-3 bg-white dark:bg-slate-800 rounded-xl shadow-xl border-2 border-google-red/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                        Ponte a prueba con un examen cronometrado en condiciones reales.
                                    </p>
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white dark:border-t-slate-800"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="w-full py-20 bg-white dark:bg-slate-950">
                <div className="container px-4 md:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">¿Por qué usar esta plataforma?</h2>
                        <div className="h-1 w-20 bg-google-yellow mx-auto rounded-full"></div>
                    </div>
                    <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
                        <Card className="border-t-4 border-t-google-blue hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <CardHeader>
                                <div className="bg-google-blue/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                                    <BookOpen className="h-8 w-8 text-google-blue" />
                                </div>
                                <CardTitle className="text-2xl">Aprendizaje Estructurado</CardTitle>
                                <CardDescription className="text-base pt-2">
                                    Repasa conceptos clave con explicaciones detalladas y precisas para cada pregunta del banco de datos.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="border-t-4 border-t-google-red hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <CardHeader>
                                <div className="bg-google-red/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                                    <Clock className="h-8 w-8 text-google-red" />
                                </div>
                                <CardTitle className="text-2xl">Simulación Real</CardTitle>
                                <CardDescription className="text-base pt-2">
                                    Practica con cronómetro y un formato idéntico al del examen oficial. Cubre GCP y Azure.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="border-t-4 border-t-google-green hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <CardHeader>
                                <div className="bg-google-green/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                                    <Trophy className="h-8 w-8 text-google-green" />
                                </div>
                                <CardTitle className="text-2xl">Objetivo: Certificado</CardTitle>
                                <CardDescription className="text-base pt-2">
                                    Diseñado para que logres el puntaje necesario para aprobar y obtener tu insignia oficial.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Multi-Cloud Certifications Section */}
            <section className="w-full py-20 bg-slate-50 dark:bg-slate-900">
                <div className="container px-4 md:px-6">
                    <div className="text-center mb-12 space-y-3">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Elige tu Certificación</h2>
                        <p className="text-muted-foreground text-lg max-w-xl mx-auto">Selecciona el proveedor de nube y el examen que deseas dominar.</p>
                        <div className="h-1 w-20 bg-azure-blue mx-auto rounded-full"></div>
                    </div>
                    <div className="space-y-10">
                        {PROVIDERS.map((provider) => (
                            <div key={provider.slug} className="space-y-5">
                                <div className="flex items-center gap-3">
                                    <div className="h-7 w-1.5 rounded-full" style={{ backgroundColor: provider.color }} />
                                    <h3 className="text-xl font-black">{provider.fullName}</h3>
                                </div>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                                    {provider.exams.map((exam) => (
                                        <Card
                                            key={exam.slug}
                                            className="overflow-hidden border-2 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
                                        >
                                            <div className="h-1 w-full" style={{ backgroundColor: provider.color }} />
                                            <CardHeader className="pb-2 pt-5">
                                                <div className="flex justify-between items-start">
                                                    <CardTitle className="text-lg font-black">{exam.name}</CardTitle>
                                                    {exam.available ? (
                                                        <Badge className="text-white text-xs" style={{ backgroundColor: provider.color }}>Disponible</Badge>
                                                    ) : (
                                                        <Badge variant="secondary" className="text-xs">Próximamente</Badge>
                                                    )}
                                                </div>
                                                <CardDescription className="font-medium">{exam.fullName}</CardDescription>
                                            </CardHeader>
                                            <CardContent className="flex-1 pb-5">
                                                <p className="text-sm text-muted-foreground mb-4">{exam.description}</p>
                                                <div className="flex items-center gap-3">
                                                    {exam.available ? (
                                                        <>
                                                            <Link href={`/study/${provider.slug}/${exam.slug}`} className="flex-1">
                                                                <Button className="w-full font-bold group text-white" style={{ backgroundColor: provider.color }}>
                                                                    <BookOpen className="mr-2 h-4 w-4" />
                                                                    Estudiar
                                                                    <ArrowRight className="ml-auto h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                                                                </Button>
                                                            </Link>
                                                            <Link href={`/exam/${provider.slug}/${exam.slug}`}>
                                                                <Button variant="outline" className="font-bold border-2" style={{ borderColor: provider.color, color: provider.color }}>
                                                                    <Clock className="h-4 w-4" />
                                                                </Button>
                                                            </Link>
                                                        </>
                                                    ) : (
                                                        <Button disabled className="w-full font-bold">Próximamente</Button>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Creator Section */}
            <section className="w-full py-20 bg-white dark:bg-slate-950 border-y">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto">
                        <div className="relative">
                            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-2xl relative z-10">
                                <img
                                    src="https://eliascarmin.github.io/Mi_Portafolio/assets/Elias-2d3a71c9.jpg"
                                    alt="Elias Carmin"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -top-4 -left-4 w-24 h-24 bg-google-blue rounded-full opacity-20 animate-pulse"></div>
                            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-google-yellow rounded-full opacity-20"></div>
                        </div>

                        <div className="flex-1 text-center md:text-left space-y-6">
                            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-google-blue/10 text-google-blue text-sm font-bold uppercase tracking-wider">
                                <Code2 className="h-4 w-4" />
                                <span>Desarrollador del Proyecto</span>
                            </div>
                            <h2 className="text-4xl font-bold tracking-tight">Elias Carmin</h2>
                            <p className="text-lg text-gray-500 dark:text-gray-400">
                                Apasionado por la tecnología cloud y los datos. He creado esta herramienta gratuita
                                para ayudar a la comunidad hispana a prepararse mejor para su camino en la nube.
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                <Link href="/study">
                                    <Button className="bg-google-blue hover:bg-google-blue/90 text-white font-bold h-12 px-8 shadow-lg shadow-google-blue/20">
                                        Comenzar a Estudiar
                                    </Button>
                                </Link>
                                <Link href="https://www.linkedin.com/in/elias-carmin/" target="_blank">
                                    <Button variant="outline" className="h-12 px-8 border-2 font-bold border-google-blue text-google-blue hover:bg-google-blue/5">
                                        LinkedIn
                                    </Button>
                                </Link>
                                <Link href="mailto:eliasjesuscarmin@gmail.com">
                                    <Button variant="outline" className="h-12 px-8 border-2 font-bold border-google-red text-google-red hover:bg-google-red/5 gap-2">
                                        <Mail className="h-4 w-4" />
                                        Asesorías
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Donation Section */}
            <section id="donate" className="w-full py-20 bg-slate-50 dark:bg-slate-900">
                <div className="container px-4 md:px-6">
                    <div className="max-w-3xl mx-auto text-center space-y-8">
                        <div className="space-y-4">
                            <div className="bg-google-red/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Heart className="h-10 w-10 text-google-red fill-google-red/20" />
                            </div>
                            <h2 className="text-4xl font-bold tracking-tight">Apoya el Proyecto</h2>
                            <p className="text-xl text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                                Si esta herramienta te ha sido útil, considera hacer una donación para mantener este recurso gratuito y actualizado.
                            </p>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2 mt-12">
                            <Card className="p-8 border-2 hover:border-google-blue/50 transition-colors">
                                <div className="space-y-4">
                                    <div className="inline-block px-4 py-1 rounded-full bg-google-blue/10 text-google-blue text-sm font-bold">
                                        PERÚ 🇵🇪
                                    </div>
                                    <h3 className="text-2xl font-bold">Yape / Plin</h3>
                                    <p className="text-3xl font-mono tracking-wider font-bold text-google-blue">956 224 010</p>
                                    <p className="text-muted-foreground">Elias Carmin</p>
                                </div>
                            </Card>

                            <Card className="p-8 border-2 hover:border-google-blue/50 transition-colors flex flex-col justify-center">
                                <div className="space-y-4">
                                    <div className="inline-block px-4 py-1 rounded-full bg-google-blue/10 text-google-blue text-sm font-bold">
                                        GLOBAL 🌎
                                    </div>
                                    <h3 className="text-2xl font-bold">PayPal</h3>
                                    <Link href="https://paypal.me/eliascarmin" target="_blank" className="block p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-all group">
                                        <p className="text-lg font-medium text-blue-600 group-hover:scale-105 transition-transform">paypal.me/eliascarmin</p>
                                    </Link>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
