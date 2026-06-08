"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  FAIXAS_ETARIAS,
  RECURSOS_DISPONIVEIS,
  type Filtros,
} from "@/lib/types"
import { LINGUAGENS_ARTISTICAS_PADRAO } from "@/lib/data"

interface SearchFiltersProps {
  filtros: Filtros
  onFiltrosChange: (filtros: Filtros) => void
}

export function SearchFilters({ filtros, onFiltrosChange }: SearchFiltersProps) {
  const toggleFiltro = (
    campo: keyof Omit<Filtros, "busca">,
    valor: string
  ) => {
    const atual = filtros[campo]
    const novos = atual.includes(valor)
      ? atual.filter((v) => v !== valor)
      : [...atual, valor]
    onFiltrosChange({ ...filtros, [campo]: novos })
  }

  const limparFiltros = () => {
    onFiltrosChange({
      busca: filtros.busca,
      linguagens: [],
      faixasEtarias: [],
      recursos: [],
      conteudos: [],
    })
  }

  const temFiltrosAtivos =
    filtros.linguagens.length > 0 ||
    filtros.faixasEtarias.length > 0 ||
    filtros.recursos.length > 0 ||
    filtros.conteudos.length > 0

  return (
    <aside className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filtros</h2>
        {temFiltrosAtivos && (
          <Button
            variant="ghost"
            size="sm"
            onClick={limparFiltros}
            className="h-8 px-2 text-muted-foreground"
          >
            <X className="mr-1 h-4 w-4" />
            Limpar
          </Button>
        )}
      </div>

      <Accordion
        type="multiple"
        defaultValue={["linguagens", "faixas", "recursos"]}
        className="w-full"
      >
        <AccordionItem value="linguagens">
          <AccordionTrigger className="text-sm font-medium">
            Linguagem Artística
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-1">
              {LINGUAGENS_ARTISTICAS_PADRAO.map((linguagem) => (
                <div key={linguagem} className="flex items-center space-x-2">
                  <Checkbox
                    id={`linguagem-${linguagem}`}
                    checked={filtros.linguagens.includes(linguagem)}
                    onCheckedChange={() => toggleFiltro("linguagens", linguagem)}
                  />
                  <Label
                    htmlFor={`linguagem-${linguagem}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {linguagem}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="faixas">
          <AccordionTrigger className="text-sm font-medium">
            Faixa Etária
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-1">
              {FAIXAS_ETARIAS.map((faixa) => (
                <div key={faixa} className="flex items-center space-x-2">
                  <Checkbox
                    id={`faixa-${faixa}`}
                    checked={filtros.faixasEtarias.includes(faixa)}
                    onCheckedChange={() => toggleFiltro("faixasEtarias", faixa)}
                  />
                  <Label
                    htmlFor={`faixa-${faixa}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {faixa}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="recursos">
          <AccordionTrigger className="text-sm font-medium">
            Recursos
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-1">
              {RECURSOS_DISPONIVEIS.map((recurso) => (
                <div key={recurso} className="flex items-center space-x-2">
                  <Checkbox
                    id={`recurso-${recurso}`}
                    checked={filtros.recursos.includes(recurso)}
                    onCheckedChange={() => toggleFiltro("recursos", recurso)}
                  />
                  <Label
                    htmlFor={`recurso-${recurso}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {recurso}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  )
}
