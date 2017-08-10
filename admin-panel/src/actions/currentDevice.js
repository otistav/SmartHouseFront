import * as constants from '../constants/actions'
import axios from 'axios'
import {getDevices} from "./devices"
import {DEVICE_UUID_CHANGED} from "../constants/actions";



export
const deleteDevice = (id) => {

  return (dispatch) => {
    return axios.delete("http://localhost:3001/devices/" + id).then((res) => {
      axios.get("http://localhost:3001/users").then((res) => {
        dispatch(getDevices(res));
        dispatch({type: constants.DEVICE_DELETED})
      })
    }).catch(err => {
      if (err.response.data.message === undefined){
        dispatch(handleError('there is some problem on server! Please, try again later'));
      }
      else {
        dispatch(handleError(err.response.data.message))
      }
    });
  };
};

export function getDevice(device) {
  return {
    type: constants.CURRENT_DEVICE_RECEIVED,
    payload: device.data
  }

}

export function getDeviceForm(device) {
  return {
    type: constants.DEVICE_FORM_FIELDS_SET,
    payload: device.data
  }

}

export
const editDevice = (id, name,uuid) => {

  return (dispatch) => {
    return axios.patch("http://localhost:3001/devices/" + id,
      {
        name: name,
        typeUUID: uuid

      }).then((res) => {
      console.log(res);
      axios.get("http://localhost:3001/devices").then((res) => {
        dispatch(getDevices(res));
      })
    }).then(() => {
      axios.get("http://localhost:3001/devices/"+id).then((res) => {
        console.log("DEVICE");
        dispatch(getDevice(res));
        dispatch(getDeviceForm(res))

      })

    }).catch(err => {
      if (err.response.data.message === undefined){
        dispatch(handleError('there is some problem on server! Please, try again later'));
      }
      else {
        dispatch(handleError(err.response.data.message))
      }
    })
  }

};


export function openConfirmModal() {
  return {
    type: constants.DEVICE_CONFIRM_MODAL_OPEN
  }

}

export function closeConfirmModal() {
  return {
    type: constants.DEVICE_CONFIRM_MODAL_CLOSE
  }

}




export function changeName(name) {
  return {
    type: constants.DEVICE_NAME_CHANGED,
    payload: name
  }

}

export function changeDevType(uuid) {
  return {
    type: DEVICE_UUID_CHANGED,
    payload: uuid
  }

}

export
const getCurrentDevice = (id) => {

  return (dispatch) => {
    return axios.get("http://localhost:3001/devices/"+id).then((res) => {
      console.log("USER");
      dispatch(getDevice(res));
      dispatch(getDeviceForm(res))

    }).catch(err => {
      if (err.response.data.message === undefined){
        dispatch(handleError('there is some problem on server! Please, try again later'));
        setTimeout(() => {dispatch({type: constants.RESET_DEVICE_FAIL})}, 3000)
      }
      else {
        dispatch(handleError(err.response.data.message));
        setTimeout(() => {dispatch({type: constants.RESET_DEVICE_FAIL})}, 3000)
      }


    });
  };
};



export const handleError = (message) => {
  return {
    type: constants.CURRENT_DEVICE_ERROR,
    payload: message
  }
};
