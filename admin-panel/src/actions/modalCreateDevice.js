import * as constants from '../constants/actions'
import axios from 'axios'
import {getDevices} from "./devices"


export function openModal() {
  return {
    type: constants.DEVICE_MODAL_OPENED
  }

}

export function closeModal() {
  return {
    type: constants.DEVICE_MODAL_CLOSED
  }

}

export function changeName(name) {
  return {
    type: constants.DEVICE_NAME_CHANGED_C,
    payload: name
  }

}

export function changeDeviceType(deviceType) {
  return {
    type: constants.DEVICE_TYPE_CHANGED,
    payload: deviceType
  }

}

export const createDevice = (name, devType) => {

  return (dispatch) => {
    axios.post("http://localhost:3001/devices",{name: name,typeUUID: devType}).then(() => {
      dispatch(closeModal());

    }).then(() => {
      axios.get("http://localhost:3001/devices").then(res => {
        dispatch(getDevices(res))
      })
    }).catch((err) => {
      dispatch(handleError(err.response.data.message))
    })
  }
}

export function handleError(message) {
  return {
    type: constants.DEVICE_IS_NOT_CREATED,
    payload: message
  }
}