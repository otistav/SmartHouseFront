import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as constants from '../constants/actions'
import {logOut} from "../actions/authorizedUser"
import {defineUser} from "../actions/authorizedUser"
import {withRouter} from 'react-router-dom'
import {UserHomePage} from "../components/UserHomePage"
import {getDevices} from "../actions/devices"
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import CurrentDevice from './CurrentDevice'

import {ErrorMessage} from "../components/errorMessage"

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Dictionary} from "../components/Dictionary"
import {openModal, closeModal,changeName,createDevice} from "../actions/modalCreateDevice"
import {changeDeviceType} from "../actions/modalCreateDevice"
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
import {setDeviceTypes} from "../actions/devices"

class DevicesPage extends Component {

  componentDidMount(){
    this.props.getDevices();
    this.props.getDeviceTypes();
  }

  getDeviceByName = (name,devices) => {
    for (let i=0;i<devices.length;i++){
      if (devices[i].name === name)
        console.log("this is selected page",devices[i])
    }
  };

  getDevicesNames = () => {

    if (this.props.devices !== undefined) {
      console.log("this is devices",this.props.devices);
      return this.props.devices.map(device => device.name)
    }
  };

  render(){
    console.log("THIS IS DEVTYPE", this.props.deviceType);
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.closeModal}/>,
      <FlatButton
        label="Create device"
        // disabled={this.props.isFetching}
        primary={true}

        onTouchTap={() => {this.props.createDevice(this.props.name,this.props.deviceType)}}
      />
    ];
    const itemNames = this.getDevicesNames();

    return(
      <MuiThemeProvider>
        <div>
        <Dictionary
          openModal={this.props.openModal}
          path="devices"
          title="Devices"
          items={this.props.devices}
          itemNames={itemNames}
          getSelectedItem={this.getDeviceByName}
        >
          <Route path="/home/devices/:id" component={CurrentDevice}/>
        </Dictionary>
        <Dialog
          title="New Device"
          actions={actions}
          modal={true}
          open={this.props.modalFlag}
        >
          <form onSubmit={e => {e.preventDefault();
          }}
          >
            <label>
              Name:
              <input type="text" value={this.props.name}
                     onChange={(e) => {this.props.changeName(e.target.value)}}
              /><br/><br/>
              {this.props.deviceTypes===undefined ? null :
                <DropDownMenu value={this.props.deviceType}  onChange={(event,index,value) => {this.props.changeDeviceType(value)}} >
                  {this.props.deviceTypes.map((deviceType,value) =>
                    <MenuItem value={deviceType.uuid} primaryText={
                      this.props.deviceTypes[value].name
                  }/>)}
                </DropDownMenu>}


              <ErrorMessage fail={this.props.fail} errorMessage={this.props.errorMessage}/>
            </label>
          </form>

        </Dialog>
        </div>
      </MuiThemeProvider>
    )
  }
}



export default connect(
  state => ({
    errorMessage: state.modalCreateDevice.errorMessage,
    fail: state.modalCreateDevice.fail,
    deviceType: state.modalCreateDevice.currentDeviceType,
    deviceTypes: state.devices.deviceTypes,
    modalFlag: state.modalCreateDevice.openModalFlag,
    devices: state.devices.devices,
    name: state.modalCreateDevice.name
  }),
  dispatch => ({
    getDevices: () => {

      return dispatch(dispatchDevices());
    },
    changeDeviceType: (devType) => {
      dispatch(changeDeviceType(devType))
    },

    openModal: () => {
      dispatch(openModal())
    },
    closeModal: () => {
      dispatch(closeModal())
    },
    changeName: (name) => {
      dispatch(changeName(name))
    },
    getDeviceTypes: () => {
      return dispatch(setDeviceTypes())
    },
    createDevice: (name, devType) => {
      return dispatch(createDevice(name, devType))
    }


  })

)(DevicesPage)