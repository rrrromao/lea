import type { PlanoDeAula } from "./types"

const PLANOS_DE_AULA: PlanoDeAula[] = [
  {
    id: "1",
    titulo: "Assistir filme como uma prática criativa",
    descricao:
      "Assistir a um filme pode ser uma atividade criativa em si, estimulando a percepção e a expressão dos estudantes.",
    objetivos: [
      "Desenvolver a espectatorialidade audiovisual como prática expressiva",
      "Estimular a criação plástica a partir da experiência de assistir a um filme",
      "Promover a expressão individual e coletiva após a exibição",
      "Relacionar o cotidiano dos estudantes com as imagens vistas",
    ],
    metodologia:
      "Primeira aula: Exibições e roda de conversa; Segunda aula: Criação de desenhos individuais; Terceira aula: Construção de histórias em quadrinhos em grupo; Quarta aula: Exibição e produção de cartazes.",
    materiais: [
      "Projetor ou televisão para exibição",
      "Papel sulfite ou cartolina",
      "Lápis, canetas e materiais de colorir",
      "Tesoura e cola (para cartazes)",
    ],
    duracao: "4 aulas de 100 minutos",
    avaliacao:
      "Participação na exibição e na roda de conversa. Produção expressiva realizada após o filme.",
    linguagemArtistica: "Audiovisual",
    faixaEtaria: "9-11 anos (3º ao 6º ano)",
    recursos: [
      "Quatro curtas-metragens",
      "Projetor/Datashow",
      "Papel e papelão",
      "Materiais de baixo custo",
    ],
    conteudos: [
      "Cinema",
      "Educação audiovisual",
      "Cinema-Educação",
      "Educomunicação",
      "Recepção de filmes",
      "Leitura de imagens",
    ],
    autor: "Prof. Rafael Romao Silva",
    dataCriacao: "2026-05-24",
    avaliacaoMedia: 5.0,
    numeroAvaliacoes: 1,
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    repositorioUrl: "https://drive.google.com/drive/folders/SEU_ID_AQUI",
  },
  {
    id: "2",
    titulo: "Colheita de Cores",
    descricao:
      "Encontrar as cores através de uma câmera fotográfica, desenvolvendo o olhar e a percepção visual.",
    objetivos: [
      "Investigar como uma mesma cor pode se mostrar de formas diferentes",
      "Perceber como o tipo de iluminação afeta as cores",
      "Descobrir como a câmera utilizada consegue ou não ser fiel ao que se vê a olho nu",
    ],
    metodologia:
      "Primeira aula: Discussão de fotos e escolha de cor; Segunda aula: Passeio atento e registro fotográfico; Terceira aula: Seleção das fotos e reflexão sobre a cor escolhida.",
    materiais: [
      "Câmera fotográfica",
      "Projetor ou computador para exibir as fotos",
      "Papel para registro e reflexão",
    ],
    duracao: "2 aulas de 100 minutos",
    avaliacao:
      "Participação na atividade de observação e produção do texto/áudio reflexivo sobre a cor escolhida.",
    linguagemArtistica: "Audiovisual",
    faixaEtaria: "9-11 anos (3º ao 6º ano)",
    recursos: [
      "Câmeras fotográficas de diferentes tecnologias",
      "Projetor/Datashow",
      "Papel e material de escrita",
    ],
    conteudos: [
      "Fotografia",
      "Educomunicação",
      "Cores",
      "Observação do espaço",
    ],
    autor: "Prof. Rafael Romao Silva",
    dataCriacao: "2026-06-08",
    avaliacaoMedia: 0,
    numeroAvaliacoes: 0,
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    repositorioUrl: "https://drive.google.com/drive/folders/SEU_ID_AQUI",
  },
]

export async function fetchPlanosDeAula(): Promise<PlanoDeAula[]> {
  return PLANOS_DE_AULA
}
