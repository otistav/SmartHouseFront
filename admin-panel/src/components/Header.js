import {UserHomePage} from "./UserHomePage"
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
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

export
const Header = (props) => {
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
                    <MenuItem value={5} containerElement={<Link to="/home"/>} primaryText="HOME"/>
                    <MenuItem value={1} containerElement={<Link to="/home/users"/>} primaryText="USERS"/>
                    <MenuItem value={2} containerElement={<Link to="/home/devices"/>} primaryText="DEVICES"/>
                    <MenuItem value={3} containerElement={<Link to="/home/controls"/>} primaryText="CONTROLS"/>
                    <MenuItem value={4} containerElement={<Link to="/home/pages"/>} primaryText="PAGES"/>


                  </IconMenu>}
        />
      </div>
    </MuiThemeProvider>
  )
};