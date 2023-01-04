import { FavoritesView } from './Favorites.js'

new FavoritesView('.app')

const filterUser = document.querySelector('header form input')
filterUser.addEventListener('input', filterUsername)

function filterUsername() {
  const userList = document.querySelectorAll('tr.user')

  if(filterUser.value !== ''){
    for (let user of userList) {
      let login = user.dataset.login.toLowerCase()
      let filterText = filterUser.value.toLowerCase()

      if(!login.includes(filterText)){
        user.style.display = 'none'
      } else {
        user.style.display = 'block'
      }
    }

  } else {
    for (let user of userList) {
      user.style.display = 'block'
    }
  }
}
