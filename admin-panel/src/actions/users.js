import * as constants from '../constants/actions'
import axios from 'axios'

export function getUsers(users) {
  return {
    type: constants.USERS_RECEIVED,
    payload: users.data,
  }
}



export
const dispatchUsers = () => {

  return (dispatch) => {
    return axios.get("http://localhost:3001/users").then((res) => {
      dispatch(getUsers(res));
    }).catch(err => {
      if (err.response.data.message === undefined){
        dispatch(handleError('there is some problem on server! Please, try again later'));
        setTimeout(() => {dispatch({type: constants.RESET_USERS_FAIL})}, 3000)
      }
      else {
        dispatch(handleError(err.response.data.message));
        setTimeout(() => {dispatch({type: constants.RESET_USERS_FAIL})}, 3000);
        return Promise.reject(err)
      }
    });
  };
};


export const handleError = (message) => {
  return {
    type: constants.USERS_ERROR,
    payload: message
  }
};



