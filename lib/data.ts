import type { PlanoDeAula } from "./types"

export const planosDeAula: PlanoDeAula[] = [
  {
    id: "1",
    titulo: "Sequência Didática de Recepção Fílmica",
    descricao: "Atividade de educação audiovisual centrada na exibição de um filme seguida de práticas expressivas que desenvolvem a espectatorialidade como construção plástica e criativa, fugindo da mera interpretação ou letramento.",
    objetivos: [
      "Desenvolver a espectatorialidade audiovisual como prática expressiva",
      "Estimular a criação plástica a partir da experiência de assistir a um filme",
      "Promover a expressão individual e coletiva após a exibição",
      "Relacionar o cotidiano dos estudantes com as imagens vistas"
    ],
    metodologia: "Primeira aula: preparação e exibição. O professor apresenta brevemente o filme sem revelar detalhes da narrativa, criando expectativa. Os estudantes assistem ao filme com atenção livre, sem roteiro ou ficha de observação prévia. Segunda aula: criação expressiva. Cada estudante recebe papel e materiais e é convidado a criar um desenho em quadrinhos a partir de uma cena, sensação ou imagem que ficou na memória após a exibição. Não há certo ou errado: o ponto de partida é a experiência de cada um. Terceira aula: roda de conversa e exposição. As produções são expostas na sala e os estudantes são convidados a falar sobre suas escolhas. O professor medeia a conversa conectando as diferentes leituras do filme, valorizando a pluralidade de percepções.",
    materiais: ["Projetor ou televisão para exibição", "Papel sulfite ou cartolina", "Lápis, canetas e materiais de colorir", "Tesoura e cola (para cartazes)"],
    duracao: "2 a 3 aulas de 50 minutos",
    avaliacao: "Participação na exibição e na roda de conversa. Produção expressiva realizada após o filme. Não há resposta certa: o critério é o engajamento e a expressão genuína.",
    linguagemArtistica: "Audiovisual",
    faixaEtaria: "9-11 anos (4º ao 6º ano)",
    recursos: ["Projetor/Datashow", "Papel e papelão", "Materiais de baixo custo"],
    conteudos: ["Cinema", "Educação audiovisual", "Expressão plástica", "Leitura de imagens"],
    autor: "Prof. Rafael Romão Silva",
    dataCriacao: "2026-05-24",
    avaliacaoMedia: 5.0,
    numeroAvaliacoes: 1
  }
]

// Extrair todos os conteúdos únicos dos planos
export const CONTEUDOS_DISPONIVEIS = Array.from(
  new Set(planosDeAula.flatMap(p => p.conteudos))
).sort()