import { connect } from 'react-redux';
import { loadData } from '../../actions/app';

import OpaApp from '../OpaApp/OpaApp';

const mapStateToProps = (state) => {
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
    loading: state.ui.loadingBaseData,
    packedObjects,
    unpackedObjects,
  };
};

const mapDispatchToProps = dispatch => ({
  loadData: sessionId => dispatch(loadData(sessionId)),
});


const OpaAppContainer = connect(mapStateToProps, mapDispatchToProps)(OpaApp);

export default OpaAppContainer;
