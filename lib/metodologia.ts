export interface DiaMetodologia {
  titulo: string
  etapas: string[]
}

export function parseMetodologia(texto: string): DiaMetodologia[] {
  const regex =
    /(Primeira|Segunda|Terceira|Quarta|Quinta|Sexta|Sétima|Oitava|Nona|Décima) aula:/gi

  const partes = texto.split(regex)

  const dias: DiaMetodologia[] = []

  // Exemplo após split:
  // ["", "Primeira", " texto da primeira aula...", "Segunda", " texto da segunda aula..."]
  for (let i = 1; i < partes.length; i += 2) {
    const titulo = `${partes[i] ?? ""} aula`
    const bloco = (partes[i + 1] ?? "").trim()

    const etapas = bloco
      .split(".")
      .map((etapa) => etapa.trim())
      .filter((etapa) => etapa.length > 0)

    dias.push({ titulo, etapas })
  }

  // Fallback: se não encontrou nenhum dia, trata como um bloco só
  if (dias.length === 0 && texto.trim().length > 0) {
    const etapas = texto
      .split(".")
      .map((etapa) => etapa.trim())
      .filter((etapa) => etapa.length > 0)

    dias.push({ titulo: "Metodologia", etapas })
  }

  return dias
}
