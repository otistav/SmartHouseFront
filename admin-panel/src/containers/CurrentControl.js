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
import Divider from 'material-ui/Divider'

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
  componentWillUpdate(nextProps) {
    if ((nextProps.match.params.id !== this.props.match.params.id)) {
      this.props.getCurrentControl(nextProps.match.params.id)
    }
  }


  componentDidMount() {
    this.props.getControlTypes().then(() => {
      this.props.getCurrentControl(this.props.match.params.id)
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
        {(this.props.currentControl === undefined || this.props.controlForm === undefined ) ? <div>НЕТ ДЕВАЙСОВ</div>:
          <MuiThemeProvider>
            <div className="current-user-content">
              <Paper>

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
    controlForm: state.currentControl.controlForm,
    confirmModalFlag: state.currentControl.confirmModalOpen
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


    editControl: (id, name, uuid) => {
      return dispatch(editControl(id, name, uuid))
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