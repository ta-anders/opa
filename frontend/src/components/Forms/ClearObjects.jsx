import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

import { clearPackedObjects } from '../../actions/packingObjects';

const ClearObjectsButton = props => (
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

const mapDispatchToProps = dispatch => ({
  clearPackedObjects: sessionId => dispatch(clearPackedObjects(sessionId)),
});

export default connect(null, mapDispatchToProps)(ClearObjectsButton);
