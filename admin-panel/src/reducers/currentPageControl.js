import * as constants from '../constants/actions'

export default function currentPageControl(state = {
  currentControl: {},pageControlForm: {}
}, action) {
  switch(action.type){
    case constants.CURRENT_PAGE_CONTROL_SELECTED: {
      return {
        ...state,
        currentControl: action.payload,
        pageControlForm: action.form
      }
    }
    case constants.CURRENT_PAGE_CONTROL_POSITION_X_EDITED: {
      return {
        ...state,
        pageControlForm:{
          ...state.pageControlForm,
          position_x: action.payload
          }

      }
    }

    case constants.CURRENT_PAGE_CONTROL_POSITION_Y_EDITED: {
      return {
        ...state,
        pageControlForm:{
          ...state.pageControlForm,
          position_y: action.payload

        }

      }
    }

    case constants.CURRENT_PAGE_CONTROL_HEIGHT_EDITED: {
      return {
        ...state,
        pageControlForm:{
          ...state.pageControlForm,
          height: action.payload
        }

      }
    }

    case constants.CURRENT_PAGE_CONTROL_DELETED: {
      return {
        ...state,
        currentControl: {},
        pageControlForm: {}
      }
    }

    case constants.CURRENT_PAGE_CONTROL_WEIGHT_EDITED: {
      return {
        ...state,
        pageControlForm:{
          ...state.pageControlForm,
          width: action.payload
        }

      }
    }

    default: return state;
  }

}