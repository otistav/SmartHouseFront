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
      console.log("Users Not Received!!!!")
    });
  };
};


