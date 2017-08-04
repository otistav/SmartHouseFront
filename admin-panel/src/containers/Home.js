import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as constants from '../constants/actions'
import {logOut} from "../actions/authorizedUser"
import {defineUser} from "../actions/authorizedUser"
import {withRouter} from 'react-router-dom'
import {UserHomePage} from "../components/UserHomePage"
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'



// <button onClick={() => {this.props.logOut()}>LOGOUT</button>
class HomePage extends Component{

  render(){
    //
    // if (this.props.user.user === undefined){
    //   return(
    //     <div>
    //       wait
    //     </div>
    //   )
    // }
    const {match, location, history} = this.props;
    return(
      <div>
        WELCOME
      </div>
    )
  }
}

export default withRouter(connect(
  state => ({
    user: state.authorizedUser
  }),
  dispatch => ({
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

)(HomePage));