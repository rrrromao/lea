export interface PlanoDeAula {
  id: string
  titulo: string
  descricao: string
  objetivos: string[]
  metodologia: string
  materiais: string[]
  duracao: string
  avaliacao: string
  linguagemArtistica: string
  faixaEtaria: string
  recursos: string[]
  conteudos: string[]
  autor: string
  dataCriacao: string
  avaliacaoMedia: number
  numeroAvaliacoes: number
  videoUrl?: string
  repositorioUrl?: string
}

export interface Comentario {
  id: string
  atividadeId: string
  nome: string
  texto: string
  data: string
}

export interface Filtros {
  busca: string
  linguagens: string[]
  faixasEtarias: string[]
  recursos: string[]
  conteudos: string[]
}

export const LINGUAGENS_ARTISTICAS = [
  "Artes Visuais",
  "Música",
  "Dança",
  "Teatro",
  "Audiovisual",
] as const

export const FAIXAS_ETARIAS = [
  "3-5 anos (Educação Infantil)",
  "6-8 anos (1º ao 3º ano)",
  "9-11 anos (4º ao 6º ano)",
  "12-14 anos (7º ao 9º ano)",
  "15-17 anos (Ensino Médio)",
] as const

export const RECURSOS_DISPONIVEIS = [
  "Projetor/Datashow",
  "Computador/Tablet",
  "Instrumentos musicais",
  "Materiais recicláveis",
  "Tintas e pincéis",
  "Papel e papelão",
  "Tecidos e figurinos",
  "Som/Caixa de som",
  "Espelho",
  "Materiais de baixo custo",
] as const
