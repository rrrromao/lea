export interface DiaMetodologia {
  titulo: string
  etapas: string[]
}

const PADROES_DIA = [
  { titulo: "Primeira aula", regex: /^Primeira aula:\s*/i },
  { titulo: "Segunda aula", regex: /^Segunda aula:\s*/i },
  { titulo: "Terceira aula", regex: /^Terceira aula:\s*/i },
  { titulo: "Quarta aula", regex: /^Quarta aula:\s*/i },
  { titulo: "Quinta aula", regex: /^Quinta aula:\s*/i },
  { titulo: "Sexta aula", regex: /^Sexta aula:\s*/i },
]

export function parseMetodologia(texto: string): DiaMetodologia[] {
  if (!texto.trim()) return []

  // Divide o texto inteiro em linhas, mas mantendo quebras
  const linhas = texto.split(/\r?\n/)
  const dias: DiaMetodologia[] = []
  let diaAtual: { titulo: string; etapas: string[] } | null = null

  for (const linha of linhas) {
    const linhaLimpa = linha.trim()
    if (!linhaLimpa) continue

    // Verifica se a linha começa com algum padrão de dia
    let encontrouDia = false
    for (const padrao of PADROES_DIA) {
      if (padrao.regex.test(linhaLimpa)) {
        if (diaAtual) {
          dias.push(diaAtual)
        }
        diaAtual = { titulo: padrao.titulo, etapas: [] }
        // Remove o header "Primeira aula: " do texto
        const textoEtapas = linhaLimpa.replace(padrao.regex, "").trim()
        if (textoEtapas) {
          diaAtual.etapas.push(textoEtapas)
        }
        encontrouDia = true
        break
      }
    }

    if (!encontrouDia) {
      if (!diaAtual) {
        // Se não tem dia nenhum ainda, cria um bloco genérico
        diaAtual = { titulo: "Metodologia", etapas: [] }
      }
      diaAtual.etapas.push(linhaLimpa)
    }
  }

  if (diaAtual) {
    dias.push(diaAtual)
  }

  return dias
}
