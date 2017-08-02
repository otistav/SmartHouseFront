import * as constants from '../constants/actions'

export default function loginForm(state = {fail: false}, action) {
  switch(action.type){
    case constants.IS_FETCHING: {
      return {
        ...state,
        isFetching: true
    };
    }
    case constants.CHANGE_LOGIN: {
      return {
        ...state,
        login: action.payload
      }
    }
    case constants.CHANGE_PASSWORD: {
      return {
        ...state,
        password: action.payload
      }
    }
    case constants.USER_RECEIVED: {
      return {
        ...state,
        isFetching: false,
        fail: false
      }
    }
    case constants.USER_NOT_RECEIVED: {
      return {
        ...state,
        isFetching: false,
        fail: true,
        message: action.payload
      }
    }
    case constants.RESET_FAIL: {
      return {
        ...state,
        fail: false,


      }
    }
    default: return state;
  }
}