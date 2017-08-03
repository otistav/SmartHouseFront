import * as constants from '../constants/actions'

export default function pages(state = {}, action) {
  switch(action.type){
    case constants.PAGES_RECEIVED: {
      return {
        pages: action.payload
      }
    }
    default: return state;
  }

}