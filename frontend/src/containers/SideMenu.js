import { connect } from 'react-redux';
import { clearPackedObjects } from '../actions/packingObjects';
import { updateSettings } from '../actions/settings';
import callSolver from '../actions/solves';

import SideMenu from '../components/SideMenu';

const mapDispatchToProps = dispatch => ({
  clearPackedObjects: sessionId => dispatch(clearPackedObjects(sessionId)),
  callSolver: (sessionId, body) => dispatch(callSolver(sessionId, body)),
  updateSettings: (sessionId, body) => dispatch(updateSettings(sessionId, body)),
});

export default connect(null, mapDispatchToProps)(SideMenu);
