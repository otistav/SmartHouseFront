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
const createRule = (id, type, event, func) => {

  return dispatch => {
    return axios.post("http://localhost:3001/rules",
      {
        sourceID: id,
        sourceType: type,
        event: event,
        func: func
      }).then((res) =>
    {
      console.log(res)
    })
  }
};


export
const editRule = (id, event, func) => {

  return dispatch => {
    return axios.patch("http://localhost:3001/rules/" + id,
      {
        event: event,
        func: func
      }).then((res) =>
    {
      console.log(res)
    })
  }
};

export function createNewRule(rule) {
  return {
    type: constants.NEW_RULE_CREATED,
    payload: rule
  }
}

export function editRuleFunc(func) {
  return {
    type: constants.RULE_FUNC_EDITED,
    payload: func
  }

}

export function editRuleEvent(func) {
  return {
    type: constants.RULE_EVENT_EDITED,
    payload: func
  }

}

export function selectCurrentRule(rule) {
  return {
    type: constants.CURRENT_RULE_SELECTED,
    payload: rule
  }
}

export function setRules(rules) {
  return {
    type: constants.CONTROL_RULES_RECEIVED,
    payload: rules
  }
}

export
const getRules = (id) => {
  return dispatch => {
    axios.get("http://localhost:3001/rules?controlID=" + id +"&type=control").then((res) => {
      console.log(res);
      dispatch(setRules(res.data))

      }
    )
  }
};

export
const editControl = (id, name,uuid, func) => {

  return (dispatch) => {
    return axios.patch("http://localhost:3001/controls/" + id,
      {
        name: name,
        typeUUID: uuid,
        func: func

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
      if (err.response === undefined){
        dispatch(handleError('there is some problem on server! Please, try again later'));
      }
      else {
        dispatch(handleError(err.response.data.message))
      }
    })
  }

};

export
const editControlFunction = (id, func) => {

  return (dispatch) => {
    return axios.patch("http://localhost:3001/controls/" + id,
      {
        propFunction: func

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
      if (err.response === undefined){
        dispatch(handleError('there is some problem on server! Please, try again later'));
      }
      else {
        dispatch(handleError(err.response.data.message))
      }
    })
  }

};

export function onEditControlFunction(func) {
  return {
    type: constants.CONTROL_FUNCTION_EDITED,
    payload: func
  }
}


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
      if (err.response === undefined){
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