import * as constants from '../constants/actions'

export default function controls(state = {}, action) {
  switch(action.type){
    case constants.CONTROLS_RECEIVED: {
      return {
        ...state,
        controls: action.payload
      }
    }
    case constants.CONTROL_TYPES_RECEIVED: {
      return {
        ...state,
        controlTypes: action.payload
      }
    }
    default: return state;
  }


}