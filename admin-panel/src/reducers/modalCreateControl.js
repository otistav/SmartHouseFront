import * as constants from '../constants/actions'


export default function modalCreateControl(state={openModalFlag:false,fail: false, errorMessage: '',
  currentControlType: null,name:''}, action) {
  switch (action.type) {
    case constants.CONTROL_MODAL_OPENED: {
      return {
        ...state,
        openModalFlag: true
      }
    }

    case constants.CONTROL_TYPE_CHANGED: {
      return {
        ...state,
        fail:false,
        currentControlType: action.payload
      }
    }

    case constants.CONTROL_MODAL_CLOSED: {
      return {
        ...state,
        fail:false,
        openModalFlag: false
      }
    }

    case constants.CONTROL_IS_NOT_CREATED: {
      return {
        ...state,
        fail: true,
        errorMessage: action.payload

      }
    }

    case constants.CONTROL_NAME_CHANGED_C: {
      return {
        ...state,
        fail:false,
        name: action.payload
      }
    }
    default: return state
  }

}