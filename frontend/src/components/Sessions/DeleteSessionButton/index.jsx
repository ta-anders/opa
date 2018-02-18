import React from 'react';
import { Button } from 'semantic-ui-react';

const DeleteSessionButton = props => (
  <Button
    negative
    onClick={() => props.deleteSession(props.sessionId)}
  >
    Delete
  </Button>
);

export default DeleteSessionButton;
