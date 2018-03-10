import React from 'react';
import { Button, Popup } from 'semantic-ui-react';

const DeleteObjects = props => (
  <Popup
    trigger={
      <Button
        onClick={() => props.deleteObjects(props.sessionId)}
        icon="trash"
      />
    }
    content="Delete unpacked objects"
    open={props.enableTooltips ? undefined : false}
  />
);

export default DeleteObjects;
