import * as constants from '../constants/actions'

export default function modalCreateUser(state = {flag:false,login:'',password:''}, action) {
  switch(action.type){
    case constants.MODAL_OPENED: {
      return {
        ...state,
        flag: true
      }
    }

    case constants.MODAL_CLOSED: {
      return {
        ...state,
        flag: false
      }
    }
    case constants.CHANGE_LOGIN_WHEN_CREATE: {
      return {
        ...state,
        login: action.payload
      }
    }
    case constants.CHANGE_PASSWORD_WHEN_CREATE: {
      return {
        ...state,
        password: action.payload
      }
    }
    default: return state;
  }
}

