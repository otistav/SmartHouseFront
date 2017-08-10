import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as constants from '../constants/actions'
import {withRouter} from 'react-router-dom'
import {getDevices} from "../actions/devices"
import Paper from 'material-ui/Paper';
import '../styles/currentUser.css'
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField'
import {ErrorMessage} from "../components/errorMessage"

import {DictionaryHeader} from "../components/DictionaryHeader"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import {Dictionary} from "../components/Dictionary"
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

import {setDeviceTypes} from "../actions/devices"

import {
  editDevice,
  deleteDevice,
  changeName,
  changeDevType,
  openConfirmModal,
  closeConfirmModal,
  getCurrentDevice
} from "../actions/currentDevice"



import '../styles/loginBar.css'



class CurrentDevice extends Component {
  componentWillUpdate(nextProps) {
    if ((nextProps.match.params.id !== this.props.match.params.id)) {
      this.props.getCurrentDevice(nextProps.match.params.id)
    }
  }



  componentDidMount() {
    this.props.getDeviceTypes().then(() => {
      this.props.getCurrentDevice(this.props.match.params.id)
    })



  }
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.closeConfirmModal}/>,
      <FlatButton
        label="DELETE device"
        primary={true}

        onTouchTap={
          () => {
            this.props.deleteDevice(this.props.currentDevice.id).then(() => {
              this.props.closeConfirmModal();
              setTimeout(() => {this.props.resetFail()}, 6000)


            });

          }
        }
      />
    ];
    const styles = {
      block: {
        maxWidth: 250,
      },
      checkbox: {
        marginBottom: 16,
      },
    };
    return (
      <div>
        {(this.props.currentDevice === undefined || this.props.deviceForm === undefined ) ? <div>НЕТ ДЕВАЙСОВ</div>:
          <MuiThemeProvider>
            <div className="current-user-content">
              <Paper>
                <br/><br/>
                <div style={styles.block} className="current-user-input">

                  <TextField floatingLabelText="Device"
                             floatingLabelFixed={true}
                             errorText={this.props.deviceForm.name === "" ? 'device is required' : null}
                             value={this.props.deviceForm.name}
                             onChange={(e) => {this.props.changeName(e.target.value)}}/><br/>
                  <SelectField floatingLabelText="device type" value={this.props.deviceForm.typeUUID}  onChange=
                    {
                      (event,index,value) =>
                      {
                        console.log(value);
                        this.props.changeDeviceType(value)
                      }
                    }
                  >
                    {this.props.deviceTypes.map((deviceType,value) =>
                      <MenuItem value={deviceType.uuid} primaryText={
                        this.props.deviceTypes[value].name
                      }/>)}
                  </SelectField>


                  <RaisedButton
                    label="EDIT"
                    backgroundColor="#3F9298"
                    style={{float: 'right'}}
                    primary={true}
                    onTouchTap={
                      () => {
                        this.props.editDevice(
                          this.props.currentDevice.id,
                          this.props.deviceForm.name,
                          this.props.deviceForm.typeUUID,
                        )
                      }
                    }
                  />
                  <FlatButton onTouchTap={this.props.openConfirmModal}
                              label="DELETE device" style={{border: '2px red solid', color: 'red'}}
                  />

                </div>




                <Dialog
                  title="Are you sure you want to delete this device?"
                  actions={actions}
                  modal={true}
                  open={this.props.confirmModalFlag}
                >
                </Dialog>

              </Paper>
            </div>
          </MuiThemeProvider>}
        <ErrorMessage fail={this.props.fail} errorMessage={this.props.errorMessage}/>
      </div>
    )
  }


}

export default connect(
  state => ({
    deviceTypes: state.devices.deviceTypes,
    fail: state.currentDevice.fail,
    errorMessage: state.currentDevice.errorMessage,
    devices: state.devices.devices,
    currentDevice: state.currentDevice.device,
    deviceForm: state.currentDevice.deviceForm,
    confirmModalFlag: state.currentDevice.confirmModalOpen
  }),
  dispatch => ({
    openConfirmModal: () => {
      dispatch(openConfirmModal())
    },
    closeConfirmModal: () => {
      dispatch(closeConfirmModal())
    },

    changeName: (name) => {
      dispatch(changeName(name))
    },


    editDevice: (id, name, uuid) => {
      return dispatch(editDevice(id, name, uuid))
    },

    changeDeviceType: (devType) => {
      dispatch(changeDevType(devType))
    },



    deleteDevice: (id) => {
      return dispatch(deleteDevice(id))
    },
    getDeviceTypes: () => {
      return dispatch(setDeviceTypes())
    },
    resetFail: () => {
      dispatch({type: constants.RESET_DEVICE_FAIL})
    },

    getCurrentDevice : (id) => {
      return dispatch(getCurrentDevice(id))
    }
  })
)(CurrentDevice)