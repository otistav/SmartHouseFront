
import React from 'react'
import '../styles/errorComponent.css'
import Drawer from 'material-ui/Drawer';
import Snackbar from 'material-ui/Snackbar';


export
const ErrorMessage = (props) => {
  return (
    <Snackbar
      open={props.fail}
      message={props.errorMessage}
      autoHideDuration={8000}
      bodyStyle={{backgroundColor: 'red',opacity: '0.7'}}
      contentStyle={{color:'black'}}
    />
  )

};