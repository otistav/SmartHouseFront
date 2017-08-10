import * as constants from '../constants/actions'
import axios from 'axios'

export function getDevices(devices) {
  return {
    type: constants.DEVICES_RECEIVED,
    payload: devices.data,
  }
}

export function getDeviceTypes(deviceTypes) {
  return {
    type: constants.DEVICE_TYPES_RECEIVED,
    payload: deviceTypes.data
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

export const setDeviceTypes = () => {
  return (dispatch) => {
    return axios.get("http://localhost:3001/devicetypes").then((res) => {
      dispatch(getDeviceTypes(res));
      console.log('DeviceTypes received, asshole')
    }).catch(err => {
      console.log("DEVICETYPES NOT RECEIVED,ASSHOLE")
    })
  }
};
