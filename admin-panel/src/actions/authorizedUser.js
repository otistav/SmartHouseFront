import * as constants from '../constants/actions'

export function saveUser(user) {
  return {
    type: constants.USER_RECEIVED,
    payload: user,
  }
}

export function logOut() {
  return{
    type: constants.LOGOUT
  }

}

export function defineUser(state) {
  return {
    type: constants.DEFINE_USER,
    payload: state
  }

}