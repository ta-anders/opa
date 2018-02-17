import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { deletePackingObjects } from '../../actions/packingObjects';

const DeleteObjectsButton = props => (
  <Button
    onClick={() => props.deleteObjects(props.sessionId)}
    icon="trash"
  />
);

const mapDispatchToProps = dispatch => ({
  deleteObjects: sessionId => dispatch(deletePackingObjects(sessionId, {})),
});

export default connect(null, mapDispatchToProps)(DeleteObjectsButton);
