import React, { Component } from 'react';

import Toolbar from '../../containers/Toolbar';
import PackingSpace from '../../containers/PackingSpace';
import UnpackedObjectSpace from '../UnpackedObjectSpace/UnpackedObjectSpace';

import './index.css';

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
      <div className="app">
        <Toolbar sessionId={sessionId} />
        <PackingSpace objects={packedObjects} sessionId={sessionId} />
        <UnpackedObjectSpace objects={unpackedObjects} sessionId={sessionId} />
      </div>
    );
  }
}

export default OpaApp;
