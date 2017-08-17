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
import Divider from 'material-ui/Divider'
import '../styles/currentUser.css'
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import {ErrorMessage} from "../components/errorMessage"

import {DictionaryHeader} from "../components/DictionaryHeader"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Dictionary} from "../components/Dictionary"
import Dialog from 'material-ui/Dialog'
import {createUser} from "../actions/modalCreateUser"
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import {closeModal} from "../actions/modalCreateUser"
import {openModal} from "../actions/modalCreateUser"
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
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.closeConfirmModal}/>,
      <FlatButton
        label="DELETE"
        primary={true}

        onTouchTap={
          () => {
            this.props.deleteUser(this.props.currentUser.id).then(() => {
              this.props.closeConfirmModal();
              setTimeout(() => {this.props.resetFail()}, 6000)


            });

          }
        }
      />
    ];
    const styles = {
      block: {
        maxWidth: 250,
      },
      checkbox: {
        marginBottom: 16,
      },
    };
    return (
      <div>
        {(this.props.currentUser === undefined || this.props.userForm === undefined) ? null :
          <MuiThemeProvider>
            <div className="current-user-content">
              <Paper>
                <div style={styles.block} className="current-user-input">

                  <TextField floatingLabelText="Login"
                             floatingLabelFixed={true}
                             errorText={this.props.userForm.login === "" ? 'login is required' : null}
                             value={this.props.userForm.login}
                             onChange={(e) => {this.props.changeLogin(e.target.value)}}/><br/>

                  <TextField value={this.props.userForm.firstName}
                             floatingLabelText="First Name"
                             floatingLabelFixed={true}
                             errorText={this.props.userForm.firstName === "" ? 'first Name is required' : null}
                             onChange=
                           {
                             (e) => {
                               this.props.changeFirstName(e.target.value)
                             }
                           }
                  /><br/>
                  <TextField value={this.props.userForm.lastName}
                             floatingLabelText="Last Name"
                             floatingLabelFixed={true}
                             onChange=
                               {
                                 (e) => {
                                   this.props.changeLastName(e.target.value)
                                 }
                               }
                  /><br/>
                  <Checkbox checked={this.props.userForm.isAdmin}
                            onCheck=
                              {
                                (e) => {
                                  this.props.changeAdminStatus(e.target.checked)
                                }
                              }
                            label="Is Admin"
                            labelPosition="left"
                  />


                </div>
                <Divider/>
                <div style={{margin: '10px', paddingBottom: '10px'}}>
                  <RaisedButton
                    label="SAVE"
                    backgroundColor="#3F9298"
                    style={{marginRight: '10px'}}
                    primary={true}
                    onTouchTap={
                      () => {
                        this.props.editUser(
                          this.props.currentUser.id,
                          this.props.userForm.login,
                          this.props.userForm.firstName,
                          this.props.userForm.lastName,
                          this.props.userForm.isAdmin
                        ).then(() => {
                          setTimeout(() => {
                            this.props.resetFail()
                          }, 6000)
                        })
                      }
                    }
                  />
                  <FlatButton onTouchTap={this.props.openConfirmModal}

                              label="DELETE USER" style={{border: '2px red solid', color: 'red',marginLeft: '10px'}}
                  />
                </div>





                <Dialog
                  title="Are you sure you want to delete this user?"
                  actions={actions}
                  modal={true}
                  open={this.props.confirmModalFlag}
                >
                </Dialog>

              </Paper>
            </div>
          </MuiThemeProvider>}
        <ErrorMessage fail={this.props.fail} errorMessage={this.props.errorMessage}/>
      </div>
    )
  }


}

export default connect(
  state => ({
    fail: state.currentUser.fail,
    errorMessage: state.currentUser.errorMessage,
    users: state.users.users,
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
    resetFail: () => {
      dispatch({type: constants.RESET_FAIL})
    },


    deleteUser: (id) => {
      return dispatch(deleteUser(id))
    },
    getCurrentUser : (id) => {
      return dispatch(getCurrentUser(id))
    }
  })
)(CurrentUser)