import * as constants from '../constants/actions'

export default function controls(state = {}, action) {
  switch(action.type){
    case constants.CONTROLS_RECEIVED: {
      return {
        controls: action.payload
      }
    }
    default: return state;
  }

}