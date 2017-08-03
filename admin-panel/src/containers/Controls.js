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
import {dispatchControls} from "../actions/controls"
import {SideBar} from "../components/SideBar"


class ControlsPage extends Component {

  componentDidMount(){
    this.props.getControls();
  }

  getControlsNames = () => {
    if (this.props.controls !== undefined)
      return this.props.controls.map(control => control.name)

  };

  render(){

    const itemNames = this.getControlsNames();
    return(
      <div>
        <SideBar items={this.props.controls} itemNames={itemNames}/>
      </div>
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