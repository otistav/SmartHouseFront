import * as constants from '../constants/actions'

export default function currentUser(state = {confirmModalOpen: false,fail: false, errorMessage:''}, action) {
  switch(action.type){
    case constants.CURRENT_USER_RECEIVED: {
      return {
        ...state,
        user: action.payload
      }
    }

    case constants.CONFIRM_MODAL_OPEN: {
      return {
        ...state,
        confirmModalOpen: true
      }

    }

    case constants.CONFIRM_MODAL_CLOSE: {
      return {
        ...state,
        confirmModalOpen: false
      }
    }

    case constants.USER_FORM_FIELDS_SET: {
      return {
        ...state,
        userForm: action.payload
      }
    }

    case constants.USER_LOGIN_CHANGED: {
      return {
        ...state,
        userForm: {
          ...state.userForm,
          login: action.payload
        }

      }
    }
    case constants.USER_FIRST_NAME_CHANGED: {
      return {
        ...state,
        userForm : {
          ...state.userForm,
          firstName: action.payload
        }

      }
    }

    case constants.USER_LAST_NAME_CHANGED: {
      return {
        ...state,
        userForm : {
          ...state.userForm,
          lastName: action.payload
        }

      }
    }

    case constants.USER_ADMIN_STATUS_CHANGED: {
      return {
        ...state,
        userForm : {
          ...state.userForm,
          isAdmin: action.payload
        }

      }
    }

    case constants.CURRENT_USER_ERROR: {
      return {
        ...state,
        errorMessage: action.payload,
        fail: true
      }
    }

    case constants.RESET_FAIL: {
      return {
        ...state,
        errorMessage: '',
        fail: false
      }
    }
    case constants.USER_DELETED: {
      return {
        ...state,
        errorMessage: '',
        fail: false
      }
    }

    default: return state;
  }

}