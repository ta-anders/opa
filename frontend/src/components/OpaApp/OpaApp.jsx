import React, { Component } from 'react'

import FormBar from '../Forms/index'
import PackingSpace from '../PackingSpace/PackingSpace';
import UnpackedObjectSpace from '../UnpackedObjectSpace/UnpackedObjectSpace'

import './OpaApp.css'


class OpaApp extends Component {
  componentDidMount() {
    const {loadPackingObjects, loadPackingSpace, match} = this.props;
    const sessionId = match.params.sessionId;

    loadPackingObjects(sessionId);
    loadPackingSpace(sessionId);
  }

  render() {
    const {packedObjects, unpackedObjects, match} = this.props;
    const sessionId = match.params.sessionId;

    return (
      <div className="OuterWrapper">
        <div className="OpaApp">
          <FormBar sessionId={sessionId}/>
          <PackingSpace objects={packedObjects} sessionId={sessionId}/>
          <UnpackedObjectSpace objects={unpackedObjects} sessionId={sessionId}/>
        </div>
      </div>
    )
  }
}


export default OpaApp