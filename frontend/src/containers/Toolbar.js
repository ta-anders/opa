import { connect } from 'react-redux';
import {
  createPackingObjects,
  deletePackingObjects,
} from '../actions/packingObjects';
import Toolbar from '../components/Toolbar';

const mapStateToProps = state => ({
  unpackedObjects: state.packingObjects.filter(record => (!record.packed)),
  packedObjects: state.packingObjects.filter(entity => entity.packed),
});

const mapDispatchToProps = dispatch => ({
  createObjects: (sessionId, body) => dispatch(
    createPackingObjects(sessionId, body),
  ),
  deleteObjects: sessionId => dispatch(deletePackingObjects(sessionId, {})),
});

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
