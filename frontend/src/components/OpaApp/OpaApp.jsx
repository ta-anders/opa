import React, { Component } from 'react';

import FormBar from '../Forms/index';
import PackingSpace from '../PackingSpace/PackingSpace';
import UnpackedObjectSpace from '../UnpackedObjectSpace/UnpackedObjectSpace';

import './OpaApp.css';

class OpaApp extends Component {
  componentDidMount() {
    const { loadData, match } = this.props;
    const sessionId = match.params.sessionId;

    loadData(sessionId);
  }

  render() {
    const { packedObjects, unpackedObjects, loading, match } = this.props;
    const sessionId = match.params.sessionId;

    return (
      !loading &&
      <div className="OuterWrapper">
        <div className="OpaApp">
          <FormBar sessionId={sessionId} />
          <PackingSpace objects={packedObjects} sessionId={sessionId} />
          <UnpackedObjectSpace objects={unpackedObjects} sessionId={sessionId} />
        </div>
      </div>
    );
  }
}

export default OpaApp;
