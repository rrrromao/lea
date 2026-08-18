import Link from "next/link"
import { Clock, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import type { PlanoDeAula } from "@/lib/types"

interface ActivityCardProps {
  atividade: PlanoDeAula
}

const linguagemCores: Record<string, string> = {
  "Artes Visuais": "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  "Música": "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  "Dança": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "Teatro": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
}

export function ActivityCard({ atividade }: ActivityCardProps) {
  return (
    <Link href={`/atividade/${atividade.id}`}>
      <Card className="group h-full transition-all hover:border-foreground/20 hover:shadow-md">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <Badge
              variant="secondary"
              className={linguagemCores[atividade.linguagemArtistica] || ""}
            >
              {atividade.linguagemArtistica}
            </Badge>
          </div>
          <h3 className="mt-2 line-clamp-3 text-lg font-semibold leading-snug group-hover:text-primary">
            {atividade.titulo}
          </h3>
        </CardHeader>
        <CardContent className="pb-3">
          <p className="line-clamp-3 text-sm text-muted-foreground">
            {atividade.descricao}
          </p>
        </CardContent>
        <CardFooter className="flex flex-wrap items-center gap-3 pt-0 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            <span>{atividade.faixaEtaria.split(" ")[0]}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{atividade.duracao}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
