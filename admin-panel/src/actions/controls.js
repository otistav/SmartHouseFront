import * as constants from '../constants/actions'
import axios from 'axios'

export function getControls(controls) {
  return {
    type: constants.CONTROLS_RECEIVED,
    payload: controls.data,
  }
}

export
const dispatchControls = () => {

  return (dispatch) => {
    return axios.get("http://localhost:3001/controls").then((res) => {
      dispatch(getControls(res));
    }).catch(err => {
      console.log("Devices not received!!!!")
    });
  };
};
