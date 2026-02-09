import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


const terms = [
    {
        term: "Compute Engine",
        definition: "Servicio de IaaS que ofrece máquinas virtuales de alto rendimiento, escalables y flexibles en la infraestructura de Google."
    },
    {
        term: "App Engine",
        definition: "Plataforma PaaS totalmente administrada para desarrollar y alojar aplicaciones web a escala sin preocuparse por la infraestructura."
    },
    {
        term: "Cloud Storage",
        definition: "Servicio de almacenamiento de objetos unificado para desarrolladores y empresas, desde datos en vivo hasta archivado de datos."
    },
    {
        term: "BigQuery",
        definition: "Almacén de datos empresarial sin servidor, altamente escalable y rentable, diseñado para agilizar el análisis de datos."
    },
    {
        term: "Cloud Pub/Sub",
        definition: "Servicio de mensajería asíncrona y escalable que desacopla los servicios que producen eventos de los servicios que los procesan."
    },
    {
        term: "Cloud IAM (Identity and Access Management)",
        definition: "Permite a los administradores autorizar quién puede realizar acciones en recursos específicos, dando control total y visibilidad."
    },
    {
        term: "VPC (Virtual Private Cloud)",
        definition: "Proporciona capacidades de red para los recursos de Google Cloud, permitiendo una red global, escalable y flexible."
    }
]

export default function GlossaryPage() {
    return (
        <div className="container py-10">
            <h1 className="text-3xl font-bold mb-6">Glosario de Términos GCP</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {terms.map((item, index) => (
                    <Card key={index} className="h-full">
                        <CardHeader className="pb-3">
                            <CardTitle>{item.term}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-base text-foreground/80">
                                {item.definition}
                            </CardDescription>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
