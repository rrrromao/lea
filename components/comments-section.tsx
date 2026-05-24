"use client"

import { useState } from "react"
import { MessageCircle, Send, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { Comentario } from "@/lib/types"

interface CommentsSectionProps {
  atividadeId: string
  comentarios: Comentario[]
  onAddComentario: (comentario: Omit<Comentario, "id" | "data">) => void
}

export function CommentsSection({
  atividadeId,
  comentarios,
  onAddComentario,
}: CommentsSectionProps) {
  const [nome, setNome] = useState("")
  const [texto, setTexto] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!nome.trim() || !texto.trim()) return

    setIsSubmitting(true)
    onAddComentario({
      atividadeId,
      nome: nome.trim(),
      texto: texto.trim(),
    })
    setNome("")
    setTexto("")
    setIsSubmitting(false)
  }

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2">
        <MessageCircle className="h-5 w-5" />
        <h2 className="text-xl font-semibold">
          Comentários ({comentarios.length})
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-border bg-card p-4">
        <div className="space-y-2">
          <Input
            placeholder="Seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Textarea
            placeholder="Deixe um comentário sobre esta atividade..."
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            required
            rows={3}
          />
        </div>
        <Button type="submit" disabled={isSubmitting || !nome.trim() || !texto.trim()}>
          <Send className="mr-2 h-4 w-4" />
          Enviar comentário
        </Button>
      </form>

      {comentarios.length > 0 ? (
        <div className="space-y-4">
          {comentarios.map((comentario) => (
            <div
              key={comentario.id}
              className="rounded-lg border border-border bg-card p-4"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                  <User className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">{comentario.nome}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatarData(comentario.data)}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{comentario.texto}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-sm text-muted-foreground py-8">
          Nenhum comentário ainda. Seja o primeiro a comentar!
        </p>
      )}
    </section>
  )
}
