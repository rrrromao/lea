import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"

interface AutorPageProps {
  params: {
    slug: string
  }
}

export default function AutorPage({ params }: AutorPageProps) {
  const nomeFormatado = decodeURIComponent(params.slug).replace(/-/g, " ")

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-2xl">
          <Button variant="ghost" asChild>
            <Link href="/">Voltar para atividades</Link>
          </Button>

          <h1 className="mt-6 text-3xl font-bold">Sobre o autor</h1>
          <p className="mt-2 text-lg text-muted-foreground">{nomeFormatado}</p>

          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>Em breve você vai encontrar aqui um texto breve sobre este autor.</p>
          </div>
        </div>
      </main>
    </div>
  )
}
