import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as constants from '../constants/actions'
import {logOut} from "../actions/authorizedUser"
import {defineUser} from "../actions/authorizedUser"
import {withRouter} from 'react-router-dom'
import {UserHomePage} from "../components/UserHomePage"
import {getDevices} from "../actions/devices"
import Paper from 'material-ui/Paper';

import {DictionaryHeader} from "../components/DictionaryHeader"
import Checkbox from 'material-ui/Checkbox';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Dictionary} from "../components/Dictionary"
import Dialog from 'material-ui/Dialog'
import {createUser} from "../actions/modalCreate"
import FlatButton from 'material-ui/FlatButton'
import {closeModal} from "../actions/modalCreate"
import {openModal} from "../actions/modalCreate"
import {getCurrentUser} from "../actions/currentUser"
import {deleteUser} from "../actions/currentUser"
import '../styles/loginBar.css'
import {openConfirmModal} from "../actions/currentUser"
import {closeConfirmModal} from "../actions/currentUser"
import {changeLogin} from "../actions/currentUser"
import {changeFirstName} from "../actions/currentUser"
import {changeLastName} from "../actions/currentUser"
import {changeAdminStatus} from "../actions/currentUser"
import {editUser} from "../actions/currentUser"


class CurrentUser extends Component {
  componentWillUpdate(nextProps) {
    if ((nextProps.match.params.id !== this.props.match.params.id)) {
      console.log("I AM UPDATING AT COMPONENTWILLUPDATE");
      this.props.getCurrentUser(nextProps.match.params.id)
    }
  }

  componentDidMount() {
    console.log("I AM UPDATING AT COMPONENTDIDMOUNT");
    this.props.getCurrentUser(this.props.match.params.id)
  }
  render() {
    console.log("this is confirm modal flag",this.props.confirmModalFlag);
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.closeConfirmModal}/>,
      <FlatButton
        label="DELETE USER"
        primary={true}

        onTouchTap={
          () => {
            this.props.deleteUser(this.props.currentUser.id);
            this.props.closeConfirmModal()
          }
        }
      />
    ];
    return (
      <div>
        {(this.props.currentUser === undefined || this.props.userForm === undefined) ? null :
          <MuiThemeProvider>
            <Paper>
              <FlatButton onTouchTap={this.props.openConfirmModal}
                          label="DELETE USER" style={{border: '2px red solid', color: 'red'}}
              /><br/><br/>
              Login:
              <input type="text"
                     value={this.props.userForm.login}
                     onChange={(e) => {this.props.changeLogin(e.target.value)}}/>
              First Name:
              <input type="text"
                     value={this.props.userForm.firstName}
                     onChange={(e) => {this.props.changeFirstName(e.target.value)}}/>
              Last Name:
              <input type="text"
                     value={this.props.userForm.lastName}
                     onChange={(e) => {this.props.changeLastName(e.target.value)}}/>
              Admin Status:
              <input type="checkbox"
                     checked={this.props.userForm.isAdmin}
                     onChange={(e) => {this.props.changeAdminStatus(e.target.checked)}}/>
              <FlatButton
                label="EDIT"
                onTouchTap={
                  () => {
                    console.log("this is isadmin",this.props.userForm.isAdmin);
                    this.props.editUser(
                      this.props.currentUser.id,
                      this.props.userForm.login,
                      this.props.userForm.firstName,
                      this.props.userForm.lastName,
                      this.props.userForm.isAdmin)
                  }
                }
              />




              <Dialog
                title="Are you sure you want to delete this user?"
                actions={actions}
                modal={true}
                open={this.props.confirmModalFlag}
              >
              </Dialog>
            </Paper>
          </MuiThemeProvider>}
      </div>
    )
  }


}

export default connect(
  state => ({
    currentUser: state.currentUser.user,
    userForm: state.currentUser.userForm,
    confirmModalFlag: state.currentUser.confirmModalOpen
  }),
  dispatch => ({
    openConfirmModal: () => {
      dispatch(openConfirmModal())
    },
    closeConfirmModal: () => {
      dispatch(closeConfirmModal())
    },

    changeLogin: (login) => {
      dispatch(changeLogin(login))
    },

    changeFirstName: (firstName) => {
      dispatch(changeFirstName(firstName))
    },

    changeLastName: (lastName) => {
      dispatch(changeLastName(lastName))
    },
    changeAdminStatus: (adminStatus) => {
      dispatch(changeAdminStatus(adminStatus))
    },

    editUser: (id, login, firstName, lastName, adminStatus) => {
      return dispatch(editUser(id, login, firstName, lastName, adminStatus))
    },

    deleteUser: (id) => {
      return dispatch(deleteUser(id))
    },
    getCurrentUser : (id) => {
      return dispatch(getCurrentUser(id))
    }
  })
)(CurrentUser)