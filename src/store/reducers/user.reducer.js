import { userService } from '../../services/user.service.js'

export const SET_USER = 'SET_USER'
export const SET_USERS = 'SET_USERS'
export const SET_USER_BALANCE = 'SET_USER_BALANCE'

const initialState = {
  count: 101,
  loggedinUser: userService.getLoggedinUser(),
  users: [],
  watchedUser: null,
}

export function userReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 }
    case 'DECREMENT':
      return { ...state, count: state.count - 1 }
    case 'CHANGE_BY':
      return { ...state, count: state.count + action.diff }

    case SET_USER:
      return { ...state, loggedinUser: action.user }
    case SET_USERS:
      return { ...state, users: action.users }
    case SET_USER_BALANCE:
      if (!state.user) return state
      return { ...state, user: { ...state.user, balance: action.balance } }

    default:
      return state
  }
}
