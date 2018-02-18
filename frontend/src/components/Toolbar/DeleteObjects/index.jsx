import React from 'react';
import { Button } from 'semantic-ui-react';

const DeleteObjects = props => (
  <Button
    onClick={() => props.deleteObjects(props.sessionId)}
    icon="trash"
  />
);

export default DeleteObjects;