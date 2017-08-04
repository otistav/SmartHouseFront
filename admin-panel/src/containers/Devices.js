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
import {Dictionary} from "../components/Dictionary"

import {DictionaryHeader} from "../components/DictionaryHeader"
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

  getDeviceByName = (name,devices) => {
    for (let i=0;i<devices.length;i++){
      if (devices[i].name === name)
        console.log("this is selected page",devices[i])
    }
  };

  getDevicesNames = () => {
    if (this.props.devices !== undefined)
      return this.props.devices.map(device => device.name)

  };

  render(){
    const itemNames = this.getDevicesNames();

    return(
      <MuiThemeProvider>
        <Dictionary
          title="Devices"
          items={this.props.devices}
          itemNames={itemNames}
          getSelectedItem={this.getDeviceByName}
        >
        </Dictionary>
      </MuiThemeProvider>
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