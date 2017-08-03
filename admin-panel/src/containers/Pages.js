import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as constants from '../constants/actions'
import {logOut} from "../actions/authorizedUser"
import {AdminHomePage} from "../components/AdminHomePage"
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
import {dispatchPages} from "../actions/pages"
import {SideBar} from "../components/SideBar"


class Pages extends Component {

  componentDidMount(){
    this.props.getPages();
  }

  getPagesNames = () => {
    if (this.props.pages !== undefined)
      return this.props.pages.map(page => page.name)

  };

  render(){

    const itemNames = this.getPagesNames();
    console.log(itemNames);
    return(
      <div>
        <SideBar items={this.props.pages} itemNames={itemNames}/>
      </div>
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