import React from 'react';
import ClearObjects from '../../components/Toolbar/ClearObjects';
import CreateObjects from '../../components/Toolbar/CreateObjects';
import DeleteObjects from '../../components/Toolbar/DeleteObjects';
import SolveButton from '../../components/Toolbar/SolveButton';
import Utilisation from '../../components/Toolbar/Utilisation';

import { Breadcrumb, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './index.css';

const Toolbar = (props) => {
  const {
    sessionId,
    allSessions,
    clearPackedObjects,
    createObjects,
    unpackedObjects,
    deleteObjects,
    callSolver,
    packedObjects,
    totalVolume,
    updateSession,
  } = props;

  const selectedSession = allSessions.find(e => e.id === sessionId);

  return (
    <div className="toolbar">
      {/*<div>*/}
        {/*<Utilisation*/}
          {/*packedObjects={packedObjects}*/}
          {/*totalVolume={totalVolume}*/}
        {/*/>*/}
        {/*<ClearObjects*/}
          {/*sessionId={sessionId}*/}
          {/*clearPackedObjects={clearPackedObjects}*/}
        {/*/>*/}
        {/*<SolveButton*/}
          {/*sessionId={sessionId}*/}
          {/*callSolver={callSolver}*/}
        {/*/>*/}
      {/*</div>*/}
      <div>
        <Breadcrumb size="large">
          <Breadcrumb.Section>
            <Link to={'/sessions'}>
              Sessions
            </Link>
          </Breadcrumb.Section>
          <Breadcrumb.Divider icon="right chevron" />
          <Breadcrumb.Section active>
            {allSessions && (
              <Dropdown scrolling text={selectedSession.name}>
                <Dropdown.Menu>
                  {allSessions.map(session => (
                    <Dropdown.Item
                      key={session.id}
                      as={
                        () => (
                          <a
                            className="item"
                            href={`${session.id}`}
                            onClick={() => console.log('hi')}
                          >
                            {session.name}
                          </a>
                        )
                      }
                    />
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Breadcrumb.Section>
        </Breadcrumb>
      </div>
      <div className="create-wrapper">
        <CreateObjects
          sessionId={selectedSession.id}
          createObjects={createObjects}
          unpackedObjects={unpackedObjects}
        />
        <DeleteObjects
          sessionId={selectedSession.id}
          deleteObjects={deleteObjects}
        />
      </div>
      {/*<div>*/}
        {/*<DeleteObjects*/}
          {/*sessionId={sessionId}*/}
          {/*deleteObjects={deleteObjects}*/}
        {/*/>*/}
      {/*</div>*/}
    </div>
  );
};

export default Toolbar;
