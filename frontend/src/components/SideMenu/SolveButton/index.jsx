import React from 'react';
import { Button, Popup } from 'semantic-ui-react';

const SolveButton = props => (
  <Popup
    trigger={
      <Button
        circular
        size="large"
        icon="cubes"
        onClick={() => props.callSolver(props.sessionId)}
      />
    }
    content="Auto pack"
    position="right center"
  />
);

export default SolveButton;