import React from 'react';
import { Button, Popup } from 'semantic-ui-react';

const SolveButton = props => (
  <Popup
    trigger={
      <Button
        circular
        size="large"
        icon="cubes"
        onClick={() => props.callSolver(props.sessionId, props.selectedAlgorithm)}
      />
    }
    content="Auto pack"
    position="right center"
    open={props.enableTooltips ? undefined : false}
  />
);

export default SolveButton;