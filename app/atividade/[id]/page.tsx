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
  ListChecks,
  Package,
  Target,
  User,
  Users,
} from "lucide-react"
import { Header } from "@/components/header"
import { RatingStars } from "@/components/rating-stars"
import { CommentsSection } from "@/components/comments-section"
import { ShareButtons } from "@/components/share-buttons"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { planosDeAula } from "@/lib/data"
import type { Comentario } from "@/lib/types"

const linguagemCores: Record<string, string> = {
  "Artes Visuais": "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  "Música": "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  "Dança": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "Teatro": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
}

export default function AtividadePage() {
  const params = useParams()
  const id = params.id as string

  const [comentarios, setComentarios] = useState<Comentario[]>([])
  const [userRating, setUserRating] = useState<number>(0)

  const atividade = planosDeAula.find((a) => a.id === id)

  // Carregar comentários do localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`comentarios-${id}`)
    if (saved) {
      setComentarios(JSON.parse(saved))
    }

    const savedRating = localStorage.getItem(`rating-${id}`)
    if (savedRating) {
      setUserRating(Number(savedRating))
    }
  }, [id])

  const handleAddComentario = (novoComentario: Omit<Comentario, "id" | "data">) => {
    const comentario: Comentario = {
      ...novoComentario,
      id: crypto.randomUUID(),
      data: new Date().toISOString(),
    }
    const novosComentarios = [comentario, ...comentarios]
    setComentarios(novosComentarios)
    localStorage.setItem(`comentarios-${id}`, JSON.stringify(novosComentarios))
  }

  const handleRatingChange = (rating: number) => {
    setUserRating(rating)
    localStorage.setItem(`rating-${id}`, String(rating))
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

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  const currentUrl = typeof window !== "undefined" ? window.location.href : ""

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para atividades
            </Link>
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Conteúdo principal */}
          <div className="space-y-6 lg:col-span-2">
            {/* Header da atividade */}
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
                <div className="flex items-center gap-2">
                  <RatingStars rating={atividade.avaliacaoMedia} size="md" />
                  <span className="font-semibold">
                    {atividade.avaliacaoMedia.toFixed(1)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    ({atividade.numeroAvaliacoes} avaliações)
                  </span>
                </div>
                <ShareButtons titulo={atividade.titulo} url={currentUrl} />
              </div>
            </div>

            <Separator />

            {/* Objetivos */}
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

            {/* Metodologia */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Metodologia
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed text-muted-foreground">
                  {atividade.metodologia}
                </p>
              </CardContent>
            </Card>

            {/* Materiais */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Materiais Necessários
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {atividade.materiais.map((material, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span className="text-sm">{material}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Avaliação */}
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

            <Separator />

            {/* Avaliar atividade */}
            <Card>
              <CardHeader>
                <CardTitle>Avalie esta atividade</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <RatingStars
                    rating={userRating}
                    size="lg"
                    interactive
                    onRatingChange={handleRatingChange}
                  />
                  {userRating > 0 && (
                    <span className="text-sm text-muted-foreground">
                      Você avaliou com {userRating} {userRating === 1 ? "estrela" : "estrelas"}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Comentários */}
            <CommentsSection
              atividadeId={id}
              comentarios={comentarios}
              onAddComentario={handleAddComentario}
            />
          </div>

          {/* Sidebar */}
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
                    <p className="text-sm font-medium">{atividade.autor}</p>
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
