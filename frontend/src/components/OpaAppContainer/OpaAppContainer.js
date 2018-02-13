import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import OpaApp from '../OpaApp/OpaApp'
import { getPackingObjects } from '../../actions/packingObjects';
import { getPackingSpace } from '../../actions/packingSpace';

const mapStateToProps = state => {
  const packedObjects = [];
  const unpackedObjects = [];

  for (let i = 0; i < state.packingObjects.length; i++) {
    const obj = state.packingObjects[i];
    if (obj.packed) {
      packedObjects.push(obj);
    }
    else {
      unpackedObjects.push(obj);
    }
  }

  return {
    packedObjects: packedObjects,
    unpackedObjects: unpackedObjects
  }
}


const mapDispatchToProps = dispatch => ({
  loadPackingObjects: sessionId => dispatch(getPackingObjects(sessionId)),
  loadPackingSpace: sessionId => dispatch(getPackingSpace(sessionId)),
});


const OpaAppContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(OpaApp))

export default OpaAppContainer
