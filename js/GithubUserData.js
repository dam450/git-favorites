export class GithubUser {

  /**
   * Faz a busca por nome de usuário na Github API
   * @param {String} username Nome do usuário Github
   * @returns {Promise} Retorna um objeto com os dados da busca em uma Promise
   */
  static async search(username) { //método estático, não é necessário estanciar com 'new' para fazer uso do método
    const endpoint = `https://api.github.com/users/${username}`
    let user = {}

    try {
      
      user =  await fetch(endpoint) //acessa github para buscar os dados
      .then(data => data.json()) // converte os dados em formato json
      .then(json => { const { login, name, public_repos, followers } = json //desestrutura os dados que serão usados do json
        
        //retorna um objeto com o dados
        return { 
          login,
          name,
          repos: public_repos,
          followers }
      })

      const userError = new Error()
      userError.name = 'Invalid User'
      userError.message = 'Nome de usuário Github não encontrado'

      if(!user.login) throw userError
      
    } catch (error) {

      //console.error(error)

      return {}
      
      
    }

    return user

  }
}