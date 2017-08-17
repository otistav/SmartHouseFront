import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as constants from '../constants/actions'
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider'
import '../styles/currentUser.css'
import { editCurrentPageControl } from "../actions/currentPageControl"
import TextField from 'material-ui/TextField';
import '../styles/rightPageTab.css'
import { ErrorMessage } from "../components/errorMessage"
import DropDownMenu from 'material-ui/DropDownMenu'
import Menu from 'material-ui/Menu'
import SelectField from 'material-ui/SelectField'
import { getControls } from "../actions/currentPage"
import { setCurrentControl } from "../actions/currentPage"
import MenuItem from 'material-ui/MenuItem'
import {getIcons} from "../actions/modalCreatePage"
import {addPageControl} from "../actions/currentPage"
import {Tabs, Tab} from 'material-ui/Tabs';
import FontAwesome from 'react-fontawesome'

import {editControlHeight,
  editControlPositionX, editControlPositionY, editControlWeight, deletePageControl} from "../actions/currentPageControl"
import '../styles/pages.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import {getCurrentPage} from "../actions/currentPage"
import {deletePage} from "../actions/currentPage"
import '../styles/loginBar.css'
import {openConfirmModal} from "../actions/currentPage"
import {closeConfirmModal} from "../actions/currentPage"
import {changeYPosition,changeXPosition,
  changeHeight,changeWidth,
  changeCaption, changeName,
  changeIcon
} from "../actions/currentPage"
import {editPage} from "../actions/currentPage"
import {dispatchControls} from "../actions/controls"


class CurrentPage extends Component {
  componentWillUpdate(nextProps) {

    if ((nextProps.match.params.id !== this.props.match.params.id)) {
      console.log("I AM UPDATING AT COMPONENTWILLUPDATE");

      this.props.getPageControls(nextProps.match.params.id);
      this.props.getCurrentPage(nextProps.match.params.id);
    }
  }

  componentDidMount() {
    this.props.getCurrentPage(this.props.match.params.id);
    this.props.getControls();
    this.props.getPageControls(this.props.match.params.id);
    this.props.getIcons();

  }

  getFreeControls() {
    let arr = [];
    // arr = this.props.controls.filter()
    arr = this.props.controls.map((item, index) => {
      for (let i=0; i < this.props.pageControls.length; i++){
        if (item.id === this.props.pageControls[i].pageControl[0].controlID)
          return
      }
      return <MenuItem value={item.id} primaryText={item.name}/>
    });
    return arr
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.closeConfirmModal}/>,
      <FlatButton
        label="DELETE"
        primary={true}

