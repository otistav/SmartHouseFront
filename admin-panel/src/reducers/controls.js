import * as constants from '../constants/actions'

export default function controls(state = {isFetchingControls:false, controls: []}, action) {
  switch(action.type){
    case constants.CONTROLS_RECEIVED: {
      return {
        ...state,
        controls: action.payload,
        isFetchingControls:false
      }
    }
    case constants.CONTROL_TYPES_RECEIVED: {
      return {
        ...state,
        controlTypes: action.payload
      }
    }

    case constants.CONTROLS_IS_FETCHING: {
      return {
        ...state,
        isFetchingControls: true
      }
    }
    default: return state;
  }


}