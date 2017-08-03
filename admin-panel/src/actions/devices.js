import * as constants from '../constants/actions'
import axios from 'axios'

export function getDevices(devices) {
  return {
    type: constants.DEVICES_RECEIVED,
    payload: devices.data,
  }
}

export
const dispatchDevices = () => {

  return (dispatch) => {
    return axios.get("http://localhost:3001/devices").then((res) => {
      dispatch(getDevices(res));
    }).catch(err => {
      console.log("Devices not received!!!!")
    });
  };
};
