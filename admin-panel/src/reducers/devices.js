import * as constants from '../constants/actions'

export default function devices(state = {}, action) {
  switch(action.type){
    case constants.DEVICES_RECEIVED: {
      return {
        ...state,
         devices: action.payload
      }
    }
    case constants.DEVICE_TYPES_RECEIVED: {
      return {
        ...state,
        deviceTypes: action.payload
      }
    }
    default: return state;
  }

}