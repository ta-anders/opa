import { connect } from 'react-redux';
import { updatePackingObject } from '../actions/packingObjects';
import UnpackedObjectSpace from '../components/UnpackedObjectSpace';

const mapDispatchToProps = dispatch => ({
  updatePackingObject: (sessionId, body, id) => dispatch(
    updatePackingObject(sessionId, body, id),
  ),
});

const UnpackedObjectSpaceContainer = connect(
  null, mapDispatchToProps)(UnpackedObjectSpace);

export default UnpackedObjectSpaceContainer;
