"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
// import { ModeToggle } from "@/components/mode-toggle" // To be implemented if needed
import { LayoutDashboard, Heart, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"

export function Header() {
    const [open, setOpen] = React.useState(false)

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-14 items-center px-4 md:px-6">
                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2 group">
                        <LayoutDashboard className="h-6 w-6 text-google-blue group-hover:rotate-12 transition-transform" />
                        <span className="hidden font-bold sm:inline-block">
                            <span className="text-google-blue">GCP</span> Digital Leader
                        </span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        <Link
                            href="/study"
                            className="transition-colors hover:text-google-blue text-foreground/60"
                        >
                            Study Mode
                        </Link>
                        <Link
                            href="/exam"
                            className="transition-colors hover:text-google-red text-foreground/60"
                        >
                            Exam Simulator
                        </Link>
                        <Link
                            href="/glossary"
                            className="transition-colors hover:text-google-yellow-dark text-foreground/60"
                        >
                            Glossary
                        </Link>
                        <Link
                            href="/about"
                            className="transition-colors hover:text-google-green text-foreground/60"
                        >
                            About
                        </Link>
                    </nav>
                </div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        {/* Search or other items could go here */}
                    </div>
                    <nav className="flex items-center">
                        <Link href="#donate">
                            <Button variant="outline" size="sm" className="ml-2 hidden md:flex">
                                <Heart className="mr-2 h-4 w-4 text-red-500" />
                                Support
                            </Button>
                        </Link>

                        {/* Mobile Menu */}
                        <Sheet open={open} onOpenChange={setOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="md:hidden">
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Toggle Menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left">
                                <SheetHeader>
                                    <SheetTitle className="flex items-center gap-2">
                                        <LayoutDashboard className="h-6 w-6 text-primary" />
                                        GCP Digital Leader
                                    </SheetTitle>
                                    <SheetDescription>
                                        Herramienta de estudio para certificación.
                                    </SheetDescription>
                                </SheetHeader>
                                <div className="flex flex-col space-y-4 mt-8">
                                    <Link
                                        href="/"
                                        onClick={() => setOpen(false)}
                                        className="text-sm font-medium transition-colors hover:text-primary"
                                    >
                                        Home
                                    </Link>
                                    <Link
                                        href="/study"
                                        onClick={() => setOpen(false)}
                                        className="text-sm font-medium transition-colors hover:text-primary"
                                    >
                                        Study Mode
                                    </Link>
                                    <Link
                                        href="/exam"
                                        onClick={() => setOpen(false)}
                                        className="text-sm font-medium transition-colors hover:text-primary"
                                    >
                                        Exam Simulator
                                    </Link>
                                    <Link
                                        href="/glossary"
                                        onClick={() => setOpen(false)}
                                        className="text-sm font-medium transition-colors hover:text-primary"
                                    >
                                        Glossary
                                    </Link>
                                    <Link
                                        href="/about"
                                        onClick={() => setOpen(false)}
                                        className="text-sm font-medium transition-colors hover:text-primary"
                                    >
                                        About
                                    </Link>
                                    <Link
                                        href="#donate"
                                        onClick={() => setOpen(false)}
                                        className="text-sm font-medium transition-colors hover:text-primary flex items-center"
                                    >
                                        <Heart className="mr-2 h-4 w-4 text-red-500" />
                                        Support
                                    </Link>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </nav>
                </div>
            </div>
        </header>
    )
}
