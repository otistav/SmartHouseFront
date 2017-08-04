import React, { Component } from 'react';
import { connect } from 'react-redux';
import {LoginBar} from "../components/LoginBar"
import {changeLogin} from "../actions/login"
import {changePassword} from "../actions/login"
import {saveUser} from "../actions/authorizedUser"
import {defineUser} from "../actions/authorizedUser"
import axios from 'axios';
import * as constants from '../constants/actions'
import {withRouter} from 'react-router-dom'
import {handleError} from "../actions/login"
import {getUser} from "../actions/login"


class LoginPage extends Component{

  renderLoginFieldsError = (isFail) => {
    if (isFail === true) {
      return(
        <div className="login-page-error">
          {this.props.loginForm.message}
        </div>
      )
    }
    return null


  };

  render(){
    const {match, location, history} = this.props;
    return(
      <div style={{fontSize: "20px"}}>
        <LoginBar loginForm={this.props.loginForm}
                  renderLoginFieldsError={this.renderLoginFieldsError}
                  changePassword={this.props.changePassword} changeLogin={this.props.changeLogin}
                  signin={this.props.signin}
                  history={this.props.history}
                  user={this.props.user}
        />
      </div>
    )
  }
}


export default withRouter(connect(
  state => ({
    loginForm: state.loginForm,
    user: state.authorizedUser
  }),
  dispatch => ({
    changePassword: (password) => {
      dispatch(changePassword(password))
    },
    changeLogin: (login) => {
      dispatch(changeLogin(login))
    },
    signin: (login, password) => {

      return dispatch(getUser(login,password));

    },
  })
)(LoginPage))