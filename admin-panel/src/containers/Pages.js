import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as constants from '../constants/actions'
import {logOut} from "../actions/authorizedUser"
import {defineUser} from "../actions/authorizedUser"
import {withRouter} from 'react-router-dom'
import {UserHomePage} from "../components/UserHomePage"
import {getPages} from "../actions/pages"
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Dictionary} from "../components/Dictionary"

import {DictionaryHeader} from "../components/DictionaryHeader"
import {dispatchPages} from "../actions/pages"
import {SideBar} from "../components/SideBar"


class Pages extends Component {

  componentDidMount(){
    this.props.getPages();
  }

  getPageByName = (name,pages) => {
    for (let i=0;i<pages.length;i++){
      if (pages[i].name === name)
        console.log("this is selected page",pages[i])
    }
  };

  getPagesNames = () => {
    if (this.props.pages !== undefined)
      return this.props.pages.map(page => page.name)

  };

  render(){

    const itemNames = this.getPagesNames();
    console.log(itemNames);
    return(
      <MuiThemeProvider>
        <Dictionary
          title="Pages"
          items={this.props.pages}
          itemNames={itemNames}
          getSelectedItem={this.getPageByName}
        >

        </Dictionary>
      </MuiThemeProvider>
    )
  }
}



export default connect(
  state => ({
    pages: state.pages.pages
  }),
  dispatch => ({
    getPages: () => {

      return dispatch(dispatchPages());
    },
  })

)(Pages)