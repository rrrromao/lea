import { Search } from "lucide-react"
import { ActivityCard } from "@/components/activity-card"
import type { PlanoDeAula } from "@/lib/types"

interface ActivityGridProps {
  atividades: PlanoDeAula[]
}

export function ActivityGrid({ atividades }: ActivityGridProps) {
  if (atividades.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <Search className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="mt-4 text-lg font-semibold">Nenhuma atividade encontrada</h3>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Tente ajustar os filtros ou buscar por outros termos para encontrar mais atividades.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {atividades.map((atividade) => (
        <ActivityCard key={atividade.id} atividade={atividade} />
      ))}
    </div>
  )
}
