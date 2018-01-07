import React from 'react';
import { connect } from 'react-redux'
import './App.css'
import PackingSpace from './components/PackingSpace/PackingSpace';
import UnpackedObjectSpace from './components/UnpackedObjectSpace/UnpackedObjectSpace'

const App = ({unpackedObjects, packedObjects}) => {
  return (
      <div className="App">
        <PackingSpace objects={packedObjects}/>
        <UnpackedObjectSpace objects={unpackedObjects}/>
      </div>
    )
}


const filterPackingObjects = (packingObjects) => {
  let filtered = {unpacked: [], packed: []}
  packingObjects.map(
    obj => {
      const packed = obj.packed();
      packed ? filtered.unpacked.push(obj) : filtered.packed.push(obj);
    }
  )
  return filtered;
}


const mapStateToProps = state => {
  const filtered = filterPackingObjects(state.packingObjects);
  return {
    unpackedObjects: filtered.unpacked,
    packedObjects: filtered.packed
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App)

export default AppContainer