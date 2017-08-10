import * as constants from '../constants/actions'

export default function users(state = {fail: false,errorMessage: ''}, action) {
  switch(action.type){
    case constants.USERS_RECEIVED: {
      return {
        ...state,
        users: action.payload
      }
    }

    case constants.USERS_ERROR: {
      return {
        ...state,
        fail: true,
        errorMessage: action.payload
      }
    }

    case constants.RESET_USERS_FAIL: {
      return {
        ...state,
        fail: false,
        errorMessage: ''
      }
    }
    default: return state;
  }

}