import * as constants from '../constants/actions'

export default function users(state = {}, action) {
  switch(action.type){
    case constants.USERS_RECEIVED: {
      return {
        users: action.payload
      }
    }
    default: return state;
  }

}