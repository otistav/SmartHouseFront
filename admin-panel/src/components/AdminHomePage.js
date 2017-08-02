import React from 'react';

export
const AdminHomePage = (props) => {
  return(
    <div>
      Im Admin
      <button onClick={() => {props.logOut().then(() => {props.history.replace('/login')})}}>LogOut</button>
    </div>
  )
};