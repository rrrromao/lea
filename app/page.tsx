"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { SearchHero } from "@/components/search-hero"
import { SearchFilters } from "@/components/search-filters"
import { ActivityGrid } from "@/components/activity-grid"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SlidersHorizontal } from "lucide-react"
import { planosDeAula } from "@/lib/data"
import type { Filtros } from "@/lib/types"

export default function Home() {
  const [filtros, setFiltros] = useState<Filtros>({
    busca: "",
    linguagens: [],
    faixasEtarias: [],
    recursos: [],
    conteudos: [],
  })

  const atividadesFiltradas = useMemo(() => {
    return planosDeAula.filter((atividade) => {
      // Busca por texto
      if (filtros.busca) {
        const termoBusca = filtros.busca.toLowerCase()
        const textoCompleto = [
          atividade.titulo,
          atividade.descricao,
          ...atividade.conteudos,
          ...atividade.objetivos,
        ]
          .join(" ")
          .toLowerCase()

        if (!textoCompleto.includes(termoBusca)) {
          return false
        }
      }

      // Filtro por linguagem
      if (
        filtros.linguagens.length > 0 &&
        !filtros.linguagens.includes(atividade.linguagemArtistica)
      ) {
        return false
      }

      // Filtro por faixa etária
      if (
        filtros.faixasEtarias.length > 0 &&
        !filtros.faixasEtarias.includes(atividade.faixaEtaria)
      ) {
        return false
      }

      // Filtro por recursos
      if (
        filtros.recursos.length > 0 &&
        !filtros.recursos.some((r) => atividade.recursos.includes(r))
      ) {
        return false
      }

      // Filtro por conteúdos
      if (
        filtros.conteudos.length > 0 &&
        !filtros.conteudos.some((c) => atividade.conteudos.includes(c))
      ) {
        return false
      }

      return true
    })
  }, [filtros])

  const temFiltrosAtivos =
    filtros.linguagens.length > 0 ||
    filtros.faixasEtarias.length > 0 ||
    filtros.recursos.length > 0 ||
    filtros.conteudos.length > 0

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SearchHero
        busca={filtros.busca}
        onBuscaChange={(busca) => setFiltros({ ...filtros, busca })}
        totalResultados={atividadesFiltradas.length}
      />

      <main className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filtros - Desktop */}
          <div className="hidden w-64 shrink-0 lg:block">
            <SearchFilters filtros={filtros} onFiltrosChange={setFiltros} />
          </div>

          {/* Conteúdo principal */}
          <div className="flex-1">
            {/* Filtros - Mobile */}
            <div className="mb-4 flex items-center justify-between lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    Filtros
                    {temFiltrosAtivos && (
                      <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                        {filtros.linguagens.length +
                          filtros.faixasEtarias.length +
                          filtros.recursos.length +
                          filtros.conteudos.length}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 overflow-y-auto">
                  <div className="mt-6">
                    <SearchFilters filtros={filtros} onFiltrosChange={setFiltros} />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <ActivityGrid atividades={atividadesFiltradas} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer id="sobre" className="border-t border-border bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold">Sobre o PlanosEdu</h2>
            <p className="mt-4 text-muted-foreground">
            Parque de Planos é um repositório colaborativo de planos de aula para professores 
              de Arte criado pelo Laboratório de Ensino da Arte da Uerj. Nossa missão é facilitar o acesso a atividades de qualidade para 
              as Artes, ajudando educadores a enriquecer 
              suas aulas e inspirar seus alunos.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Desenvolvido com carinho para a comunidade educacional.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
