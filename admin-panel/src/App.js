import React, { Component } from 'react';

import {connect} from 'react-redux'
import * as constants from './constants/actions'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min';
import './App.css';
import LoginPage from './containers/LoginPage'
import HomePage from './containers/HomePage'
import {saveUser} from "./actions/authorizedUser"
import {defineUser} from "./actions/authorizedUser"
import {withRouter} from 'react-router-dom'

import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'

class App extends Component {


  componentWillMount(){
    axios.get("http://localhost:3001/findMe").then((res) => {
      this.props.saveUser(res.data)
    }).then(() => {
      this.props.defineUser(true)
    }).catch(() => {
      this.props.defineUser(false)

    })
  }

  getRedirect = () => {
    if (this.props.isAuth === false) {
      return(
        <Redirect to="/login"/>
      )
    }
    if (this.props.location.pathname === '/login' && this.props.isAuth === true){
      return(
        <Redirect to="/home"/>
      )
    }
    return null

  };
  waitingRender = () => {
    if (this.props.isAuth === undefined || this.props.user === undefined) {
      return(
        <div>
          wait
        </div>
      )
    }
  };

  render() {
    console.log(this.props.isAuth);
    const {match, location, history} = this.props;

    this.waitingRender();

    return (
        <div>
        <Router>
          <div>
            {this.getRedirect()}
            <Route path="/home" component={HomePage}/>
            <Route path="/login" component={LoginPage}/>
          </div>
        </Router>
        </div>
    );
  }
}

export default withRouter(connect(
  state => ({
    user: state.authorizedUser.user,
    isAuth: state.authorizedUser.authorized
  })
  ,
  dispatch => ({
    saveUser: (user) => {
      dispatch(saveUser({firstName: user.firstName, lastName: user.lastName, isAdmin: user.isAdmin}))
    },
    defineUser: (state)=> {
      dispatch(defineUser(state))
    }


  })



)(App));
