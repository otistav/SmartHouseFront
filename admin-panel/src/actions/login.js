import * as constants from '../constants/actions'
export function changeLogin(login) {
  return {
    type: constants.CHANGE_LOGIN,
    payload: login

  }
}

export function changePassword(password) {
  return {
    type: constants.CHANGE_PASSWORD,
    payload: password

  }
}


export function handleError(message) {
  return {
    type: constants.USER_NOT_RECEIVED,
    payload: message
  }

}