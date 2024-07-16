import { userService } from '../../services/user.service.js'
import { LOADING_DONE, LOADING_START } from '../reducers/system.reducer.js'
import { SET_USER, SET_USERS, SET_USER_BALANCE } from '../reducers/user.reducer.js'
import { store } from '../store.js'
// import { SET_USER, SET_USER_BALANCE } from '../reducers/user.reducer.js'

// export function updateUser(userToUpdate) {
//     return userService.updateUserPreffs(userToUpdate)
//         .then((updatedUser) => {
//             store.dispatch({
//                 type: SET_USER,
//                 user: updatedUser,
//             })
//         })
//         .catch(err => {
//             console.error('Cannot update user:', err)
//             throw err
//         })
// }
export async function loadUsers() {
  try {
    store.dispatch({ type: LOADING_START })
    const users = await userService.getUsers()
    store.dispatch({ type: SET_USERS, users })
  } catch (err) {
    console.log('UserActions: err in loadUsers', err)
  } finally {
    store.dispatch({ type: LOADING_DONE })
  }
}

export async function login(credentials) {
  try {
    const user = await userService.login(credentials)
    store.dispatch({ type: SET_USER, user })
    return user
  } catch (err) {
    console.log('user actions -> Cannot login', err)
    throw err
  }
}

export async function signup(credentials) {
  try {
    const user = await userService.signup(credentials)
    store.dispatch({ type: SET_USER, user })
    return user
  } catch (err) {
    console.log('user actions -> Cannot signup', err)
    throw err
  }
}

export async function logout() {
  try {
    await userService.logout()
    store.dispatch({ type: SET_USER, user: null })
  } catch (err) {
    console.error('user actions -> Cannot logout:', err)
    throw err
  }
}

export function addActivity(txt) {
  return userService
    .addActivity(txt)
    .then((updatedUser) => {
      store.dispatch({
        type: SET_USER,
        user: updatedUser,
      })
    })
    .catch((err) => {
      console.error('Cannot add activity:', err)
      throw err
    })
}

export function changeBalance(amount) {
  return userService
    .updateBalance(amount)
    .then((newBalance) => {
      store.dispatch({ type: SET_USER_BALANCE, balance: newBalance })
      return newBalance
    })
    .catch((err) => {
      console.error('Cannot change balance:', err)
      throw err
    })
}
