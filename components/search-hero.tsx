"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface SearchHeroProps {
  busca: string
  onBuscaChange: (value: string) => void
  totalResultados: number
}

export function SearchHero({ busca, onBuscaChange, totalResultados }: SearchHeroProps) {
  return (
    <section className="border-b border-border/40 bg-muted/30">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-balance md:text-4xl lg:text-5xl">
            Encontre um plano de aula para se inspirar!
          </h1>
          <p className="mt-4 text-muted-foreground text-pretty md:text-lg">
            Explore nossa coleção de atividades para Artes: audiovisual, dança, música, teatro visuais e mais! 
            Planejadas por professores, para professores.
          </p>
          <div className="relative mt-8">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar por título, descrição ou conteúdo..."
              className="h-12 pl-12 text-base"
              value={busca}
              onChange={(e) => onBuscaChange(e.target.value)}
            />
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            {totalResultados} {totalResultados === 1 ? "atividade encontrada" : "atividades encontradas"}
          </p>
        </div>
      </div>
    </section>
  )
}
