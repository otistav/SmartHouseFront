import * as constants from '../constants/actions'
import axios from 'axios'

export function getPages(pages) {
  return {
    type: constants.PAGES_RECEIVED,
    payload: pages.data,
  }
}


export
const dispatchPages = () => {

  return (dispatch) => {
    return axios.get("http://localhost:3001/pages").then((res) => {
      dispatch(getPages(res));
    }).catch(err => {
      console.log("Devices not received!!!!")
    });
  };
};