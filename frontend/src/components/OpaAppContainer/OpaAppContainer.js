import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import OpaApp from '../OpaApp/OpaApp'
import { fetchPackingObjects, fetchPackingSpace } from '../../actions.js'


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
  loadPackingObjects: (sessionId) => dispatch(fetchPackingObjects(sessionId)),
  loadPackingSpace: (sessionId) => dispatch(fetchPackingSpace(sessionId)),
});


const OpaAppContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(OpaApp))

export default OpaAppContainer