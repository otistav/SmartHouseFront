import { combineReducers } from 'redux';
import loginForm from './loginForm'
import authorizedUser from './authorizedUser'
import devices from './devices'
import users from './users'
import controls from './controls'
import pages from './pages'
import modalCreateUser from './modalCreateUser'


export default combineReducers({
  loginForm,
  authorizedUser,
  devices,
  users,
  controls,
  pages,
  modalCreateUser

})