import React, { Component } from 'react';
import { connect } from 'react-redux'
import './index.css'
import CreateObjectsFormContainer from './CreateObjects'
import DeleteObjectsButtonContainer from './DeleteObjects'
import Utilisation from './Utilisation'


const FormBar = (props) => {
  return (
    <div className="FormBar">
      <div style={{width: props.width, height: "100%", float: "left"}}>
        <Utilisation/>
      </div>
      <div className="UnpackedForms">
        <div style={{float: "left", paddingLeft: "30%"}}>
          <CreateObjectsFormContainer/>
        </div>
        <div style={{float: "right"}}>
          <DeleteObjectsButtonContainer/>
        </div>
      </div>
    </div>
  )
}


const mapStateToProps = state => {
  return state.packingSpace;
}


export default connect(mapStateToProps, null)(FormBar)