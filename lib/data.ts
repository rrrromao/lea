import type { PlanoDeAula } from "./types"

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQLLcamnHOcoS80MdfCio0qFPFyRpvZuL5_X7CHbjI_TjPIm68b4sQuvR8sFKJ4uDB4qPcRPvOnYtSR/pub?output=csv"

function parseCsv(text: string): Record<string, string>[] {
  const lines = text
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .split("\n")
    .filter((line) => line.trim().length > 0)

  if (lines.length < 2) return []

  const headers = lines[0].split(",").map((h) => h.trim())
  const rows: Record<string, string>[] = []

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",")
    const row: Record<string, string> = {}

    headers.forEach((header, index) => {
      const value = (values[index] ?? "").trim()
      row[header] = value
    })

    rows.push(row)
  }

  return rows
}

function splitList(value: string): string[] {
  if (!value) return []
  return value
    .split(";")
    .map((item) => item.trim())
    .filter((item) => item.length > 0)
}

export async function fetchPlanosDeAula(): Promise<PlanoDeAula[]> {
  const response = await fetch(CSV_URL, { next: { revalidate: 60 } })
  const text = await response.text()
  const rows = parseCsv(text)

  return rows
    .map((row) => {
      const id = row.id?.trim()
      const titulo = row.titulo?.trim()
      const descricao = row.descricao?.trim()

      if (!id || !titulo || !descricao) return null

      const avaliacaoMedia = Number(row["avaliacao media"])
      const numeroAvaliacoes = Number(row["numero de avaliacoes"])

      return {
        id,
        titulo,
        descricao,
        objetivos: splitList(row.objetivos ?? ""),
        metodologia: row.metodologia ?? "",
        materiais: splitList(row.materiais ?? ""),
        duracao: row.duracao?.trim() ?? "",
        avaliacao: row.avaliacao?.trim() ?? "",
        linguagemArtistica: row["linguagem artistica"]?.trim() ?? "",
        faixaEtaria: row["faixa etaria"]?.trim() ?? "",
        recursos: splitList(row.recursos ?? ""),
        conteudos: splitList(row.conteudos ?? ""),
        autor: row.autor?.trim() ?? "",
        dataCriacao: row["data de criacao"]?.trim() ?? "",
        avaliacaoMedia: Number.isFinite(avaliacaoMedia) ? avaliacaoMedia : 0,
        numeroAvaliacoes: Number.isFinite(numeroAvaliacoes)
          ? numeroAvaliacoes
          : 0,
        videoUrl: row["video url"]?.trim() || undefined,
        repositorioUrl: row["repositorio url"]?.trim() || undefined,
      } satisfies PlanoDeAula
    })
    .filter((item): item is PlanoDeAula => item !== null)
}
