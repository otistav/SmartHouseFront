import * as constants from '../constants/actions'

export default function currentDevice(state = {confirmModalOpen: false,fail: false, errorMessage:''}, action) {
  switch(action.type){
    case constants.CURRENT_DEVICE_RECEIVED: {
      return {
        ...state,
        device: action.payload
      }
    }

    case constants.DEVICE_CONFIRM_MODAL_OPEN: {
      return {
        ...state,
        confirmModalOpen: true
      }

    }

    case constants.DEVICE_FUNCTION_EDITED: {
      return {
        ...state,
        deviceForm: {
          ...state.controlForm,
          propFunction: action.payload
        }
      }
    }

    case constants.DEVICE_CONFIRM_MODAL_CLOSE: {
      return {
        ...state,
        confirmModalOpen: false
      }
    }

    case constants.DEVICE_RULES_RECEIVED: {
      return {
        ...state,
        rules: action.payload
      }
    }

    case constants.NEW_DEVICE_RULE_CREATED: {
      return {
        ...state,
        rules: [...state.rules, action.payload]

      }
    }

    case constants.DEVICE_RULE_FUNC_EDITED: {
      return {
        ...state,
        currentRuleForm: {
          ...state.currentRuleForm,
          func: action.payload
        }
      }
    }

    case constants.DEVICE_RULE_EVENT_EDITED: {
      return {
        ...state,
        currentRuleForm: {
          ...state.currentRuleForm,
          event: action.payload
        }
      }
    }


    case constants.CURRENT_DEVICE_RULE_SELECTED: {
      return {
        ...state,
        currentRule: action.payload,
        currentRuleForm: action.payload
      }
    }

    case constants.DEVICE_FORM_FIELDS_SET: {
      return {
        ...state,
        deviceForm: action.payload
      }
    }

    case constants.DEVICE_NAME_CHANGED: {
      return {
        ...state,
        deviceForm: {
          ...state.deviceForm,
          name: action.payload
        }

      }
    }
    case constants.RESET_DEVICE_FAIL: {
      return {
        ...state,
        errorMessage: '',
        fail: false
      }
    }
    case constants.DEVICE_UUID_CHANGED: {
      return {
        ...state,
        deviceForm : {
          ...state.deviceForm,
          typeUUID: action.payload
        }

      }
    }

    case constants.CURRENT_DEVICE_ERROR: {
      return {
        ...state,
        fail: true,
        errorMessage: action.payload
      }
    }
      
    case constants.DEVICE_DELETED: {
      return {
        ...state,
        errorMessage: '',
        fail: false
      }
    }

    default: return state;
  }

}