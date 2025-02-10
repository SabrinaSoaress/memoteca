import ui from "./ui.js"
import api from "./api.js"


function removerEspacos(string) {
  return string.replaceAll(/\s+/g, '')
}


//regex - Expressão Regular é uma sequência de caracteres que define um padrão de busca. 
const regexConteudo = /^[A-Za-z\s]{10,}$/

function validarAutoria(autoria) {
  return regexAutoria.test(autoria)
}

const regexAutoria = /^[a-zA-Z]{3,15}$/

function validarConteudo(conteudo) {
  return regexConteudo.test(conteudo)
}


document.addEventListener("DOMContentLoaded", () => {
  ui.renderizarPensamentos()

  const formularioPensamento = document.getElementById("pensamento-form")
  const botaoCancelar = document.getElementById("botao-cancelar")
  const inputBusca = document.getElementById("campo-busca")

  formularioPensamento.addEventListener("submit", manipularSubmissaoFormulario)
  botaoCancelar.addEventListener("click", manipularCancelamento)
  inputBusca.addEventListener("input", manipularBusca)
})

async function manipularSubmissaoFormulario(event) {
  event.preventDefault()
  const id = document.getElementById("pensamento-id").value
  const conteudo = document.getElementById("pensamento-conteudo").value
  const autoria = document.getElementById("pensamento-autoria").value
  const data = document.getElementById("pensamento-data").value

  const conteudoSemEspaco = removerEspacos(conteudo)
  const autoriaSemEspaco = removerEspacos(autoria)

  if (!validarAutoria(autoriaSemEspaco)) {
    alert("É permitida a inclusão de letras e entre 3 e 15 caracteres sem espaços")
    return
  }

  if (!validarConteudo(conteudoSemEspaco)) {
    alert("É permitida a inclusão apenas de letras e espaços com no mínimo 10 caracteres")
    return
  }

  if (!validarData(data)) {
    alert("Não é permitido o cadastro de Datas Futuras!")
  }

  try {
    if (id) {
      await api.editarPensamento({ id, conteudo, autoria, data })
    } else {
      await api.salvarPensamento({ conteudo, autoria, data })
    }
    ui.renderizarPensamentos()
  } catch {
    alert("Erro ao salvar pensamento")
  }
}

function manipularCancelamento() {
  ui.limparFormulario()
}

async function manipularBusca () {
  const termoBusca = document.getElementById("campo-busca").value
  try {
    const pensamentosFiltrados = await api.buscarPensamentoPorTermo(termoBusca)
    ui.renderizarPensamentos(pensamentosFiltrados)
  } catch (error) {
    alert("Erro ao realizar busca")
    
  }
}

function validarData(data) {
  const dataAtual = new Date()
  const dataInserida = new Date(data)
  return dataInserida <= dataAtual
}