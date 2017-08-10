import * as constants from '../constants/actions'
import axios from 'axios'
import {getUsers} from "./users"


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

export function changeAdminStatus(isAdmin) {
  return {
    type: constants.ADMIN_STATUS_CHANGED,
    payload: isAdmin
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

export
const createUser = (login, password, firstName, lastName, isAdmin) => {

  return (dispatch) => {
    dispatch({type: constants.CREATE_USER_FETCHING});
    axios.post("http://localhost:3001/users",{
      login: login,
      password: password,
      firstName: firstName,
      lastName: lastName,
      isAdmin: isAdmin
    }).then(() => {
      dispatch(closeModal());
      dispatch({type: constants.USER_CREATED})
    }).then(() =>
    {
      axios.get("http://localhost:3001/users").then((res) => {
        dispatch(getUsers(res));

      })
    }).catch((err) =>
    {
      dispatch(handleError(err.response.data.message))
    })
  };

};

export function handleError(message) {
  return {
    type: constants.USER_IS_NOT_CREATED,
    payload: message
  }
}