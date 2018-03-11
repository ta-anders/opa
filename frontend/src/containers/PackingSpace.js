import { connect } from 'react-redux';
import { updatePackingObject } from '../actions/packingObjects';
import { updatePackingSpace } from '../actions/packingSpace';
import PackingSpace from '../components/PackingSpace';

const mapStateToProps = state => ({
  ...state.packingSpace,
});


const mapDispatchToProps = dispatch => ({
  updatePackingObject: (sessionId, body, id) => dispatch(updatePackingObject(sessionId, body, id)),
  updatePackingSpace: (sessionId, body, id) => dispatch(updatePackingSpace(sessionId, body, id)),
});


const PackingSpaceContainer = connect(
  mapStateToProps, mapDispatchToProps,
)(PackingSpace);

export default PackingSpaceContainer;
