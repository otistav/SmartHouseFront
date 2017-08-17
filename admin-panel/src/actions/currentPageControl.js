import * as constants from '../constants/actions'
import axios from 'axios'
import {getPageControls} from "./currentPage"

export function editControlHeight(height) {
  return {
    type: constants.CURRENT_PAGE_CONTROL_HEIGHT_EDITED,
    payload: height
  }
}

export function editControlWeight(weight) {
  return {
    type: constants.CURRENT_PAGE_CONTROL_WEIGHT_EDITED,
    payload: weight
  }
}

export function editControlPositionX(position_x) {
  return {
    type: constants.CURRENT_PAGE_CONTROL_POSITION_X_EDITED,
    payload: position_x
  }
}

export function editControlPositionY(position_y) {
  return {
    type: constants.CURRENT_PAGE_CONTROL_POSITION_Y_EDITED,
    payload: position_y
  }
}

export
const editCurrentPageControl = (id,pageID, height, width, position_x, position_y) => {

  return (dispatch) => {
    return axios.patch("http://localhost:3001/pageControls/" + id,
      {
        height: height,
        width: width,
        position_x: position_x,
        position_y: position_y

      }).then((res) => {
      console.log("SUCCESS");
      axios.get("http://localhost:3001/getPageControls?page_id=" + pageID).then((res) => {
        dispatch(getPageControls(res));
        console.log("ANOTHER SUCCESS")
      })

    }).catch(err => {
      console.log(err);
    })
  }
};


export
const deletePageControl = (id) => {

  return (dispatch) => {
    return axios.delete("http://localhost:3001/pageControls/" + id).then((res) => {
      dispatch({type: constants.CURRENT_PAGE_CONTROL_DELETED})

    }).catch(err => {
      console.log(err)
    })
  }

};


