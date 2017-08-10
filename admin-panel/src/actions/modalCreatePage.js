import * as constants from '../constants/actions'
import axios from 'axios'
import {getPages} from "./pages"


export function openModal() {
  return {
    type: constants.PAGE_MODAL_OPENED
  }

}

export function closeModal() {
  return {
    type: constants.PAGE_MODAL_CLOSED
  }

}


export function setIcons(icons) {
  return {
    type: constants.ICONS_RECEIVED,
    payload: icons.data
  }
}

export
const getIcons = () => {

  return (dispatch) => {
    return axios.get("http://localhost:3001/icons").then((res) => {
      console.log('ICONS RECEIVED');
      dispatch(setIcons(res));
    }).catch(err => {
      console.log("Icons not received!!!!")
    });
  };
};

export function changeIconID(iconID) {
  return {
    type: constants.ICON_ID_CHANGED,
    payload: iconID
  }
}

export function changeName(name) {
  return {
    type: constants.PAGE_NAME_CHANGED,
    payload: name
  }
}

export function changeCaption(caption) {
  return {
    type: constants.PAGE_CAPTION_CHANGED,
    payload: caption
  }
}

export function changeWidth(width) {
  return {
    type: constants.PAGE_WIDTH_CHANGED,
    payload: width
  }
}

export function changeHeight(height) {
  return {
    type: constants.PAGE_HEIGHT_CHANGED,
    payload: height
  }
}

export function changeXPosition(position_x) {
  return {
    type: constants.PAGE_X_POSITION_CHANGED,
    payload: position_x
  }
}

export function changeYPosition(position_y) {
  return {
    type: constants.PAGE_Y_POSITION_CHANGED,
    payload: position_y
  }
}

export
const createPage = (iconID, name, caption,
                    width, height, position_x,
                    position_y) =>
{

  return (dispatch) => {
    axios.post("http://localhost:3001/pages",{
      iconID: iconID,
      name: name,
      caption: caption,
      width: width,
      height: height,
      position_x: position_x,
      position_y: position_y
    }).then(() => {
      dispatch(closeModal());
      dispatch({type: constants.PAGE_CREATED})
    }).then(() =>
    {
      axios.get("http://localhost:3001/pages").then((res) => {
        dispatch(getPages(res));

      })
    }).catch((err) =>
    {

    })
  };

};
