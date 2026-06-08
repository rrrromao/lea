"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  ExternalLink,
  FolderOpen,
  Package,
  PlayCircle,
  Target,
  User,
  Users,
} from "lucide-react"
import { Header } from "@/components/header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { fetchPlanosDeAula } from "@/lib/data"
import { parseMetodologia } from "@/lib/metodologia"

const linguagemCores: Record<string, string> = {
  "Artes Visuais": "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  "Música": "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  "Dança": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "Teatro": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Audiovisual: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
}

function slugifyNome(nome: string) {
  return nome
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
}

export default function AtividadePage() {
  const params = useParams()
  const id = params.id as string
  const [atividade, setAtividade] = useState<ReturnType<
    typeof fetchPlanosDeAula
  > extends Promise<infer R>
    ? R extends { id: string }[]
      ? R[number]
      : never
    : never | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    fetchPlanosDeAula().then((planos) => {
      if (!cancelled) {
        const found = planos.find((a) => a.id === id) ?? null
        setAtividade(found)
        setLoading(false)
      }
    })

    return () => {
      cancelled = true
    }
  }, [id])

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  const currentUrl = typeof window !== "undefined" ? window.location.href : ""

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16 text-center">
          <p className="text-muted-foreground">Carregando atividade...</p>
        </main>
      </div>
    )
  }

  if (!atividade) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold">Atividade não encontrada</h1>
          <p className="mt-2 text-muted-foreground">
            A atividade que você está procurando não existe.
          </p>
          <Button asChild className="mt-6">
            <Link href="/">Voltar para a página inicial</Link>
          </Button>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para atividades
            </Link>
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  variant="secondary"
                  className={linguagemCores[atividade.linguagemArtistica] || ""}
                >
                  {atividade.linguagemArtistica}
                </Badge>
                <Badge variant="outline">{atividade.faixaEtaria}</Badge>
              </div>
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-balance md:text-4xl">
                {atividade.titulo}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground text-pretty">
                {atividade.descricao}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <ShareButtons
                  titulo={atividade.titulo}
                  url={currentUrl}
                />
              </div>
            </div>

            <Separator />

            {atividade.videoUrl && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PlayCircle className="h-5 w-5 text-primary" />
                    Vídeo da atividade
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video overflow-hidden rounded-md border border-border">
                    <iframe
                      className="h-full w-full"
                      src={atividade.videoUrl.replace("watch?v=", "embed/")}
                      title={`Vídeo de ${atividade.titulo}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Objetivos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {atividade.objetivos.map((objetivo, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                      <span>{objetivo}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Metodologia
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {parseMetodologia(atividade.metodologia).map((dia, diaIndex) => (
                    <div key={diaIndex} className="space-y-3">
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">
                        {dia.titulo}
                      </h3>
                      <ol className="space-y-3">
                        {dia.etapas.map((etapa, etapaIndex) => (
                          <li key={etapaIndex} className="flex items-start gap-3">
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-primary/30 text-xs font-semibold text-primary">
                              {etapaIndex + 1}
                            </span>
                            <span className="leading-relaxed text-muted-foreground">{etapa}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Materiais Necessários
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="grid gap-2 sm:grid-cols-2">
                  {atividade.materiais.map((material, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span className="text-sm">{material}</span>
                    </li>
                  ))}
                </ul>
                {atividade.repositorioUrl && (
                  <Button asChild variant="outline" size="sm">
                    <a
                      href={atividade.repositorioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      <FolderOpen className="h-4 w-4" />
                      Abrir repositório da atividade
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ListChecks className="h-5 w-5 text-primary" />
                  Avaliação
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed text-muted-foreground">
                  {atividade.avaliacao}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Informações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                    <User className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Autor</p>
                    <Button
                      variant="link"
                      className="h-auto p-0 text-sm font-medium"
                      asChild
                    >
                      <Link href={`/autor/${slugifyNome(atividade.autor)}`}>
                        {atividade.autor}
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Publicado em</p>
                    <p className="text-sm font-medium">
                      {formatarData(atividade.dataCriacao)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Duração</p>
                    <p className="text-sm font-medium">{atividade.duracao}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Faixa Etária</p>
                    <p className="text-sm font-medium">{atividade.faixaEtaria}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Conteúdos Trabalhados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {atividade.conteudos.map((conteudo) => (
                    <Badge key={conteudo} variant="secondary">
                      {conteudo}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Recursos Necessários</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {atividade.recursos.map((recurso) => (
                    <Badge key={recurso} variant="outline">
                      {recurso}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
