import React from 'react';
import { Button } from 'semantic-ui-react';

const ClearObjects = props => (
  <Button
    circular
    floated="left"
    icon="erase"
    data-tooltip="erase progress"
    data-variation="tiny"
    data-position="right center"
    onClick={() => props.clearPackedObjects(props.sessionId)}
  />
);

export default ClearObjects;
