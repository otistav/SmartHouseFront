import {UserHomePage} from "./UserHomePage"
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton'
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
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import ContentLink from 'material-ui/svg-icons/content/link';
import Divider from 'material-ui/Divider';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import Download from 'material-ui/svg-icons/file/file-download';
import Delete from 'material-ui/svg-icons/action/delete';
import FontIcon from 'material-ui/FontIcon';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';


const style = {
  paper: {
    display: 'inline-block',
    float: 'left',
    // margin: '16px 32px 16px 0',
    width: '21%',
    height: 'auto',
    minHeight: '563px'
  },

};

export
const SideBar = (props) => {
  return(
    <MuiThemeProvider>
  <div>
    <Paper style={style.paper}>
      <Menu disableAutoFocus={true}>
        {props.items === undefined ? null :
          props.items.map((item,value) =>{
                return <MenuItem
                  style={{width:'84%'}}
                  key={value}
                  primaryText={props.itemNames[value]}
                  containerElement={
                    <Link to={'/home/'+props.path+'/'+item.id}
                    />
                  }
                />})}
      </Menu>
    </Paper>
  </div>
    </MuiThemeProvider>
  )
};