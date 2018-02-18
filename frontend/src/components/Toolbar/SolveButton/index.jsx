import React from 'react';
import { Button } from 'semantic-ui-react';

const SolveButton = props => (
  <Button
    circular
    floated="right"
    icon="cubes"
    data-tooltip="pack"
    data-variation="tiny"
    data-position="left center"
    onClick={() => props.callSolver(props.sessionId)}
  />
);

export default SolveButton;