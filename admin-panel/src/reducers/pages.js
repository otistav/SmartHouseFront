import * as constants from '../constants/actions'

export default function pages(state = {isFetchingIcons: false, icons: []}, action) {
  switch(action.type){
    case constants.PAGES_RECEIVED: {
      return {
        ...state,
        pages: action.payload
      }
    }
    case constants.ICONS_RECEIVED: {
      return {
        ...state,
        icons: action.payload,
        isFetchingIcons: false
      }
    }

    case constants.ICONS_IS_FETCHING: {
      return {
        ...state,
        isFetchingIcons: true
      }
    }
    default: return state;
  }


}