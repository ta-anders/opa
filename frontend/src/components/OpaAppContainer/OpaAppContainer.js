import { connect } from 'react-redux'

import OpaApp from '../OpaApp/OpaApp'
import { fetchPackingObjects } from '../../actions.js'


const mapStateToProps = state => {
  return {
    packedObjects: state.packingObjects.packedObjects,
    unpackedObjects: state.packingObjects.unpackedObjects
  }
}

const mapDispatchToProps = dispatch => ({
  loadData: () => dispatch(fetchPackingObjects()),
});


const OpaAppContainer = connect(mapStateToProps, mapDispatchToProps)(OpaApp)

export default OpaAppContainer