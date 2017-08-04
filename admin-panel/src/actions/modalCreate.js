import * as constants from '../constants/actions'



export function openModal() {
  return {
    type: constants.MODAL_OPENED
  }

}

export function closeModal() {
  return {
    type: constants.MODAL_CLOSED
  }

}

export function changeFirstName(firstName) {
  return {
    type: constants.FIRST_NAME_CHANGED,
    payload: firstName

  }
}

export function changeLastName(lastName) {
  return {
    type: constants.LAST_NAME_CHANGED,
    payload: lastName

  }
}

export function setAdminStatus() {
  return {
    type: constants.ADMIN_STATUS_CHANGED
  }
}

export function changeLogin(login) {
  return {
    type: constants.CHANGE_LOGIN_WHEN_CREATE,
    payload: login

  }
}

export function changePassword(password) {
  return {
    type: constants.CHANGE_PASSWORD_WHEN_CREATE,
    payload: password

  }
}