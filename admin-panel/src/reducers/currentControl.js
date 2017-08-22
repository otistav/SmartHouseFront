import * as constants from '../constants/actions'

export default function currentControl(state = {confirmModalOpen: false,fail: false, errorMessage:''}, action) {
  switch(action.type){
    case constants.CURRENT_CONTROL_RECEIVED: {
      return {
        ...state,
        control: action.payload
      }
    }

    case constants.CONTROL_CONFIRM_MODAL_OPEN: {
      return {
        ...state,
        confirmModalOpen: true
      }

    }

    case constants.CONTROL_CONFIRM_MODAL_CLOSE: {
      return {
        ...state,
        confirmModalOpen: false
      }
    }

    case constants.CONTROL_FORM_FIELDS_SET: {
      return {
        ...state,
        controlForm: action.payload
      }
    }

    case constants.CONTROL_NAME_CHANGED: {
      return {
        ...state,
        controlForm: {
          ...state.controlForm,
          name: action.payload
        }

      }
    }

    case constants.CONTROL_RULES_RECEIVED: {
      return {
        ...state,
        rules: action.payload
      }
    }

    case constants.CURRENT_RULE_SELECTED: {
      return {
        ...state,
        currentRule: action.payload,
        currentRuleForm: action.payload
      }
    }
    case constants.NEW_RULE_CREATED: {
      return {
        ...state,
        rules: [...state.rules, action.payload]

      }
    }
    case constants.RESET_CONTROL_FAIL: {
      return {
        ...state,
        errorMessage: '',
        fail: false
      }
    }
    case constants.CONTROL_UUID_CHANGED: {
      return {
        ...state,
        controlForm : {
          ...state.controlForm,
          typeUUID: action.payload
        }

      }
    }

    case constants.RULE_FUNC_EDITED: {
      return {
        ...state,
        currentRuleForm: {
          ...state.currentRuleForm,
          func: action.payload
        }
      }
    }

    case constants.CONTROL_FUNCTION_EDITED: {
      return {
        ...state,
        controlForm: {
          ...state.controlForm,
          propFunction: action.payload
        }
      }
    }
    case constants.RULE_EVENT_EDITED: {
      return {
        ...state,
        currentRuleForm: {
          ...state.currentRuleForm,
          event: action.payload
        }
      }
    }

    case constants.CURRENT_CONTROL_ERROR: {
      return {
        ...state,
        fail: true,
        errorMessage: action.payload
      }
    }

    case constants.CONTROL_DELETED: {
      return {
        ...state,
        errorMessage: '',
        fail: false
      }
    }

    default: return state;
  }

}