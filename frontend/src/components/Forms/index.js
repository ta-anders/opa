import React, { Component } from 'react';
import './index.css'
import CreateObjectsFormContainer from './CreateObjects'
import DeleteObjectsButtonContainer from './DeleteObjects'


const FormBar = (props) => {
  return (
    <div className="FormBar">
      <div className="UnpackedForms">
          <div style={{margin: "auto"}}>
            <CreateObjectsFormContainer/>
          </div>
          <div>
            <DeleteObjectsButtonContainer/>
          </div>
      </div>
    </div>
  )
}


export default FormBar