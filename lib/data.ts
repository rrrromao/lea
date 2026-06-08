import type { PlanoDeAula } from "./types"

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQLLcamnHOcoS80MdfCio0qFPFyRpvZuL5_X7CHbjI_TjPIm68b4sQuvR8sFKJ4uDB4qPcRPvOnYtSR/pub?output=csv"

type ParserRow = Record<string, string>

function csvUnescape(value: string): string {
  const trimmed = value.trim()
  if (!trimmed) return ""
  if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
    return trimmed
      .slice(1, -1)
      .replace(/""/g, '"')
  }
  return trimmed
}

function parseFields(line: string): string[] {
  const result: string[] = []
  let current = ""
  let inQuotes = false
  let i = 0

  while (i < line.length) {
    const char = line[i]

    if (char === '"') {
      if (inQuotes && i + 1 < line.length && line[i + 1] === '"') {
        current += '"'
        i += 1
      } else {
        inQuotes = !inQuotes
      }
    } else if (char === "," && !inQuotes) {
      result.push(csvUnescape(current))
      current = ""
    } else {
      current += char
    }

    i += 1
  }

  result.push(csvUnescape(current))
  return result
}

function parseCsv(text: string): ParserRow[] {
  const normalized = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n")
  const lines = normalized.split("\n")

  const rows: ParserRow[] = []
  let headers: string[] = []
  let pendingLine = ""

  const flushPending = () => {
    if (!pendingLine.trim()) return
    const values = parseFields(pendingLine)
    if (headers.length === 0) {
      headers = values.map((h) => h.trim().toLowerCase())
    } else {
      const row: ParserRow = {}
      headers.forEach((header, index) => {
        row[header] = values[index] ?? ""
      })
      rows.push(row)
    }
    pendingLine = ""
  }

  for (const rawLine of lines) {
    if (!rawLine.trim()) {
      flushPending()
      continue
    }

    const inQuotes = (pendingLine + "\n" + rawLine).split('"').length % 2 !== 0

    if (inQuotes) {
      pendingLine += `\n${rawLine}`
      continue
    }

    pendingLine += rawLine
    flushPending()
  }

  flushPending()

  return rows
}

function splitList(value: string): string[] {
  if (!value) return []
  return value
    .split(";")
    .map((item) => item.trim())
    .filter((item) => item.length > 0)
}

function ehCampoDia(value: string): boolean {
  return /^(Primeira|Segunda|Terceira|Quarta|Quinta|Sexta)\s+aula\s*:/i.test(value.trim())
}

function ehDescricaoFragmento(value: string): boolean {
  const trimmed = value.trim()
  if (!trimmed) return true
  if (trimmed.length < 10) return true
  if (/^[a-zà-ú]/.test(trimmed.slice(0, 1))) return true
  if (/^cada pessoa|^peça para|^Apresente |^Tente |^Vale ser/.test(trimmed)) return true
  return false
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

      const idNumerico = Number(id)
      if (!Number.isInteger(idNumerico) || idNumerico <= 0) {
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

export const LINGUAGENS_ARTISTICAS_PADRAO = [
  "Artes Visuais",
  "Música",
  "Dança",
  "Teatro",
  "Audiovisual",
] as const
