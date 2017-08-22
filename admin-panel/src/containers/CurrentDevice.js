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
import {getRules} from "../actions/currentDevice"
import '../styles/rightPageTab.css'
import {DictionaryHeader} from "../components/DictionaryHeader"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import {Dictionary} from "../components/Dictionary"
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {Tabs, Tab} from 'material-ui/Tabs';
import Menu from 'material-ui/Menu'
import RaisedButton from 'material-ui/RaisedButton'
import {editRuleEvent, editRule,
  selectCurrentRule,
  editRuleFunc, createRule, createNewRule,
  onEditDeviceFunction,
  editDeviceFunc
} from "../actions/currentDevice"
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
      this.props.getCurrentDevice(this.props.match.params.id).then(() => {
        this.props.getRules(this.props.currentDevice.id);
      })
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
                <Tabs>
                  <Tab label="Device">
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
                  </Tab>
                  <Tab label="Rules">
                    <div className="content">
                      <div className="left-side">
                        <FlatButton label="CREATE RULE"
                                    primary={true}
                                    onTouchTap={() =>
                                    {
                                      let item =
                                        {
                                          id: null,
                                          sourceID: null,
                                          sourceType: null,
                                          event: "new Rule",
                                          func: "this is func"
                                        };
                                      this.props.createNewRule(item)

                                    }}
                        />
                        <Menu disableAutoFocus={true}
                              value={this.props.rules === undefined ? null : this.props.rules.currentRule}
                              onChange={(event, value) => {
                                console.log("this is current rule", this.props.currentControl);
                                this.props.selectCurrentRule(value);
                              }}


                        >
                          {this.props.rules === undefined ? null :
                            this.props.rules.map((item) => {
                              console.log(item);
                              return <MenuItem value={item} primaryText={item.event} />
                            })
                          }
                        </Menu>

                      </div>

                      <div className="right-side">
                        {this.props.deviceInfo.currentRule === undefined ? <div>неа</div> :
                          <div>
                            <TextField value={this.props.deviceInfo.currentRuleForm.event}
                                       onChange={(e) => {this.props.editRuleEvent(e.target.value)}}
                            />
                            <textarea value={this.props.deviceInfo.currentRuleForm.func}
                                      onChange={(e) => {this.props.editRuleFunc(e.target.value)}}
                                      style={{height: '300px', width: '100%'}}
                            />
                            {this.props.deviceInfo.currentRuleForm.id === null ?
                              <FlatButton label="CREATE" onClick={() => {this.props.createRule(
                                this.props.currentDevice.id, 'device',
                                this.props.deviceInfo.currentRuleForm.event,
                                this.props.deviceInfo.currentRuleForm.func
                              ).then(() => {this.props.getRules(this.props.match.params.id)})}}/> :
                              <FlatButton label="SAVE"
                                          onClick={() => {
                                            this.props.editRule(this.props.deviceInfo.currentRuleForm.id,
                                              this.props.deviceInfo.currentRuleForm.event,
                                              this.props.deviceInfo.currentRuleForm.func
                                            )}}
                              />
                            }
                          </div>

                        }

                      </div>
                    </div>
                  </Tab>
                  <Tab label="Property Function">
                    <textarea value={this.props.deviceForm.propFunction}
                              onChange={(e) => {
                                this.props.onEditDeviceFunc(e.target.value)
                              }}
                              style={{height: '300px', width: '100%'}}

                    />
                    <FlatButton label="SAVE"
                                onClick={() => {
                                  this.props.editDeviceFunction(
                                    this.props.currentDevice.id,
                                    this.props.deviceForm.propFunction
                                  )
                                }}
                    />
                  </Tab>

                </Tabs>
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
    deviceInfo: state.currentDevice,
    deviceForm: state.currentDevice.deviceForm,
    rules: state.currentDevice.rules,
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
    onEditDeviceFunc: (func) => {
      dispatch(onEditDeviceFunction(func))
    },


    editDevice: (id, name, uuid) => {
      return dispatch(editDevice(id, name, uuid))
    },

    editDeviceFunction: (id, func) => {
      return dispatch(editDeviceFunc(id, func))
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

    editRule: (id, event, func) => {
      return dispatch(editRule(id, event, func))
    },

    createRule: (id, type, event, func) => dispatch(createRule(id, type, event, func)),

    editRuleFunc: (func) => {
      dispatch(editRuleFunc(func))
    },

    getRules: (id) => dispatch(getRules(id)),

    createNewRule: (rule) => {
      dispatch(createNewRule(rule))
    },
    editRuleEvent: (event) => {
      dispatch(editRuleEvent(event))
    },

    selectCurrentRule: (rule) => {
      dispatch(selectCurrentRule(rule))
    },

    getCurrentDevice : (id) => {
      return dispatch(getCurrentDevice(id))
    }
  })
)(CurrentDevice)