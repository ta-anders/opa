import { connect } from 'react-redux';
import { clearPackedObjects } from '../actions/packingObjects';
import { updateSettings } from '../actions/settings';
import callSolver from '../actions/solves';

import SideMenu from '../components/SideMenu';

const mapDispatchToProps = dispatch => ({
  clearPackedObjects: sessionId => dispatch(clearPackedObjects(sessionId)),
  callSolver: (sessionId, selectedAlgorithm, body) => (
    dispatch(callSolver(sessionId, selectedAlgorithm, body))
  ),
  updateSettings: (sessionId, body, id) => dispatch(updateSettings(sessionId, body, id)),
});

export default connect(null, mapDispatchToProps)(SideMenu);
