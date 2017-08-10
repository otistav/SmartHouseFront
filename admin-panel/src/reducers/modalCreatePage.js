import * as constants from '../constants/actions'

export default function modalCreateUser(state = {openModalFlag:false, fail: false,
  isFetching:false, errorMessage: ''}, action) {
  switch(action.type) {
    case constants.PAGE_MODAL_OPENED: {
      return {
        ...state,
        openModalFlag: true
      }
    }

    case constants.PAGE_MODAL_CLOSED: {
      return {
        ...state,
        isFetching: false,
        openModalFlag: false
      }
    }

    case constants.ICONS_RECEIVED: {
      return {
        ...state,
        icons: action.payload
      }
    }

    case constants.PAGE_NAME_CHANGED: {
      return {
        ...state,
        name: action.payload
      }
    }

    case constants.PAGE_CAPTION_CHANGED: {
      return {
        ...state,
        caption: action.payload
      }
    }

    case constants.PAGE_WIDTH_CHANGED: {
      return {
        ...state,
        width: action.payload
      }
    }

    case constants.PAGE_HEIGHT_CHANGED: {
      return {
        ...state,
        height: action.payload
      }
    }

    case constants.PAGE_X_POSITION_CHANGED: {
      return {
        ...state,
        position_x: action.payload
      }
    }

    case constants.PAGE_Y_POSITION_CHANGED: {
      return {
        ...state,
        position_y: action.payload
      }
    }
    case constants.ICON_ID_CHANGED: {
      return {
        ...state,
        iconID: action.payload
      }
    }
    default: return state;
  }
}
