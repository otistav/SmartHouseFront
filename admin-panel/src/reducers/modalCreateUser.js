import * as constants from '../constants/actions'

export default function modalCreateUser(state = {openModalFlag:false, fail: false,
  isAdmin: false, isFetching:false, login:'', password:'', errorMessage: ''}, action) {
  switch(action.type) {
    case constants.MODAL_OPENED: {
      return {
        ...state,
        openModalFlag: true
      }
    }

    case constants.MODAL_CLOSED: {
      return {
        ...state,
        isFetching: false,
        openModalFlag: false
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

    case constants.FIRST_NAME_CHANGED: {
      return {
        ...state,
        firstName: action.payload
      }
    }

    case constants.USER_CREATED: {
      return {
        ...state,
        isFetching: false,
        fail:false,
        errorMessage: ''
      }
    }

    case constants.LAST_NAME_CHANGED: {
      return {
        ...state,
        lastName: action.payload
      }
    }

    case constants.ADMIN_STATUS_CHANGED: {
      return {
        ...state,
        isAdmin: action.payload
      }
    }

    case constants.USER_IS_NOT_CREATED: {
      return {
        ...state,
        isFetching: false,
        fail: true,
        errorMessage: action.payload

      }
    }

    case constants.CREATE_USER_FETCHING: {
      return {
        ...state,
        isFetching: true
      }
    }
    default: return state;
  }
}

