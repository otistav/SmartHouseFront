import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as constants from '../constants/actions'
import {logOut} from "../actions/authorizedUser"
import {defineUser} from "../actions/authorizedUser"
import {withRouter} from 'react-router-dom'
import {UserHomePage} from "../components/UserHomePage"
import {getDevices} from "../actions/devices"
import {DictionaryHeader} from "../components/DictionaryHeader"
import {changeFirstName} from "../actions/modalCreate"
import Checkbox from 'material-ui/Checkbox';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Dictionary} from "../components/Dictionary"
import Dialog from 'material-ui/Dialog'
import {changeLogin} from "../actions/modalCreate"
import {changePassword} from "../actions/modalCreate"
import {createUser} from "../actions/modalCreate"
import {changeAdminStatus} from "../actions/modalCreate"
import {changeLastName} from "../actions/modalCreate"
import FlatButton from 'material-ui/FlatButton'
import {closeModal} from "../actions/modalCreate"
import {openModal} from "../actions/modalCreate"
import '../styles/loginBar.css'
import CurrentUser from "../containers/CurrentUser"

import '../styles/pages.css'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
import {dispatchUsers} from "../actions/users"
import {SideBar} from "../components/SideBar"


class UsersPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: ''
    };
    this.changeUsername = this.changeUsername.bind(this)
  }

  componentDidMount(){
    this.props.getUsers();
  }

  renderCreateUserFieldsError = () => {
    console.log("ERROR RENDER", this.props.errorMessage);
      return(
        <div className="login-page-error">
          {this.props.errorMessage}
        </div>
      )


  };

  getUserByLogin = (login,users) => {
    for (let i=0;i<users.length;i++){
      if (users[i].login === login)
        console.log("this is selected user",users[i])
    }
  };

  changeUsername(e){
    this.setState({
      username: e.target.value
    })
  };


  getItemNames = () => {
    if (this.props.users !== undefined)
      return this.props.users.map(user => user.login)
  };

  render(){
    const {match, location, history} = this.props;
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.closeModal}/>,
      <FlatButton
        label="Create user"
        disabled={this.props.isFetching}
        primary={true}

        onTouchTap={() => {this.props.createUser(this.props.login, this.props.password,
          this.props.firstName,this.props.lastName,
          this.props.isAdmin)}}
        />
    ];

    const itemNames = this.getItemNames();

    return(
      <MuiThemeProvider>
        <div>
          <Dictionary
            pathh="users"
            openModal={this.props.openModal}
            title="Users"
            items={this.props.users}
            itemNames={itemNames}
            getSelectedItem={this.getUserByLogin}
          >
            <Route path="/home/users/:id" component={CurrentUser}/>
          </Dictionary>

          <Dialog
            title="New User"
            actions={actions}
            modal={true}
            open={this.props.flag}
          >
              <form onSubmit={e => {e.preventDefault();
              }}
              >
                <label>
                  Login:
                  <input type="text" value={this.props.login}
                         onChange={(e) => {this.props.changeLogin(e.target.value)}}
                  /><br/><br/>
                  Password:
                  <input type="text" value={this.props.password}
                         onChange={(e) => {this.props.changePassword(e.target.value)}}
                  /><br/>
                  first name:
                  <input type="text"
                         value={this.props.firstName}
                         onChange={(e) => this.props.changeFirstName(e.target.value)}
                  /><br/>
                  last name:
                  <input type="text" value={this.props.lastName}
                         onChange={(e) => {this.props.changeLastName(e.target.value)}}
                  /><br/>
                  isAdmin:
                  <input type="checkbox"
                         checked={this.props.isAdmin}
                         onChange={(e) => {this.props.changeAdminStatus(e.target.checked)}}/><br/>
                  {this.props.fail ? this.renderCreateUserFieldsError() : null}


                </label>
              </form>

          </Dialog>


        </div>
      </MuiThemeProvider>
    )
  }
}

export default connect(
  state => ({
    users: state.users.users,
    flag: state.modalCreateUser.openModalFlag,
    login: state.modalCreateUser.login,
    password: state.modalCreateUser.password,
    isAdmin: state.modalCreateUser.isAdmin,
    firstName: state.modalCreateUser.firstName,
    lastName: state.modalCreateUser.lastName,
    errorMessage: state.modalCreateUser.errorMessage,
    fail: state.modalCreateUser.fail,
    isFetching: state.modalCreateUser.isFetching
  }),
  dispatch => ({
    getUsers: () => {

      return dispatch(dispatchUsers());
    },
    openModal: () => {
      dispatch(openModal())
    },
    closeModal: () => {
      dispatch(closeModal())
    },
    changePassword: (password) => {
      dispatch(changePassword(password))
    },
    changeLogin: (login) => {
      dispatch(changeLogin(login))
    },
    changeLastName: (lastName) => {
      dispatch(changeLastName(lastName))
    },
    changeFirstName: (firstName) => {
      dispatch(changeFirstName(firstName))
    },
    changeAdminStatus: isAdmin => {
      dispatch(changeAdminStatus(isAdmin))
    },
    createUser: (login, password, firstName, lastName, isAdmin) => {
      return dispatch(createUser(login, password, firstName, lastName, isAdmin))
    }
  })

)(UsersPage)