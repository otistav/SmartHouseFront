
import React from 'react'
import {DictionaryHeader} from "./DictionaryHeader";
import {SideBar} from "./SideBar";

export
const Dictionary = (props) => {
  return (
    <div>
      <DictionaryHeader openModal={props.openModal}  title={props.title}/>
      <SideBar getSelectedItem={props.getSelectedItem}
               pathh={props.pathh}
               items={props.items} itemNames={props.itemNames}/>
      {props.children}
    </div>
  )

};