import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as constants from '../constants/actions'
import {logOut} from "../actions/authorizedUser"
import {AdminHomePage} from "../components/AdminHomePage"
import {defineUser} from "../actions/authorizedUser"
import {withRouter} from 'react-router-dom'
import {UserHomePage} from "../components/UserHomePage"
import {getDevices} from "../actions/devices"
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

  componentDidMount(){
    this.props.getUsers();
  }

  getItemNames = () => {
    if (this.props.users !== undefined)
      return this.props.users.map(user => user.login)
  };

  render(){
    const itemNames = this.getItemNames();
    return(
      <div>
        <SideBar items={this.props.users} itemNames={itemNames}/>
      </div>
    )
  }
}

export default connect(
  state => ({
    users: state.users.users
  }),
  dispatch => ({
    getUsers: () => {

      return dispatch(dispatchUsers());
    },
  })

)(UsersPage)