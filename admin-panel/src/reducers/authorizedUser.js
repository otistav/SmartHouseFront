import * as constants from '../constants/actions'

export default function authorizedUser(state = {}, action) {
  switch(action.type){
    case constants.USER_RECEIVED: {
      return {
        ...state,
        user: action.payload
      }
    }
    case constants.LOGOUT: {
      return {}
    }
    case constants.DEFINE_USER: {
      return {
        ...state,
        authorized: action.payload
      }
    }
    default: return state;
  }

}