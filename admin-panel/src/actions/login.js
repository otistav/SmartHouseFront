import * as constants from '../constants/actions'
import axios from 'axios'
import {saveUser} from "./authorizedUser"
import {defineUser} from "./authorizedUser"

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

export
const getUser = (login, password) => {

  return (dispatch) => {
    dispatch({type: constants.IS_FETCHING});

    return axios.post("http://localhost:3001/signin", {
      username: login,
      password: password
    }).then((res) => {
      dispatch(saveUser({firstName: res.data.firstName, lastName: res.data.lastName, isAdmin: res.data.isAdmin}));
      dispatch(defineUser(true));


    }).catch(err => {
      console.log("this is error ",err.response.data.message);
      if (err.response.data.message === undefined){
        dispatch(handleError('there is some problem on server! Please, try again later'));
      }
      else {
        dispatch(handleError(err.response.data.message))
      }

      setTimeout(() => {dispatch({type: constants.RESET_FAIL})},2000);
      return Promise.reject(err);
    });


  };
};


export function handleError(message) {
  return {
    type: constants.USER_NOT_RECEIVED,
    payload: message
  }

}