import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {ErrorMessage} from "../components/errorMessage"
import Dialog from 'material-ui/Dialog'
import FontAwesome from 'react-fontawesome'
import {Icon} from 'react-fa'
import TextField from 'material-ui/TextField'
import {getIcons} from "../actions/modalCreatePage"
import FlatButton from 'material-ui/FlatButton'
import SelectField from 'material-ui/SelectField'
import CurrentPage from '../containers/CurrentPage'
import MenuItem from 'material-ui/MenuItem'
import {Route} from 'react-router-dom'
import {
  changeYPosition,
  changeName,
  changeXPosition,
  changeCaption,
  changeHeight,
  changeWidth,
  changeIconID,
  openModal,
  createPage,
  closeModal
} from "../actions/modalCreatePage"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Dictionary} from "../components/Dictionary"

import {DictionaryHeader} from "../components/DictionaryHeader"
import {dispatchPages} from "../actions/pages"
import {SideBar} from "../components/SideBar"


class Pages extends Component {

  componentDidMount(){
    this.props.getPages();
    this.props.getIcons();
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
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.closeModal}/>,
      <FlatButton
        label="Create user"
        disabled={this.props.isFetching}
        primary={true}

        onTouchTap={() =>
        {
          this.props.createPage(this.props.name, this.props.iconID,
            this.props.width, this.props.height,
            this.props.position_x,this.props.position_y,this.props.caption)
        }}
      />
    ];

    const itemNames = this.getPagesNames();
    console.log(itemNames);
    return(
      <MuiThemeProvider>
        <div>
        <Dictionary
          path="pages"
          openModal={this.props.openModal}
          title="Pages"
          items={this.props.pages}
          itemNames={itemNames}
          getSelectedItem={this.getPageByName}
        >
          <Route path="/home/pages/:id" component={CurrentPage}/>
        </Dictionary>

        <Dialog
        title="New User"
        actions={actions}
        modal={true}
        open={this.props.flag}
        >
        <form onSubmit={e => {e.preventDefault();
        }}
        >
          <label>
            <TextField value={this.props.name}
                       floatingLabelText="Name"
                       onChange={(e) => {this.props.changeName(e.target.value)}}
            />
            <TextField floatingLabelText="Caption" value={this.props.caption}
                   onChange={(e) => {this.props.changeCaption(e.target.value)}}
            />
            <TextField floatingLabelText="Width"
                       value={this.props.width}
                       onChange={(e) => this.props.changeWidth(e.target.value)}
            />
            <TextField value={this.props.height}
                       floatingLabelText="Height"
                       onChange={(e) => {this.props.changeHeight(e.target.value)}}
            />
            <TextField value={this.props.position_x}
                       floatingLabelText="Position_X"
                       onChange={(e) => {this.props.changeXPosition(e.target.value)}}
            />
            <TextField value={this.props.position_y}
                       floatingLabelText="Position_Y"
                       onChange={(e) => {this.props.changeYPosition(e.target.value)}}
            />
            {this.props.icons===undefined ? null :
              <SelectField value={this.props.iconID} floatingLabelText="icon ID"  onChange={(event,index,value) => {this.props.changeIconID(value)}} >
                {this.props.icons.map((icon,value) =>

                  <MenuItem value={icon.id} key={value} primaryText={
                    <FontAwesome name={this.props.icons[value].path}/>
                  }/>)}
              </SelectField>}



            {/*<ErrorMessage fail={this.props.fail} errorMessage={this.props.errorMessage}/>*/}


          </label>
        </form>

      </Dialog>
      {/*<ErrorMessage fail={this.props.getUsersFail} errorMessage={this.props.errorMessageUsers} />*/}
        </div>
  </MuiThemeProvider>
    )
  }
}

export default connect(
  state => ({
    icons: state.pages.icons,
    caption: state.modalCreatePage.caption,
    pages: state.pages.pages,
    flag: state.modalCreatePage.openModalFlag,
    name: state.modalCreatePage.name,
    iconID: state.modalCreatePage.iconID,
    width: state.modalCreatePage.width,
    height: state.modalCreatePage.height,
    position_x: state.modalCreatePage.position_x,
    position_y: state.modalCreatePage.position_y,

  }),
  dispatch => ({
    getPages: () => {
      return dispatch(dispatchPages());
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
    changeCaption: (caption) => {
      dispatch(changeCaption(caption))
    },
    changeIconID: (iconID) => {
      dispatch(changeIconID(iconID))
    },
    changeWidth: (width) => {
      dispatch(changeWidth(width))
    },
    changeHeight: (height) => {
      dispatch(changeHeight(height))
    },
    changeXPosition: (position_x) => {
      dispatch(changeXPosition(position_x))
    },
    changeYPosition: (position_y) => {
      dispatch(changeYPosition(position_y))
    },

    getIcons: () => {
      return dispatch(getIcons());
    },
    createPage: (name, iconID, width,
                  height, position_x, position_y, caption) => {
      return dispatch(createPage(
        iconID, name, caption, width,
        height, position_x, position_y)
      )
    }
  })

)(Pages)