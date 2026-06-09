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
      "Primeira aula: Exibição do Filme 1. O professor apresenta brevemente o filme sem revelar detalhes da narrativa, criando expectativa. Os estudantes assistem ao filme com atenção livre, sem roteiro ou ficha de observação prévia. A professora pode fazer provocações enquanto o filme é exibido, como a figura história do ‘explicador’. Após a exibição do filme, é pedido para que cada estudante desenhe uma imagem a partir do filme, a que mais lhe marcou. É possível pedir para que eles apresentem a imagem e falem sobre ela para a turma toda;\n\nSegunda aula: Exibição do Filme 2. Cada estudante recebe papel e materiais e é convidado a criar um desenho em quadrinhos que conte a história do filme, sensação ou imagem que ficou na memória após a exibição. Não há certo ou errado: o ponto de partida é a experiência de cada um;\n\nTerceira aula: Exibição do Filme 3. Com a turma dividida em grupos, cada pessoa do grupo deve desenhar um momento diferente do filme. Após cada um do grupo fazer o seu desenho, peça para ordenarem os desenhos a partir do que viram no filme. Apresente a ideia de linha do tempo e peça para que eles coloquem as imagens na linha;\n\nQuarta aula: Exiba o quarto filme. Peça para fazerem a linha do tempo do filme. Apresente alguns cartazes de filmes e converse com a turma sobre para quê eles servem. Peça para cada grupo escolher um momento do filme e fazer um cartaz para ele.",
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
