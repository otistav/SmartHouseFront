import * as constants from '../constants/actions'


export default function modalCreateDevice(state={openModalFlag:false,fail: false, errorMessage: '',
                                                    currentDeviceType: null,name:''}, action) {
  switch (action.type) {
    case constants.DEVICE_MODAL_OPENED: {
      return {
        ...state,
        openModalFlag: true
      }
    }

    case constants.DEVICE_TYPE_CHANGED: {
      return {
        ...state,
        fail:false,
        currentDeviceType: action.payload
      }
    }

    case constants.DEVICE_MODAL_CLOSED: {
      return {
        ...state,
        fail:false,
        openModalFlag: false
      }
    }

    case constants.DEVICE_IS_NOT_CREATED: {
      return {
        ...state,
        fail: true,
        errorMessage: action.payload

      }
    }

    case constants.DEVICE_NAME_CHANGED_C: {
      return {
        ...state,
        fail:false,
        name: action.payload
      }
    }
    default: return state
  }

}