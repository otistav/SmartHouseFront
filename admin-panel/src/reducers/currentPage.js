import * as constants from '../constants/actions'

export default function currentPage(state = {
  currentControl: {},
  confirmModalOpen: false,fail: false,
  pageForm: [],
  pageControls: [],
  isFetchingPageControls:false, isFetchingCurrentPage: false,
  errorMessage:'',
}, action) {
  switch(action.type){
    case constants.CURRENT_PAGE_RECEIVED: {
      return {
        ...state,
        page: action.payload,
        isFetchingCurrentPage: false,
      }
    }


    case constants.CURRENT_PAGE_IS_FETCHING: {
      return {
        ...state,
        isFetchingCurrentPage: true,
      }
    }


    case constants.PAGE_CONFIRM_MODAL_OPEN: {
      return {
        ...state,
        confirmModalOpen: true
      }

    }

    case constants.PAGE_CONFIRM_MODAL_CLOSE: {
      return {
        ...state,
        confirmModalOpen: false
      }
    }

    case constants.PAGE_FORM_FIELDS_SET: {
      return {
        ...state,
        pageForm: action.payload,
      }
    }

    case constants.PAGE_NAME_EDITED: {
      return {
        ...state,
        pageForm: {
          ...state.pageForm,
          name: action.payload
        }

      }
    }

    case constants.PAGE_CONTROLS_IS_FETCHING: {
      return {
        ...state,
        isFetchingPageControls: true
      }
    }

    case constants.PAGE_CONTROLS_RECEIVED: {
      return {
        ...state,
        isFetchingPageControls: false,
        pageControls: action.payload
      }
    }


    case constants.PAGE_ICON_EDITED: {
      return {
        ...state,
        pageForm: {
          ...state.pageForm,
          iconID: action.payload
        }
      }
    }

    case constants.PAGE_X_POSITION_EDITED: {
      return {
        ...state,
        pageForm: {
          ...state.pageForm,
          position_x: action.payload
        }
      }
    }
    case constants.PAGE_Y_POSITION_EDITED: {
      return {
        ...state,
        pageForm: {
          ...state.pageForm,
          position_y: action.payload
        }
      }
    }

    case constants.PAGE_WIDTH_EDITED: {
      return {
        ...state,
        pageForm : {
          ...state.pageForm,
          width: action.payload
        }

      }
    }

    case constants.PAGE_CAPTION_EDITED: {
      return {
        ...state,
        pageForm : {
          ...state.pageForm,
          caption: action.payload
        }

      }
    }

    case constants.PAGE_HEIGHT_EDITED: {
      return {
        ...state,
        pageForm : {
          ...state.pageForm,
          height: action.payload
        }

      }
    }

    case constants.CURRENT_PAGE_ERROR: {
      return {
        ...state,
        errorMessage: action.payload,
        fail: true
      }
    }

    case constants.RESET_PAGE_FAIL: {
      return {
        ...state,
        errorMessage: '',
        fail: false
      }
    }
    case constants.PAGE_DELETED: {
      return {
        ...state,
        errorMessage: '',
        fail: false
      }
    }

    default: return state;
  }

}