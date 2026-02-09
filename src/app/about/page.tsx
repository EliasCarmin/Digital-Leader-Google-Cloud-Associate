import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
    return (
        <div className="container py-10 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8 text-center">Sobre la Certificación Digital Leader</h1>

            <div className="space-y-8">
                <section>
                    <h2 className="text-2xl font-semibold mb-4 text-primary">¿Qué es Google Cloud Digital Leader?</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        La certificación Google Cloud Digital Leader está diseñada para cualquier persona que desee demostrar sus conocimientos sobre los conceptos básicos de la nube y cómo los productos y servicios de Google Cloud pueden utilizarse para alcanzar los objetivos de una organización.
                    </p>
                </section>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Detalles del Examen</CardTitle>
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

                    <Card>
                        <CardHeader>
                            <CardTitle>Áreas de Conocimiento</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                                <li>Transformación digital con Google Cloud</li>
                                <li>Innovación con datos y Google Cloud</li>
                                <li>Modernización de infraestructura y aplicaciones</li>
                                <li>Seguridad y operaciones en la nube de Google</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                <section className="bg-muted p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-2">¿Por qué obtener esta certificación?</h3>
                    <p className="text-muted-foreground">
                        Esta certificación valida tu capacidad para articular las capacidades de los productos y servicios principales de Google Cloud y cómo benefician a las organizaciones. Es un excelente punto de partida para roles no técnicos o como primer paso hacia certificaciones técnicas como Associate Cloud Engineer.
                    </p>
                </section>
            </div>
        </div>
    )
}
