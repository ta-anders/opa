import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import callSolver from '../../actions/solves';

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

const mapDispatchToProps = dispatch => ({
  callSolver: (sessionId, body) => dispatch(callSolver(sessionId, body)),
});

export default connect(null, mapDispatchToProps)(SolveButton);
