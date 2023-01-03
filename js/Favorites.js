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

  /**
   * Inicialize a classe informando o elemento html raiz do app
   * @param {HTMLElement} root elemento HTML raiz do aplicativo
   */
  constructor(root) {
    super()
    this.root = document.querySelector(root)
    this.favList = this.root.querySelector('.fav-list')
    this.updateList()
    this.onAdd()
  }

  removeAllRows() {
    this.favList.querySelectorAll('tr').forEach(tr => {
      tr.remove()
    });
  }

  createRow({login, name, repos, followers}) {
    const tr = document.createElement('tr')
    tr.innerHTML = `
      <td>
        <div class="user-info">
          <a href="https://github.com/${login}" target="_blank">
            <img src="https://github.com/${login}.png" alt="imagem de ${name}">
          </a>
          <div class="user-data">
            <strong>${name}</strong>
            <span>/${login}</span>
          </div>
        </div>
      </td>
      <td class="repos">${repos}</td>
      <td class="folowers">${followers}</td>
      <td class="action"><button class="remove-btn" type="button">Remover</button></td>
   `

    tr.querySelector('.remove-btn').onclick = () => {
      const isOk = confirm(`Tem certeza que deseja remover ${login.toUpperCase()}?`)
      if(isOk) this.deleteRow(login)
    }
    
    return tr
  }

  createEmptyRow() {
    const tr = document.createElement('tr')
    tr.innerHTML = `
      <td colspan="4">
        <div class="empty">
          <img src="./img/estrela.svg" alt="">
          <span> Nenhum favorito ainda</span>
        </div>
      </td>
    `
    tr.classList.add('empty')

    return tr
  }

  deleteRow(user) {
    this.delete(user)
    this.updateList()
  }

  updateList() {
    this.removeAllRows()

    console.info('entries: ', this.entries.length)
    
    const emptyList = this.entries.length === 0
    
    if (emptyList) {
      const row = this.createEmptyRow()
      this.favList.append(row)
      return
    }

    this.entries.forEach(user => {
      const row = this.createRow(user)
      this.favList.append(row)
    })

  }

  async addUser(user) {
    await this.add(user)
    this.updateList()
  }

  onAdd() {
    const addButton = this.root.querySelector('#frm-search')
    const userInput = this.root.querySelector('#fav-search')

    addButton.onsubmit = event => {
      event.preventDefault()

      const { value } = userInput

      if(value) {
        this.addUser(value)
        userInput.value = ''
      }
    }


  }

}