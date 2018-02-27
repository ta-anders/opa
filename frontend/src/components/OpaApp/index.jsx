import React, { Component } from 'react';

import Toolbar from '../../containers/Toolbar';
import PackingSpace from '../../containers/PackingSpace';
import UnpackedObjectSpace from '../../containers/UnpackedObjectSpace';

import './index.css';

class OpaApp extends Component {
  componentDidMount() {
    const { loadData, match } = this.props;
    const sessionId = match.params.sessionId;

    loadData(sessionId);
  }

  render() {
    const {
      packedObjects,
      unpackedObjects,
      loading,
      match,
      sessions,
    } = this.props;

    const sessionId = Number(match.params.sessionId);

    return (
      !loading &&
      <div className="app">
        <Toolbar sessionId={sessionId} allSessions={sessions} />
        <PackingSpace objects={packedObjects} sessionId={sessionId} />
        <UnpackedObjectSpace objects={unpackedObjects} sessionId={sessionId} />
      </div>
    );
  }
}

export default OpaApp;
