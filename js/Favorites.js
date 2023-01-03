import { GithubUser } from './GithubUserData.js'

/**
 * classe com a lógica dos dados
*/
export class Favorites {
  entries = []

  constructor() {
    this.load()
  }

  load() {
    this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []
  }

  save() {
    localStorage.setItem('@github-favorites:', JSON.stringify(this.entries))
  }

  async add(user) {
    try {

      const userExists = this.entries
        .find(entry => entry.login.toLowerCase() === user.toLowerCase())

      if (userExists) {
        throw new Error(`${user}: Usuário já existe!`)
      }

      const githubUser = await GithubUser.search(user)

      if (githubUser.login === undefined) {
        throw new Error(`${user}: Usuário não encontrado!`)
      }

      this.entries = [githubUser, ...this.entries]
      this.save()
    } catch(error) { 
      console.error(error.message)
    }
  } 

  delete(user) {
    const filtered = this.entries.filter(entry => entry.login.toLowerCase() !== user.toLowerCase())
    this.entries = filtered
    this.save()
  }

}

/**
 *  classe com a visualização do html
 */
export class FavoritesView extends Favorites {

}