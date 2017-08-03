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
import {dispatchDevices} from "../actions/devices"
import {SideBar} from "../components/SideBar"


class DevicesPage extends Component {

  componentDidMount(){
    this.props.getDevices();
  }

  getDevicesNames = () => {
    if (this.props.devices !== undefined)
      return this.props.devices.map(device => device.name)

  };

  render(){
    const itemNames = this.getDevicesNames();

    return(
      <div>
        <SideBar items={this.props.devices} itemNames={itemNames} />
      </div>
    )
  }
}



export default connect(
  state => ({
    devices: state.devices.devices
  }),
  dispatch => ({
    getDevices: () => {

      return dispatch(dispatchDevices());
    },
  })

)(DevicesPage)