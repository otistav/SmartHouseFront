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
      const getUser = () => {

        return (dispatch) => {
          dispatch({type: constants.IS_FETCHING});

          return axios.post("http://localhost:3001/signin", {
            username: login,
            password: password
          }).then((res) => {
            dispatch(saveUser({firstName: res.data.firstName, lastName: res.data.lastName, isAdmin: res.data.isAdmin}));
            dispatch(defineUser(true));


          }).catch(err => {
            console.log(err.response.data.message);
            dispatch(handleError(err.response.data.message));
            setTimeout(() => {dispatch({type: constants.RESET_FAIL})},2000);
            return Promise.reject(err);
          });


        };
      };
      return dispatch(getUser());

    },
  })
)(LoginPage))