import * as constants from '../constants/actions'
import axios from 'axios'
import {getControls} from "./controls"


export function openModal() {
  return {
    type: constants.CONTROL_MODAL_OPENED
  }

}

export function closeModal() {
  return {
    type: constants.CONTROL_MODAL_CLOSED
  }

}

export function changeName(name) {
  return {
    type: constants.CONTROL_NAME_CHANGED_C,
    payload: name
  }
}


export function changeControlType(ControlType) {
  return {
    type: constants.CONTROL_TYPE_CHANGED,
    payload: ControlType
  }
}

export const createControl = (name, devType) => {

  return (dispatch) => {
    axios.post("http://localhost:3001/controls",{name: name,typeUUID: devType}).then(() => {
      dispatch(closeModal());

    }).then(() => {
      axios.get("http://localhost:3001/controls").then(res => {
        dispatch(getControls(res))
      })
    }).catch((err) => {
      dispatch(handleError(err.response.data.message))
    })
  }
};

export function handleError(message) {
  return {
    type: constants.CONTROL_IS_NOT_CREATED,
    payload: message
  }
}