        onTouchTap={
          () => {
            this.props.deletePage(this.props.currentPage.id).then(() => {
              this.props.closeConfirmModal();
              setTimeout(() => {this.props.resetFail()}, 6000)
            });
          }
        }
      />
    ];
    const styles = {
      block: {
        Width: '500px',
        display: 'inline-flex'
      },
      checkbox: {
        marginBottom: 16,
      },
    };
    console.log('this is page control', this.props.pageControlForm.id);
    return (
      <div>
        {
          (
            this.props.isFetchingCurrentPage ||
            this.props.isFetchingIcons ||
            this.props.isFetchingControls || this.props.isFetchingPageControls) ? null :

            <MuiThemeProvider>
              <div className="current-user-content">
                <Paper>
                  <Tabs>
                    <Tab label="Edit Page Fields">
                      <div style={styles.block} className="current-user-input">
                        <div style={{display: 'block'}}>
                          <TextField floatingLabelText="Name"
                                     style={{display: 'block', width: '500px',marginRight: '10px'}}
                                     floatingLabelFixed={true}
                                     errorText={this.props.pageForm.name === "" ? 'name is required' : null}
                                     value={this.props.pageForm.name}
                                     onChange={(e) => {this.props.changeName(e.target.value)}}/>

                          <TextField value={this.props.pageForm.caption}
                                     style={{display: 'block', width: '500px', marginRight: '10px'}}
                                     floatingLabelText="Caption"
                                     floatingLabelFixed={true}
                                     errorText={this.props.pageForm.caption === "" ? 'first Name is required' : null}
                                     onChange=
                                       {
                                         (e) => {
                                           this.props.changeCaption(e.target.value)
                                         }
                                       }
                          />

                            <SelectField value={this.props.pageForm.iconID} style={{width:'500px', marginRight: '10px'}}
                                         floatingLabelText="icon ID"
                                         onChange={(event,index,value) => {this.props.changeIconID(value)}} >
                              {this.props.icons.map((icon,value) =>
                                <MenuItem value={icon.id} primaryText={
                                  <div>
                                  <FontAwesome style={{marginRight: '20px'}} name={this.props.icons[value].path}/>
                                    {this.props.icons[value].path.toUpperCase()}</div>
                                }/>)
                              }
                            </SelectField>
                        </div>

                        <div style={{display: 'block'}}>
                          <TextField value={this.props.pageForm.width}
                                     style={{display: 'block', width: '500px'}}
                                     floatingLabelText="Width"

                                     floatingLabelFixed={true}
                                     onChange=
                                       {
                                         (e) => {
                                           this.props.changeWidth(e.target.value)
                                         }
                                       }
                          />
                          <TextField value={this.props.pageForm.height}
                                     style={{display: 'block', width: '500px'}}
                                     floatingLabelText="Height"
                                     floatingLabelFixed={true}
                                     onChange=
                                       {
                                         (e) => {
                                           this.props.changeHeight(e.target.value)
                                         }
                                       }
                          />
                          <TextField value={this.props.pageForm.position_x}
                                     style={{display: 'block', width: '500px'}}
                                     floatingLabelText="X Position"
                                     floatingLabelFixed={true}
                                     onChange=
                                       {
                                         (e) => {
                                           this.props.changeXPosition(e.target.value)
                                         }
                                       }
                          />
                          <TextField value={this.props.pageForm.position_y}
                                     style={{display: 'block', width: '500px'}}
                                     floatingLabelText="Y Position"
                                     floatingLabelFixed={true}
                                     onChange=
                                       {
                                         (e) => {
                                           this.props.changeYPosition(e.target.value)
                                         }
                                       }
                          />
                        </div>

                      </div>

                      <Divider/>

                      <div style={{margin: '10px', paddingBottom: '10px'}}>
                        <RaisedButton
                          label="SAVE"
                          backgroundColor="#3F9298"
                          style={{marginRight: '10px'}}
                          primary={true}
                          onTouchTap={
                            () => {
                              this.props.editPage(
                                this.props.currentPage.id,
                                this.props.pageForm.iconID,
                                this.props.pageForm.name,
                                this.props.pageForm.caption,
                                this.props.pageForm.width,
                                this.props.pageForm.height,
                                this.props.pageForm.position_x,
                                this.props.pageForm.position_y
                                // (id, iconID, name, caption,
                                //   width, height, position_x,
                                //   position_y
                              ).then(() => {
                                setTimeout(() => {
                                  this.props.resetFail()
                                }, 6000)
                              })
                            }
                          }
                        />

                        <FlatButton onTouchTap={this.props.openConfirmModal}

                                    label="DELETE" style={{border: '2px red solid', color: 'red',marginLeft: '10px'}}
                        />
                      </div>

                      <Dialog
                        title="Are you sure you want to delete this user?"
                        actions={actions}
                        modal={true}
                        open={this.props.confirmModalFlag}
                      >
                      </Dialog>
                    </Tab>


                    <Tab label="Page Controls">
                      <div className="content">
                        <div className="left-side">
                          <div className="page-content-header" style={{backgroundColor: 'white'}}>
                            <div className="page-content-header-text">
                              <div className="add-button">
                                <DropDownMenu onChange={(event, index, value) => {
                                  this.props.addPageControl(this.props.match.params.id, value).then(() => {
                                    this.props.getPageControls(this.props.match.params.id)
                                  })
                                }} >
                                  {this.getFreeControls()}
                                </DropDownMenu>
                              </div>
                            </div>
                          </div>
                          <Menu disableAutoFocus={true}
                                onChange={(event, value) =>
                                {
                                  this.props.setCurrentControl(value)
                                }}>
                            {this.props.pageControls.map((item) =>
                              <MenuItem value={item}
                                        primaryText={item.name}/>
                            )}
                          </Menu>

                        </div>
                        <div className="right-side">
                          {this.props.pageControlForm.height === undefined ? null :
                            <div>
                              <TextField value={this.props.pageControlForm.position_x}
                                         floatingLabelText="X Position"
                                         style={{marginRight: '10px'}}
                                         floatingLabelFixed={true}
                                         onChange=
                                           {
                                             (e) => {
                                               this.props.editPositionX(e.target.value)
                                             }
                                           }
                              />
                              <TextField value={this.props.pageControlForm.position_y}
                                         floatingLabelText="Y Position"
                                         floatingLabelFixed={true}
                                         onChange=
                                           {
                                             (e) => {
                                               this.props.editPositionY(Number(e.target.value))
                                             }
                                           }
                              />
                              <TextField value={this.props.pageControlForm.height}
                                         floatingLabelText="height"
                                         floatingLabelFixed={true}
                                         onChange=
                            {
                              (e) => {
                              this.props.editHeight(e.target.value)
                            }
                            }
                              />
                              <TextField value={this.props.pageControlForm.width}
                              floatingLabelText="width"
                              floatingLabelFixed={true}
                              onChange=
                            {
                              (e) => {
                              this.props.editWeight(e.target.value)
                            }
                            }
                              />
                            <FlatButton label="DELETE"
                                        onTouchTap=
                                          {
                                            () => {
                                              this.props.deletePageControl(this.props.pageControlForm.id).then(() =>
                                              { this.props.getPageControls(this.props.match.params.id)})
                                            }
                                          }
                                        style={{border: '2px red solid', color: 'red',marginLeft: '10px'}}

                            />
                              <FlatButton label="SAVE"
                               onTouchTap=
                                 {
                                   () => {
                                     console.log(this.props.pageControlForm.height);
                                       this.props.editPageControl(
                                         this.props.pageControlForm.id,
                                         this.props.match.params.id,
                                         Number(this.props.pageControlForm.height),
                                         Number(this.props.pageControlForm.width),
                                         Number(this.props.pageControlForm.position_x),
                                         Number(this.props.pageControlForm.position_y)
                                     )
                                   }
                                 }
                              style={{border: '2px blue solid', color: 'blue',marginLeft: '10px'}}
                              />
                            </div>

                          }
                        </div>
                      </div>
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
    icons: state.pages.icons,
    fail: state.currentPage.fail,
    errorMessage: state.currentPage.errorMessage,
    pages: state.pages.pages,
    pageControls: state.currentPage.pageControls,
    currentPage: state.currentPage.page,
    pageForm: state.currentPage.pageForm,
    confirmModalFlag: state.currentPage.confirmModalOpen,
    controls: state.controls.controls,
    isFetchingPageControls: state.currentPage.isFetchingPageControls,
    isFetchingControls: state.controls.isFetchingPageControls,
    isFetchingIcons: state.pages.isFetchingIcons,
    isFetchingCurrentPage: state.currentPage.isFetchingCurrentPage,
    isFetchingPageForm: state.currentPage.isFetchingPageForm,
    currentPageControl: state.currentPageControl.currentControl,
    pageControlForm: state.currentPageControl.pageControlForm
  }),
  dispatch => ({
    openConfirmModal: () => {
      dispatch(openConfirmModal())
    },

    deletePageControl: (id) => {
      return dispatch(deletePageControl(id))
    },
    closeConfirmModal: () => {
      dispatch(closeConfirmModal())
    },

    editHeight: (height) => {
      dispatch(editControlHeight(height))
    },
    editPageControl: (id, pageID, height, weight, position_x, position_y) => {
      return dispatch(editCurrentPageControl(id, pageID, height, weight, position_x, position_y))
    },

    editWeight: (weight) => {
      dispatch(editControlWeight(weight))
    },

    editPositionX: (position_x) => {
      dispatch(editControlPositionX(position_x))
    },

    editPositionY: (position_y) => {
      dispatch(editControlPositionY(position_y))
    },

    changeName: (name) => {
      dispatch(changeName(name))
    },
    changeCaption: caption => {
      dispatch(changeCaption(caption))
    },
    changeWidth: width => {
      dispatch(changeWidth(width))
    },
    changeHeight: height => {
      dispatch(changeHeight(height))
    },
    changeXPosition: position_x => {
      dispatch(changeXPosition(position_x))
    },
    addPageControl: (id, controlID) => {
      return dispatch(addPageControl(id, controlID))

    },
    changeYPosition: position_y => {
      dispatch(changeYPosition(position_y))
    },
    changeIconID: iconID => {
      dispatch(changeIcon(iconID))
    },

    getControls: () => {

      return dispatch(dispatchControls());
    },
    editPage: (id, iconID, name, caption,
               width, height, position_x,
               position_y) => {
      return dispatch(editPage(id, iconID, name, caption,
        width, height, position_x,
        position_y))
    },
    resetFail: () => {
      dispatch({type: constants.RESET_PAGE_FAIL})
    },

    getIcons: () => {
      return dispatch(getIcons())
    },


    deletePage: (id) => {
      return dispatch(deletePage(id))
    },
    getPageControls: (id) => {
      return dispatch(getControls(id))
    },
    setCurrentControl: (control) => {
      dispatch(setCurrentControl(control))
    },
    getCurrentPage : (id) => {
      return dispatch(getCurrentPage(id))
    }
  })
)(CurrentPage)