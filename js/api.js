const url_BASE = "http://localhost:3000";

const api = {
    async buscarPensamentos() {
      try {
        const response = await fetch(`${url_BASE}/pensamentos`)
        return await response.json()
      }
      catch {
        alert('Erro ao buscar pensamentos')
        throw error
      }
    },

    async salvarPensamentos(pensamento) {
      try {
        const response = await fetch(`${url_BASE}/pensamentos`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(pensamento)
        })
        return await response.json()
      }
      catch {
        alert('Erro ao Salvar pensamentos')
        throw error
      }
    },

  async buscarPensamentoPorId(id) {
    try {
      const response = await fetch(`${url_BASE}/pensamentos/${id}`)
      return await response.json()
    }
    catch {
      alert('Erro ao buscar pensamento')
      throw error
    }
  },

  async editarPensamentos(pensamento) {
    try {
      const response = await fetch(`${url_BASE}/pensamentos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(pensamento)
      })
      return await response.json()
    }
    catch {
      alert('Erro ao Editar pensamentos')
      throw error
    }
  },

  async excluirPensamento(id) {
    try {
      const response = await fetch(`${url_BASE}/pensamentos/${id}`, {
        method: "DELETE"
      })
    }
    catch {
      alert('Erro ao excluir um pensamento')
      throw error
    }
  }
}

  export default api