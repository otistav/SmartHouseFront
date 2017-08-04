import React from 'react';
import {
  Link,
} from 'react-router-dom'
import '../styles/loginBar.css'

export
const LoginBar = (props) => {
  return(
    <div className="container ">
      <div className="row">
        <div className=" col-xs-2 col-xs-offset-4">
          <div className="text">
            Welcome to<br/>
            Smart House
          </div>
          <div className=" login-bar">

            <form onSubmit={(e) => {e.preventDefault();
            props.signin(props.loginForm.login, props.loginForm.password).then(() => {
              props.history.replace('/home')
            }).catch((err) => {
                console.log(err);
              }
            )}}>
          <input type="text"
                 className="username-input"
                 placeholder="username"
                 onChange={e => {props.changeLogin(e.target.value)}}
          /><br/>

          <input name="password"
                 placeholder="password"
                 type="password"
                 className="password-input"
                 onChange={e => {props.changePassword(e.target.value)}}
          /><br/>
              <input type="text"
                     />
            {props.renderLoginFieldsError(props.loginForm.fail)}
              {props.loginForm.fail ?
                <div className="spinner">
                  <div className="double-bounce1"/>
                  <div className="double-bounce2"/>
                </div> :
                <input type="submit" className="login-button" value="LOG IN"/>
              }

            </form>


          </div>
        </div>
      </div>
    </div>
  )
};