import * as constants from '../constants/actions'
import axios from 'axios'
import {getControls} from "./controls"




export
const deleteControl = (id) => {

  return (dispatch) => {
    return axios.delete("http://localhost:3001/controls/" + id).then((res) => {
      axios.get("http://localhost:3001/controls").then((res) => {
        dispatch(getControls(res));
        dispatch({type: constants.CONTROL_DELETED})
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

export function getControl(control) {
  return {
    type: constants.CURRENT_CONTROL_RECEIVED,
    payload: control.data
  }

}



export function getControlForm(control) {
  return {
    type: constants.CONTROL_FORM_FIELDS_SET,
    payload: control.data
  }

}

export
const editControl = (id, name,uuid) => {

  return (dispatch) => {
    return axios.patch("http://localhost:3001/controls/" + id,
      {
        name: name,
        typeUUID: uuid

      }).then((res) => {
      console.log(res);
      axios.get("http://localhost:3001/controls").then((res) => {
        dispatch(getControls(res));
      })
    }).then(() => {
      axios.get("http://localhost:3001/controls/"+id).then((res) => {
        console.log("control");
        dispatch(getControl(res));
        dispatch(getControlForm(res))

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
    type: constants.CONTROL_CONFIRM_MODAL_OPEN
  }

}

export function closeConfirmModal() {
  return {
    type: constants.CONTROL_CONFIRM_MODAL_CLOSE
  }

}




export function changeName(name) {
  return {
    type: constants.CONTROL_NAME_CHANGED,
    payload: name
  }

}

export function changeControlType(uuid) {
  return {
    type: constants.CONTROL_UUID_CHANGED,
    payload: uuid
  }

}

export
const getCurrentControl = (id) => {

  return (dispatch) => {
    return axios.get("http://localhost:3001/controls/"+id).then((res) => {
      console.log("USER");
      dispatch(getControl(res));
      dispatch(getControlForm(res))

    }).catch(err => {
      if (err.response.data.message === undefined){
        dispatch(handleError('there is some problem on server! Please, try again later'));
        setTimeout(() => {dispatch({type: constants.RESET_CONTROL_FAIL})}, 3000)
      }
      else {
        dispatch(handleError(err.response.data.message));
        setTimeout(() => {dispatch({type: constants.RESET_CONTROL_FAIL})}, 3000)
      }


    });
  };
};



export const handleError = (message) => {
  return {
    type: constants.CURRENT_CONTROL_ERROR,
    payload: message
  }
};