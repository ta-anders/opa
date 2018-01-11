import React, { Component } from 'react';
import './index.css'
import CreateObjectsFormContainer from './CreateObjects'
import DeleteObjectsButtonContainer from './DeleteObjects'


const FormBar = (props) => {
  return (
    <div className="FormBar">
      <CreateObjectsFormContainer/>
      <DeleteObjectsButtonContainer/>
    </div>
  )
}


export default FormBar