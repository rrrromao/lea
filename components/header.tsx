"use client"

import Link from "next/link"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex flex-col items-center gap-3 px-4 py-3 md:h-16 md:flex-row md:justify-between md:gap-4 md:py-0">
        <Link href="/" className="flex items-center">
          <img
            src="/logo-parque-de-planos.jpeg"
            alt="Parque de Planos"
            className="h-9 w-auto"
          />
        </Link>
        <nav className="grid w-full grid-cols-3 gap-x-3 gap-y-2 text-center md:w-auto md:flex md:flex-nowrap md:items-center md:gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Explorar
          </Link>
          <Link
            href="/#sobre"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Sobre
          </Link>
          <a
            href="https://www.leauerj.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Site do LEA
          </a>
          <a
            href="https://www.instagram.com/leaujerj"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Instagram do LEA
          </a>
          <a
            href="mailto:udtlea@gmail.com"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Entre em contato com o LEA
          </a>
        </nav>
      </div>
    </header>
  )
}
