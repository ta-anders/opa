import React, { Component } from 'react';
import PackingSpace from '../../containers/PackingSpace';

import Toolbar from '../../containers/Toolbar';
import UnpackedObjectSpace from '../../containers/UnpackedObjectSpace';
import SideMenu from '../SideMenu';

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
      <div>
        <SideMenu />
        <div className="opa-app">
          <Toolbar sessionId={sessionId} allSessions={sessions} />
          <PackingSpace objects={packedObjects} sessionId={sessionId} />
          <UnpackedObjectSpace objects={unpackedObjects} sessionId={sessionId} />
        </div>
      </div>
    );
  }
}

export default OpaApp;
