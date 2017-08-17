import { combineReducers } from 'redux';
import loginForm from './loginForm'
import authorizedUser from './authorizedUser'
import devices from './devices'
import users from './users'
import controls from './controls'
import pages from './pages'
import modalCreateUser from './modalCreateUser'
import currentUser from './currentUser'
import modalCreateDevice from './modalCreateDevice'
import currentDevice from './currentDevice'
import modalCreateControl from './modalCreateControl'
import currentControl from './currentControl'
import modalCreatePage from './modalCreatePage'
import currentPage from './currentPage'
import currentPageControl from './currentPageControl'

export default combineReducers({
  loginForm,
  authorizedUser,
  devices,
  users,
  controls,
  pages,
  modalCreateUser,
  currentUser,
  modalCreateDevice,
  currentDevice,
  modalCreateControl,
  currentControl,
  modalCreatePage,
  currentPage,
  currentPageControl

})