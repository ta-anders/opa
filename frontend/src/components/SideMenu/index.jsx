import classNames from 'classnames';
import React from 'react';
import { Menu, Sidebar } from 'semantic-ui-react';
import ClearObjects from './ClearObjects';
import './index.css';
import SettingsModal from './Settings';
import SolveButton from './SolveButton';

const sidebarStyling = { width: '4.5%', backgroundColor: '#CED4E3' };
const sideBarItemClassNames = classNames('item', 'sidebar-item');

const SideMenu = (props) => {
  const {
    sessionId,
    clearPackedObjects,
    callSolver,
    updateSettings,
    settings,
  } = props;

  return (
    <div>
      <Sidebar
        as={Menu}
        direction="left"
        vertical
        inverted
        visible
        style={sidebarStyling}
      >
        <div className="sidebar-container">
          <div className={sideBarItemClassNames}>
            <ClearObjects
              sessionId={sessionId}
              clearPackedObjects={clearPackedObjects}
              enableTooltips={settings.enableTooltips}
            />
          </div>
          <div className={sideBarItemClassNames}>
            <SolveButton
              sessionId={sessionId}
              callSolver={callSolver}
              enableTooltips={settings.enableTooltips}
              selectedAlgorithmId={settings.selectedAlgorithmId}
            />
          </div>
          <div className={sideBarItemClassNames}>
            <SettingsModal
              sessionId={sessionId}
              updateSettings={updateSettings}
              settings={settings}
            />
          </div>
        </div>
      </Sidebar>
    </div>
  );
};

export default SideMenu;
