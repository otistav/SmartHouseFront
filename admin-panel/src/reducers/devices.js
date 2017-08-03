import * as constants from '../constants/actions'

export default function devices(state = {}, action) {
  switch(action.type){
    case constants.DEVICES_RECEIVED: {
      return {
         devices: action.payload
      }
    }
    default: return state;
  }

}