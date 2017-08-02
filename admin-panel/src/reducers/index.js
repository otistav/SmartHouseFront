import { combineReducers } from 'redux';
import loginForm from './loginForm'
import authorizedUser from './authorizedUser'


export default combineReducers({
  loginForm,
  authorizedUser

})