import { Heart, Github, Globe, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

export function Footer() {
    return (
        <footer className="w-full border-t py-12 bg-slate-50 dark:bg-slate-900 mt-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col items-center md:items-start gap-4">
                        <div className="flex flex-col items-center md:items-start gap-1">
                            <Link href="/" className="font-bold text-xl flex items-center gap-2">
                                <span className="text-google-blue">GCP</span>
                                <span>Digital Leader</span>
                            </Link>
                            <p className="text-sm text-muted-foreground">
                                Una herramienta educativa para la comunidad Cloud.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground bg-white dark:bg-slate-800 px-4 py-2 rounded-full border shadow-sm">
                            <Mail className="h-4 w-4 text-google-red" />
                            <span>Asesorías: eliasjesuscarmin@gmail.com</span>
                        </div>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-3">
                        <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                            Creado por <span className="text-google-blue">Elias Carmin</span>
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="https://www.linkedin.com/in/elias-carmin/" target="_blank" rel="noreferrer" className="bg-white dark:bg-slate-800 p-2.5 rounded-xl border shadow-sm hover:border-google-blue hover:text-google-blue transition-all group">
                                <Linkedin className="h-5 w-5" />
                            </a>
                            <a href="https://github.com/eliascarmin" target="_blank" rel="noreferrer" className="bg-white dark:bg-slate-800 p-2.5 rounded-xl border shadow-sm hover:border-slate-900 dark:hover:border-white transition-all">
                                <Github className="h-5 w-5" />
                            </a>
                            <a href="https://eliascarmin.github.io/Mi_Portafolio/" target="_blank" rel="noreferrer" className="bg-white dark:bg-slate-800 p-2.5 rounded-xl border shadow-sm hover:border-google-green hover:text-google-green transition-all">
                                <Globe className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
                    <p className="text-sm text-muted-foreground flex items-center justify-center">
                        Hecho con <Heart className="h-4 w-4 mx-1 text-google-red fill-google-red" /> para la comunidad • 2026
                    </p>
                </div>
            </div>
        </footer>
    )
}
