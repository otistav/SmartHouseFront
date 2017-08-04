import React, { Component } from 'react';

import {connect} from 'react-redux'
import * as constants from './constants/actions'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min';
import './App.css';
import LoginPage from './containers/Login'
import HomePage from './containers/Home'
import {saveUser} from "./actions/authorizedUser"
import {defineUser} from "./actions/authorizedUser"
import {withRouter} from 'react-router-dom'
import {Header} from "./components/Header"
import {logOut} from "./actions/authorizedUser"
import {SideBar} from './components/SideBar'
import DevicesPage from './containers/Devices'
import UsersPage from './containers/Users'
import ControlsPage from './containers/Controls'
import Pages from './containers/Pages'

import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

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
    if ((this.props.location.pathname === '/login' || this.props.location.pathname === '/')
        && this.props.isAuth === true) {

      return (
        <Redirect to="/home"/>
      )
    }
    return null

  };
  waitingRender = () => {
    if (this.props.isAuth === undefined || this.props.user === undefined) {
      return(
        <div className="waiting">
          <div className="sk-fading-circle">
            <div className="sk-circle1 sk-circle"/>
            <div className="sk-circle2 sk-circle"/>
            <div className="sk-circle3 sk-circle"/>
            <div className="sk-circle4 sk-circle"/>
            <div className="sk-circle5 sk-circle"/>
            <div className="sk-circle6 sk-circle"/>
            <div className="sk-circle7 sk-circle"/>
            <div className="sk-circle8 sk-circle"/>
            <div className="sk-circle9 sk-circle"/>
            <div className="sk-circle10 sk-circle"/>
            <div className="sk-circle11 sk-circle"/>
            <div className="sk-circle12 sk-circle"/>
          </div>
        </div>
      )
    }
  };

  render() {
    const {match, location, history} = this.props;

    this.waitingRender();

    return (
        <div>
        <Router>
          <div>


            {this.props.isAuth === false ? null :
              <Header logOut={this.props.logOut} history={this.props.history}/>}
            {this.getRedirect()}
            <Route path="/home/devices" component={DevicesPage}/>
            <Route path="/home/users" component={UsersPage}/>
            <Route path="/home/controls" component={ControlsPage}/>
            <Route exact path="/home" component={HomePage}/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/home/pages" component={Pages}/>

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
    },
    logOut: () => {
      const brokeSession = () => {

        return (dispatch) => {
          console.log("You are loggin out");
          return axios.post("http://localhost:3001/logoutpage").then(() => {
            dispatch(logOut());
            dispatch(defineUser(false));

            console.log("YOU ARE LOGGED OUT")
          }).catch(err => {
            dispatch({type:constants.USER_NOT_RECEIVED})
          });
        };
      };
      return dispatch(brokeSession());
    },


  })



)(App));
