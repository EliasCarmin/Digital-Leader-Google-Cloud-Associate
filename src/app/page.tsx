import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Clock, Trophy, Heart } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-50 dark:bg-slate-900 border-b">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Google Cloud <span className="text-primary">Digital Leader</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Prepárate para la certificación con nuestro modo de estudio y simulador de examen.
                Basado en preguntas reales y actualizadas.
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/study">
                <Button size="lg" className="h-12 px-8">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Modo Estudio
                </Button>
              </Link>
              <Link href="/exam">
                <Button variant="outline" size="lg" className="h-12 px-8">
                  <Clock className="mr-2 h-5 w-5" />
                  Simulador de Examen
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
            <Card>
              <CardHeader>
                <BookOpen className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Aprendizaje Estructurado</CardTitle>
                <CardDescription>
                  Repasa conceptos clave con explicaciones detalladas para cada pregunta.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Clock className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Simulación Real</CardTitle>
                <CardDescription>
                  Practica con un cronómetro y formato similar al del examen oficial.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Trophy className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Sigue tu Progreso</CardTitle>
                <CardDescription>
                  Evalúa tu preparación y enfócate en las áreas que necesitas mejorar.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section id="donate" className="w-full py-12 md:py-24 lg:py-32 bg-slate-50 dark:bg-slate-900 border-t">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <Heart className="h-12 w-12 text-red-500 mx-auto" />
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Apoya el Proyecto</h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Si esta herramienta te ha sido útil, considera hacer una donación para mantener el servidor y agregar más preguntas.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <Card className="p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">Yape / Plin</h3>
                  <p className="text-2xl font-mono">999 999 999</p>
                  <p className="text-sm text-muted-foreground">Elias Carmin</p>
                </div>
              </Card>
              <Card className="p-6 mt-4">
                <div className="space-y-2">
                  <h3 className="font-bold">PayPal</h3>
                  <p className="text-sm text-blue-500 underline cursor-pointer">paypal.me/eliascarmin</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
