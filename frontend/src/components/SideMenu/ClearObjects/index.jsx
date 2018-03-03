import React from 'react';
import { Button, Popup } from 'semantic-ui-react';

const ClearObjects = props => (
  <Popup
    trigger={
      <Button
        circular
        size="large"
        icon="erase"
        onClick={() => props.clearPackedObjects(props.sessionId)}
      />
    }
    content="Clear packing progress"
    position="right center"
  />
);

export default ClearObjects;
