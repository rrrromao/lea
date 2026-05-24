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
    metodologia: "Exibição do filme escolhido pelo professor, preferencialmente de curta ou média duração. Após a exibição, proposta de uma atividade expressiva à escolha: desenho em quadrinhos sobre cenas ou sensações, criação de uma linha do tempo da narrativa, ou elaboração de um cartaz/convite para o filme. Roda de conversa final sobre as produções.",
    materiais: ["Projetor ou televisão para exibição", "Papel sulfite ou cartolina", "Lápis, canetas e materiais de colorir", "Tesoura e cola (para cartazes)"],
    duracao: "2 a 3 aulas de 50 minutos",
    avaliacao: "Participação na exibição e na roda de conversa. Produção expressiva realizada após o filme. Não há resposta certa: o critério é o engajamento e a expressão genuína.",
    linguagemArtistica: "Artes Visuais",
    faixaEtaria: "9-11 anos (4º ao 6º ano)",
    recursos: ["Projetor/Datashow", "Papel e papelão", "Materiais de baixo custo"],
    conteudo
]

// Extrair todos os conteúdos únicos dos planos
export const CONTEUDOS_DISPONIVEIS = Array.from(
  new Set(planosDeAula.flatMap(p => p.conteudos))
).sort()
