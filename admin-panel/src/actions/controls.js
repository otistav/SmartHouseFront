import * as constants from '../constants/actions'
import axios from 'axios'

export function getControls(controls) {
  return {
    type: constants.CONTROLS_RECEIVED,
    payload: controls.data,
  }
}

export function getControlTypes(deviceTypes) {
  return {
    type: constants.CONTROL_TYPES_RECEIVED,
    payload: deviceTypes.data
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

export const setControlTypes = () => {
  return (dispatch) => {
    return axios.get("http://localhost:3001/controltypes").then((res) => {
      dispatch(getControlTypes(res));
      console.log('DeviceTypes received, asshole')
    }).catch(err => {
      console.log("DEVICETYPES NOT RECEIVED,ASSHOLE")
    })
  }
};