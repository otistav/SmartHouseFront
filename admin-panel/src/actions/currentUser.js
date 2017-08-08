import * as constants from '../constants/actions'
import axios from 'axios'
import {getUsers} from "./users"



export
const deleteUser = (id) => {

  return (dispatch) => {
    return axios.delete("http://localhost:3001/users/" + id).then((res) => {
      axios.get("http://localhost:3001/users").then((res) => {
        dispatch(getUsers(res));
      })
    }).catch(err => {
      console.log(err)
    });
  };
};

export function getUser(user) {
  return {
    type: constants.CURRENT_USER_RECEIVED,
    payload: user.data
  }

}

export function getUserForm(user) {
  return {
    type: constants.USER_FORM_FIELDS_SET,
    payload: user.data
  }

}

export
const editUser = (id, login, firstName, lastName, adminStatus) => {

  return (dispatch) => {
    return axios.patch("http://localhost:3001/users/" + id,
      {
        login: login,
        firstName: firstName,
        lastName: lastName,
        isAdmin: adminStatus
      }).then((res) => {
      console.log(res);
      axios.get("http://localhost:3001/users").then((res) => {
        dispatch(getUsers(res));
      })
    }).then(() => {
      axios.get("http://localhost:3001/users/"+id).then((res) => {
        console.log("USER");
        dispatch(getUser(res));
        dispatch(getUserForm(res))

      })

    }).catch(err => {
      console.log(err.response.data.message)
    })
  }

};


export function openConfirmModal() {
  return {
    type: constants.CONFIRM_MODAL_OPEN
  }

}

export function closeConfirmModal() {
  return {
    type: constants.CONFIRM_MODAL_CLOSE
  }

}




export function changeLogin(login) {
  return {
    type: constants.USER_LOGIN_CHANGED,
    payload: login
  }

}

export function changeFirstName(firstName) {
  return {
    type: constants.USER_FIRST_NAME_CHANGED,
    payload: firstName
  }

}

export function changeLastName(lastName) {
  return {
    type: constants.USER_LAST_NAME_CHANGED,
    payload: lastName
  }

}

export function changeAdminStatus(adminStatus) {
  return {
    type: constants.USER_ADMIN_STATUS_CHANGED,
    payload: adminStatus
  }

}
export
const getCurrentUser = (id) => {

  return (dispatch) => {
    return axios.get("http://localhost:3001/users/"+id).then((res) => {
      console.log("USER");
      dispatch(getUser(res));
      dispatch(getUserForm(res))

    }).catch(err => {
      console.log("Devices not received!!!!")
    });
  };
};