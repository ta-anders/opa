import React from 'react';
import { Menu, Sidebar, Icon } from 'semantic-ui-react';
import SolveButton from './SolveButton';
import ClearObjects from './ClearObjects';

const SideMenu = (props) => {
  const {
    sessionId,
    clearPackedObjects,
    callSolver,
  } = props;

  return (
    <div>
      <Sidebar
        as={Menu}
        direction="left"
        vertical
        inverted
        fixed
        visible
        style={{width: "4.5%", backgroundColor: "#CED4E3"}}
      >
        <div style={{display: "flex", flexDirection: "column", height: "100%", paddingTop: "41px", justifyContent: "flex-start", flexGrow: "0", overflow: "hidden"}}>
          <div className="item" style={{alignSelf: "center"}}>
            <ClearObjects
              sessionId={sessionId}
              clearPackedObjects={clearPackedObjects}
            />
          </div>
          <div className="item" style={{alignSelf: "center"}}>
            <SolveButton
              sessionId={sessionId}
              callSolver={callSolver}
            />
          </div>
        </div>
      </Sidebar>
    </div>
  );
};

export default SideMenu;
