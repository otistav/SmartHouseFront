import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as constants from '../constants/actions'
import {logOut} from "../actions/authorizedUser"
import {defineUser} from "../actions/authorizedUser"
import {withRouter} from 'react-router-dom'
import {UserHomePage} from "../components/UserHomePage"
import {getDevices, setDeviceTypes} from "../actions/devices"
import FlatButton from 'material-ui/FlatButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import {ErrorMessage} from "../components/errorMessage"
import Dialog from 'material-ui/Dialog'
import {DictionaryHeader} from "../components/DictionaryHeader"
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
import {openModal,closeModal,changeControlType,changeName,createControl} from "../actions/modalCreateControl"
import {dispatchControls,setControlTypes} from "../actions/controls"
import {SideBar} from "../components/SideBar"
import {Dictionary} from "../components/Dictionary"
import CurrentControl from '../containers/CurrentControl'
class ControlsPage extends Component {

  componentDidMount(){
    this.props.getControls();
    this.props.getControlTypes();
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
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.closeModal}/>,
      <FlatButton
        label="Create device"
        // disabled={this.props.isFetching}
        primary={true}

        onTouchTap={() => {this.props.createControl(this.props.name,this.props.controlType)}}
      />
    ];

    const itemNames = this.getControlsNames();
    return(
      <MuiThemeProvider>
        <div>
        <Dictionary
          openModal={this.props.openModal}
          path="controls"
          title="Controls"
          items={this.props.controls}
          itemNames={itemNames}
          getSelectedItem={this.getControlByName}
        >
          <Route path="/home/controls/:id" component={CurrentControl}/>
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
              <TextField value={this.props.name}
                         floatingLabelText="Name"
                     onChange={(e) => {this.props.changeName(e.target.value)}}
              /><br/><br/>

              {this.props.controlTypes===undefined ? null :
                <DropDownMenu value={this.props.controlType}  onChange={(event,index,value) => {
                  this.props.changeControlType(value)}} >
                  {this.props.controlTypes.map((controlType,value) =>
                    <MenuItem value={controlType.uuid} primaryText={
                      this.props.controlTypes[value].name
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
    controls: state.controls.controls,
    errorMessage: state.modalCreateControl.errorMessage,
    fail: state.modalCreateControl.fail,
    controlType: state.modalCreateControl.currentControlType,
    controlTypes: state.controls.controlTypes,
    modalFlag: state.modalCreateControl.openModalFlag,
    name: state.modalCreateControl.name
  }),
  dispatch => ({
    getControls: () => {

      return dispatch(dispatchControls());
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

    changeControlType: (controlType) => {
      dispatch(changeControlType(controlType))
    },

    getControlTypes: () => {
      return dispatch(setControlTypes())
    },
    createControl: (name, controlType) => {
      return dispatch(createControl(name, controlType))
    }

  })

)(ControlsPage)