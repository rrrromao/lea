import type { PlanoDeAula } from "./types"

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQLLcamnHOcoS80MdfCio0qFPFyRpvZuL5_X7CHbjI_TjPIm68b4sQuvR8sFKJ4uDB4qPcRPvOnYtSR/pub?output=csv"

type ParserRow = Record<string, string>

function escapeCsvValue(value: string): string {
  if (value.includes('"') || value.includes(",") || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`
  }
  return value
}

function quote(value: string): string {
  if (!value) return '""'
  return `"${value.replace(/"/g, '""')}"`
}

function csvUnescape(value: string): string {
  if (!value) return ""
  if (value.startsWith('"') && value.endsWith('"')) {
    return value
      .slice(1, -1)
      .replace(/""/g, '"')
  }
  return value
}

function parseLine(line: string): string[] {
  const result: string[] = []
  let current = ""
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"'
        i += 1
      } else {
        inQuotes = !inQuotes
      }
    } else if (char === "," && !inQuotes) {
      result.push(csvUnescape(current.trim()))
      current = ""
    } else {
      current += char
    }
  }

  result.push(csvUnescape(current.trim()))
  return result
}

function parseCsv(text: string): ParserRow[] {
  const lines = text
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .split("\n")

  const rows: ParserRow[] = []
  let headers: string[] = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (!line.trim()) {
      continue
    }

    const values = parseLine(line)

    if (headers.length === 0) {
      headers = values.map((h) => h.trim().toLowerCase())
      continue
    }

    const row: ParserRow = {}
    headers.forEach((header, index) => {
      row[header] = values[index] ?? ""
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
  const response = await fetch(CSV_URL, {
    next: { revalidate: 60 },
  })

  const text = await response.text()
  const rows = parseCsv(text)

  return rows
    .map((row) => {
      const id = row.id?.trim()
      const titulo = row.titulo?.trim()
      const descricao = row.descricao?.trim()

      if (!id || !titulo || !descricao) {
        return null
      }

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
