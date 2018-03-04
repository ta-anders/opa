import React from 'react';
import { Link } from 'react-router-dom';

import { Breadcrumb, Dropdown } from 'semantic-ui-react';
import Utilisation from './Utilisation';
import CreateObjects from './CreateObjects';
import DeleteObjects from './DeleteObjects';
import './index.css';

const Toolbar = (props) => {
  const {
    sessionId,
    allSessions,
    createObjects,
    packedObjects,
    unpackedObjects,
    deleteObjects,
    totalVolume,
    settings,
  } = props;

  const selectedSession = allSessions.find(e => e.id === sessionId);

  return (
    selectedSession != null && (
      <div className="toolbar">
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
        <div className="utilisation">
          <Utilisation
            packedObjects={packedObjects}
            totalVolume={totalVolume}
          />
        </div>
        <div className="create-wrapper">
          <CreateObjects
            sessionId={selectedSession.id}
            createObjects={createObjects}
            unpackedObjects={unpackedObjects}
            enableTooltips={settings.enableTooltips}
          />
          <DeleteObjects
            sessionId={selectedSession.id}
            deleteObjects={deleteObjects}
            enableTooltips={settings.enableTooltips}
          />
        </div>
      </div>
    )
  );
};

export default Toolbar;
