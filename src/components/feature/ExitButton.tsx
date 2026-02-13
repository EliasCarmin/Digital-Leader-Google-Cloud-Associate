"use client"

import * as React from "react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

interface ExitButtonProps {
    className?: string
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
}

export function ExitButton({ className, variant = "ghost" }: ExitButtonProps) {
    const router = useRouter()

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant={variant} className={cn("gap-2 font-bold", className)}>
                    <ArrowLeft className="h-5 w-5" />
                    Regresar
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás seguro de que quieres salir?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Se perderá todo el progreso de tu sesión actual. Volverás a la pantalla de inicio.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Continuar estudiando</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => router.push("/")}
                        className="bg-google-red hover:bg-google-red/90"
                    >
                        Salir
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
