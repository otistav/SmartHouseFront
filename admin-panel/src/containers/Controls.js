import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as constants from '../constants/actions'
import {logOut} from "../actions/authorizedUser"
import {defineUser} from "../actions/authorizedUser"
import {withRouter} from 'react-router-dom'
import {UserHomePage} from "../components/UserHomePage"
import {getDevices} from "../actions/devices"

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import {DictionaryHeader} from "../components/DictionaryHeader"
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
import {dispatchControls} from "../actions/controls"
import {SideBar} from "../components/SideBar"
import {Dictionary} from "../components/Dictionary"


class ControlsPage extends Component {

  componentDidMount(){
    this.props.getControls();
  }

  getControlsNames = () => {
    if (this.props.controls !== undefined)
      return this.props.controls.map(control => control.name)

  };
  getControlByName = (login,controls) => {
    for (let i=0;i<controls.length;i++){
      if (controls[i].login === login)
        console.log("this is selected control",controls[i])
    }
  };

  render(){

    const itemNames = this.getControlsNames();
    return(
      <MuiThemeProvider>
        <Dictionary
          title="Controls"
          items={this.props.controls}
          itemNames={itemNames}
          getSelectedItem={this.getControlByName}
        >

        </Dictionary>
      </MuiThemeProvider>
    )
  }
}



export default connect(
  state => ({
    controls: state.controls.controls
  }),
  dispatch => ({
    getControls: () => {

      return dispatch(dispatchControls());
    },
  })

)(ControlsPage)