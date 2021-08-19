import store from 'store'

const USER_KEY = 'user_key'
export default {
  setUser(user) {
    // localStorage.setItem(USER, JSON.stringify(user))
    store.set(USER_KEY, user)
  },
  getUser() {
    // return JSON.parse(localStorage.getItem(USER) || '{}')
    return store.get(USER_KEY) || {}
  },
  removeUser() {
    // localStorage.removeItem(USER)
    store.remove(USER_KEY)
  },
}
