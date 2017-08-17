import * as constants from '../constants/actions'
import axios from 'axios'
import {getPages} from "./pages"
import {DEVICE_UUID_CHANGED} from "../constants/actions";


export function getPageControls(pageControls) {
  return {
    type: constants.PAGE_CONTROLS_RECEIVED,
    payload: pageControls.data
  }
}

export function pageControl(pageControl) {
  return {
    type: constants.PAGE_CONTROL_ADDED,
    payload: pageControl.data
  }
}

export function pageControlForm(pageControlForm) {
  return {
    type: constants.PAGE_CONTROL_FORM_ADDED,
    payload: pageControlForm.data
  }
}

export
const addPageControl = (id, controlID) => {
  return dispatch => {
    return axios.post("http://localhost:3001/pageControls?pageID=" + id,{
      width: 1,
      height: 1,
      controlID: controlID,
      position_x: 1,
      position_y: 1
    }).then(
      res => {
        dispatch(pageControl(res));
        dispatch(pageControlForm(res))


      }

    )


  }
};

export
const getControls = (id) => {
  return (dispatch) => {
    dispatch({type: constants.PAGE_CONTROLS_IS_FETCHING});
    return axios.get("http://localhost:3001/getPageControls?page_id=" + id).then(res => {
      dispatch(getPageControls(res))
    }).catch(err => {
      console.log("HEY")
    })
  }
};

export
const deletePage = (id) => {

  return (dispatch) => {
    return axios.delete("http://localhost:3001/pages/" + id).then((res) => {
      axios.get("http://localhost:3001/pages").then((res) => {
        dispatch(getPages(res));
        dispatch({type: constants.PAGE_DELETED})
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

export function getPage(device) {
  return {
    type: constants.CURRENT_PAGE_RECEIVED,
    payload: device.data
  }
}

export function getPageForm(device) {
  return {
    type: constants.PAGE_FORM_FIELDS_SET,
    payload: device.data
  }
}

export function setCurrentControl(control) {
  return {
    type: constants.CURRENT_PAGE_CONTROL_SELECTED,
    payload: control,
    form: control.pageControl[0]
  }
}



export
const editPage = (id, iconID, name, caption,
                  width, height, position_x,
                  position_y) => {

  return (dispatch) => {
    return axios.patch("http://localhost:3001/pages/" + id,
      {
        name: name,
        iconID: iconID,
        caption: caption,
        width: width,
        height: height,
        position_x: position_x,
        position_y: position_y

      }).then((res) => {
      console.log(res);
      axios.get("http://localhost:3001/pages").then((res) => {
        dispatch(getPages(res));
      })
    }).then(() => {
      axios.get("http://localhost:3001/pages/"+id).then((res) => {
        console.log("DEVICE");
        dispatch(getPage(res));
        dispatch(getPageForm(res))
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
    type: constants.PAGE_CONFIRM_MODAL_OPEN
  }

}

export function closeConfirmModal() {
  return {
    type: constants.PAGE_CONFIRM_MODAL_CLOSE
  }

}




export function changeName(name) {
  return {
    type: constants.PAGE_NAME_EDITED,
    payload: name
  }

}

export function changeCaption(caption) {
  return {
    type: constants.PAGE_CAPTION_EDITED,
    payload: caption
  }
}

export function changeWidth(width) {
  return {
    type: constants.PAGE_WIDTH_EDITED,
    payload: width
  }
}

export function changeHeight(height) {
  return {
    type: constants.PAGE_HEIGHT_EDITED,
    payload: height
  }
}

export function changeXPosition(position_x) {
  return {
    type: constants.PAGE_X_POSITION_EDITED,
    payload: position_x
  }
}

export function changeYPosition(position_y) {
  return {
    type: constants.PAGE_Y_POSITION_EDITED,
    payload: position_y
  }
}

export function changeIcon(iconID) {
  return {
    type: constants.PAGE_ICON_EDITED,
    payload: iconID
  }

}

export
const getCurrentPage = (id) => {

  return (dispatch) => {
    dispatch({type: constants.CURRENT_PAGE_IS_FETCHING});
    return axios.get("http://localhost:3001/pages/"+id).then((res) => {
      dispatch(getPage(res));
      dispatch(getPageForm(res))

    }).catch(err => {
      if (err.message === undefined){

        dispatch(handleError(err.response.data.message));
        setTimeout(() => {dispatch({type: constants.RESET_PAGE_FAIL})}, 3000)
      }
      else {
        dispatch(handleError('there is some problem on server! Please, try again later'));
        setTimeout(() => {dispatch({type: constants.RESET_PAGE_FAIL})}, 3000)

      }


    });
  };
};



export const handleError = (message) => {
  return {
    type: constants.CURRENT_PAGE_ERROR,
    payload: message
  }
};
