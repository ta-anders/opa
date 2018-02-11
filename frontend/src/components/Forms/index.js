import React, { Component } from 'react';
import { connect } from 'react-redux'
import './index.css'
import ClearObjectsButton from './ClearObjects';
import CreateObjectsFormContainer from './CreateObjects';
import DeleteObjectsButtonContainer from './DeleteObjects';
import Utilisation from './Utilisation';
import SolveButton from './SolveButton'


const FormBar = (props) => {
  const {sessionId} = props;

  return (
    <div className="FormBar">
      <div style={{width: props.width, height: "100%", float: "left", textAlign: "center"}}>
        <Utilisation/>
        <ClearObjectsButton sessionId={sessionId}/>
        <SolveButton sessionId={sessionId}/>
      </div>
      <div className="UnpackedForms">
        <div style={{float: "left", paddingLeft: "30%"}}>
          <CreateObjectsFormContainer sessionId={sessionId}/>
        </div>
        <div style={{float: "right"}}>
          <DeleteObjectsButtonContainer sessionId={sessionId}/>
        </div>
      </div>
    </div>
  )
}


const mapStateToProps = state => {
  return state.packingSpace;
}


export default connect(mapStateToProps, null)(FormBar)