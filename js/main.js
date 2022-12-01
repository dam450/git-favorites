
import { GithubUser } from './GithubUserData.js'

import { Store as LocalStorage} from './localStore.js'

const github = new GithubUser()

const searchForm = document.querySelector('#frm-search')
const userInput = document.querySelector('#fav-search')
const userStorage = new LocalStorage('gitusers')


searchForm.addEventListener('submit', event => {
  event.preventDefault()

  const userName = userInput.value

  const user =  github.getUser(userName)

  console.log(`added ${user} to favs!`)
  userInput.value = ''


})

GithubUser.search('dam450').then(data => {
  console.log(data)
  userStorage.add(data)
  userStorage.save('gitusers')
})

GithubUser.search('diego3g').then(data => {
  console.log(data)
  userStorage.add(data)
  userStorage.save('gitusers')
})

// console.dir(user)
// const {name} = user
// console.log(name)


// userStorage.set({1: 'teste'})
userStorage.load()

console.log(userStorage.storage)
console.log(userStorage.values)


userStorage.clearValues()
userStorage.save()

//new SimpleBar(document.querySelector('body'));