import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
    return (
        <div className="container py-10 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8 text-center">Sobre la Certificación Digital Leader</h1>

            <div className="space-y-8">
                <section>
                    <h2 className="text-2xl font-semibold mb-4 text-google-blue">¿Qué es Google Cloud Digital Leader?</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        La certificación Google Cloud Digital Leader está diseñada para cualquier persona que desee demostrar sus conocimientos sobre los conceptos básicos de la nube y cómo los productos y servicios de Google Cloud pueden utilizarse para alcanzar los objetivos de una organización.
                    </p>
                </section>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="border-l-4 border-l-google-red shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-google-red">Detalles del Examen</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex justify-between border-b pb-2">
                                <span className="font-medium">Duración:</span>
                                <span>90 minutos</span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span className="font-medium">Costo:</span>
                                <span>$99 USD (puede variar)</span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span className="font-medium">Formato:</span>
                                <span>Opción múltiple / Selección múltiple</span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span className="font-medium">Idioma:</span>
                                <span>Español, Inglés, etc.</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-google-green shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-google-green">Áreas de Conocimiento</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc pl-5 space-y-1 text-muted-foreground font-medium">
                                <li className="hover:text-google-green transition-colors">Transformación digital con Google Cloud</li>
                                <li className="hover:text-google-green transition-colors">Innovación con datos y Google Cloud</li>
                                <li className="hover:text-google-green transition-colors">Modernización de infraestructura y aplicaciones</li>
                                <li className="hover:text-google-green transition-colors">Seguridad y operaciones en la nube de Google</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                <section className="bg-slate-100 dark:bg-slate-900 p-8 rounded-2xl border-2 border-dashed border-google-yellow/40">
                    <h3 className="text-xl font-bold mb-4 text-google-yellow-dark flex items-center gap-2">
                        <span className="w-2 h-8 bg-google-yellow rounded-full"></span>
                        ¿Por qué obtener esta certificación?
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                        Esta certificación valida tu capacidad para articular las capacidades de los productos y servicios principales de Google Cloud y cómo benefician a las organizaciones. Es un excelente punto de partida para roles no técnicos o como primer paso hacia certificaciones técnicas como Associate Cloud Engineer.
                    </p>
                </section>
            </div>
        </div>
    )
}
