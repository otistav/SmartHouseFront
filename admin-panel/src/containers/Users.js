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
import FlatButton from 'material-ui/FlatButton'
import {closeModal} from "../actions/modalCreate"
import {openModal} from "../actions/modalCreate"

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
    console.log('this is state', this.state.username);
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.closeModal}/>,
      <FlatButton
        label="Create user"
        primary={true}
        onTouchTap={this.props.closeModal}
        />
    ];

    const itemNames = this.getItemNames();

    return(
      <MuiThemeProvider>
        <div>
          <Dictionary
            openModal={this.props.openModal}
            title="Users"
            items={this.props.users}
            itemNames={itemNames}
            getSelectedItem={this.getUserByLogin}
          >
          </Dictionary>

          <Dialog
            title="New User"
            actions={actions}
            modal={true}
            open={this.props.flag}
          >
              <form onSubmit={e => {e.preventDefault()}}>
                <label>
                  <input name="hello" type="text" value={this.state.username} onChange={this.changeUsername}/>
                  <input type="text" onChange={(e) => {this.props.changePassword(e.target.value)}}/>
                  <input type="text" onChange={(e) => {this.props.changeLogin(e.target.value)}}/>
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
    flag: state.modalCreateUser.flag,
    login: state.modalCreateUser.login
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
    changeFirstName: (firstName) => {
      dispatch(changeFirstName(firstName))
    }
  })

)(UsersPage)