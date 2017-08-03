import React from 'react';
import '../styles/adminHomePage.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import {GridList, GridTile} from 'material-ui/GridList';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton';
import LoginPage from "../containers/Login";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import DropDownMenu from 'material-ui/DropDownMenu';
import {UserHomePage} from "./UserHomePage"
export
const AdminHomePage = (props) => {
  return(
    <MuiThemeProvider>

    <div >
      <AppBar title="Admin Panel"
              iconElementRight={
        <FlatButton label="Log Out"
                    onTouchTap={() => {props.logOut().then(() => {props.history.replace('/login')})}}
        />}

              iconElementLeft={
                <IconMenu iconButtonElement={<RaisedButton label="Menu"/>} >
                  <MenuItem value={1} containerElement={<Link to="/home/user"/>} primaryText="hey"/>
                </IconMenu>}
      />
      <Route path="/home/user" component={UserHomePage}/>

    </div>
    </MuiThemeProvider>
  )
};