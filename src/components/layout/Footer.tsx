import { Heart } from "lucide-react"

export function Footer() {
    return (
        <footer className="w-full border-t py-6 md:py-0">
            <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 md:px-6">
                <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        Built by{" "}
                        <a
                            href="#"
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium underline underline-offset-4"
                        >
                            GCP Digital Leader Prep
                        </a>
                        . The source code is available on{" "}
                        <a
                            href="#"
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium underline underline-offset-4"
                        >
                            GitHub
                        </a>
                        .
                    </p>
                </div>
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left flex items-center">
                    Made with <Heart className="h-4 w-4 mx-1 text-red-500 fill-current" /> for the community.
                </p>
            </div>
        </footer>
    )
}
