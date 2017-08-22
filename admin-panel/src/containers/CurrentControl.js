import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as constants from '../constants/actions'
import {withRouter} from 'react-router-dom'
import {getDevices} from "../actions/devices"
import Paper from 'material-ui/Paper';
import '../styles/currentUser.css'
import TextField from 'material-ui/TextField';
import {setRules} from "../actions/currentControl"
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField'
import {ErrorMessage} from "../components/errorMessage"
import Divider from 'material-ui/Divider'
import {createRule} from "../actions/currentControl"
import Menu from 'material-ui/Menu'
import {selectCurrentRule} from "../actions/currentControl"
import {createNewRule} from "../actions/currentControl"
import '../styles/rightPageTab.css'
import {getRules, editRuleFunc, editRuleEvent, editRule, editControlFunction, onEditControlFunction} from "../actions/currentControl"

import {DictionaryHeader} from "../components/DictionaryHeader"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import {Dictionary} from "../components/Dictionary"
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import {Tabs, Tab} from 'material-ui/Tabs';

import {setDeviceTypes} from "../actions/devices"

import {
  editControl,
  deleteControl,
  changeName,
  changeControlType,
  openConfirmModal,
  closeConfirmModal,
  getCurrentControl
} from "../actions/currentControl"

import {setControlTypes} from "../actions/controls"

import '../styles/loginBar.css'



class CurrentControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Please, enter here a rule for selected control'
    };

    this.handleChange = this.handleChange.bind(this);
  }
  componentWillUpdate(nextProps) {
    if ((nextProps.match.params.id !== this.props.match.params.id)) {
      this.props.getCurrentControl(nextProps.match.params.id)
    }
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }


  componentDidMount() {

    this.props.getControlTypes().then(() => {
      this.props.getCurrentControl(this.props.match.params.id).then(() => {
        this.props.getRules(this.props.currentControl.id);
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
        label="DELETE control"
        primary={true}

        onTouchTap={
          () => {
            this.props.deleteControl(this.props.currentControl.id).then(() => {
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
        {(this.props.currentControl === undefined || this.props.controlForm === undefined || this.props.rules === undefined ) ? <div>НЕТ ДЕВАЙСОВ</div>:
          <MuiThemeProvider>
            <div className="current-user-content">
              <Paper>
                <Tabs>
                  <Tab label="Control">

                    <div style={styles.block} className="current-user-input">

                      <TextField floatingLabelText="Control"
                                 floatingLabelFixed={true}
                                 errorText={this.props.controlForm.name === "" ? 'control is required' : null}
                                 value={this.props.controlForm.name}
                                 onChange={(e) => {this.props.changeName(e.target.value)}}/><br/>
                      <SelectField
                        floatingLabelText="device type"
                        value={this.props.controlForm.typeUUID}
                        onChange=
                        {
                          (event, index, value) =>
                          {
                            console.log(value);
                            this.props.changeControlType(value)
                          }
                        }
                      >
                        {this.props.controlTypes.map((controlType,value) =>
                          <MenuItem value={controlType.uuid} primaryText={
                            this.props.controlTypes[value].name
                          }/>)}
                      </SelectField>

                    </div>

                    <Divider/>
                    <div style={{display: 'inline-flex',margin: '10px', paddingBottom: '10px'}}>
                      <RaisedButton
                        label="EDIT"
                        backgroundColor="#3F9298"
                        style={{float: 'right', marginRight: '10px'}}
                        primary={true}
                        onTouchTap={
                          () => {
                            this.props.editControl(
                              this.props.currentControl.id,
                              this.props.controlForm.name,
                              this.props.controlForm.typeUUID,
                            )
                          }
                        }
                      />
                      <FlatButton  onTouchTap={this.props.openConfirmModal}
                                   label="DELETE control" style={{border: '2px red solid', color: 'red', marginLeft: '10px'}}
                      />
                    </div>



                    <Dialog
                      title="Are you sure you want to delete this control?"
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
                                        this.props.createNewRule(item);
                                        this.props.selectCurrentRule(item)

                                    }}
                        />
                        <Menu selectedMenuItemStyle={{backgroundColor: '#CCCCCC'}}
                              value={this.props.controlInfo.currentRule}
                              onChange={(event, value) => {
                                this.props.selectCurrentRule(value);
                              }}


                        >
                          {this.props.rules === undefined ? null :
                            this.props.rules.map((item, key) => {
                              if (item.id === null){
                                return <MenuItem key={key} style={{width: '90%'}} value={item} primaryText={item.event} />

                              }

                              return <MenuItem key={key} style={{width: '90%'}} value={item} primaryText={item.event} />
                            })
                          }
                        </Menu>

                      </div>

                      <div className="right-side">
                        {this.props.controlInfo.currentRule === undefined ? <div>неа</div> :
                          <div>
                            <TextField value={this.props.controlInfo.currentRuleForm.event}
                                       onChange={(e) => {this.props.editRuleEvent(e.target.value)}}
                            />
                            <textarea value={this.props.controlInfo.currentRuleForm.func}
                                      onChange={(e) => {this.props.editRuleFunc(e.target.value)}}
                                      style={{height: '300px', width: '100%'}}
                            />
                            {this.props.controlInfo.currentRuleForm.id === null ?
                              <FlatButton label="CREATE" onClick={() => {this.props.createRule(
                                this.props.currentControl.id, 'control',
                                this.props.controlInfo.currentRuleForm.event,
                                this.props.controlInfo.currentRuleForm.func
                              ).then(() => {this.props.getRules(this.props.match.params.id)})}}/> :
                              <FlatButton label="SAVE"
                                          onClick={() => {
                                            this.props.editRule(this.props.controlInfo.currentRuleForm.id,
                                              this.props.controlInfo.currentRuleForm.event,this.props.controlInfo.currentRuleForm.func
                                            )}}
                              />
                            }
                          </div>

                        }

                      </div>
                    </div>
                  </Tab>
                  <Tab label="Property Function">
                    <textarea value={this.props.controlForm.propFunction}
                              onChange={(e) => {
                                this.props.onEditControlFunc(e.target.value)
                              }}
                              style={{height: '300px', width: '100%'}}

                    />
                    <FlatButton label="SAVE"
                                onClick={() => {
                                  this.props.editControlFunction(
                                    this.props.currentControl.id,
                                    this.props.controlForm.propFunction

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
    controlTypes: state.controls.controlTypes,
    fail: state.currentControl.fail,
    errorMessage: state.currentControl.errorMessage,
    controls: state.controls.controls,
    currentControl: state.currentControl.control,
    controlInfo: state.currentControl,
    controlForm: state.currentControl.controlForm,
    confirmModalFlag: state.currentControl.confirmModalOpen,
    rules: state.currentControl.rules,
  }),
  dispatch => ({
    editRule: (id, event, func) => {
      return dispatch(editRule(id, event, func))
    },

    editRuleEvent: (event) => {
      dispatch(editRuleEvent(event))
    },

    selectCurrentRule: (rule) => {
      dispatch(selectCurrentRule(rule))
    },
    openConfirmModal: () => {
      dispatch(openConfirmModal())
    },
    closeConfirmModal: () => {
      dispatch(closeConfirmModal())
    },


    getRules: (id) => dispatch(getRules(id)),

    createNewRule: (rule) => {
      dispatch(createNewRule(rule))
    },

    editRuleFunc: (func) => {
      dispatch(editRuleFunc(func))
    },


    createRule: (id, type, event, func) => dispatch(createRule(id, type, event, func)),

    changeName: (name) => {
      dispatch(changeName(name))
    },


    editControl: (id, name, uuid) => {
      return dispatch(editControl(id, name, uuid))
    },

    editControlFunction: (id, func) => {
      return dispatch(editControlFunction(id, func))
    },

    onEditControlFunc: (func) => {
      dispatch(onEditControlFunction(func))
    },

    changeControlType: (controlType) => {
      dispatch(changeControlType(controlType))
    },



    deleteControl: (id) => {
      return dispatch(deleteControl(id))
    },
    getControlTypes: () => {
      return dispatch(setControlTypes())
    },
    resetFail: () => {
      dispatch({type: constants.RESET_CONTROL_FAIL})
    },

    getCurrentControl : (id) => {
      return dispatch(getCurrentControl(id))
    }
  })
)(CurrentControl)