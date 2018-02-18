import { connect } from 'react-redux';
import {
  clearPackedObjects, createPackingObjects,
  deletePackingObjects,
} from '../actions/packingObjects';
import callSolver from '../actions/solves';
import Toolbar from '../components/Toolbar';

const mapStateToProps = state => ({
  unpackedObjects: state.packingObjects.filter(record => (!record.packed)),
  packedObjects: state.packingObjects.filter(entity => entity.packed),
  totalVolume: state.packingSpace.width * state.packingSpace.height,
  ...state.packingSpace,
});

const mapDispatchToProps = dispatch => ({
  clearPackedObjects: sessionId => dispatch(clearPackedObjects(sessionId)),
  createObjects: (sessionId, body) => dispatch(
    createPackingObjects(sessionId, body),
  ),
  deleteObjects: sessionId => dispatch(deletePackingObjects(sessionId, {})),
  callSolver: (sessionId, body) => dispatch(callSolver(sessionId, body)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
