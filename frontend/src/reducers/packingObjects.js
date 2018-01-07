import { GET_PACKING_OBJECTS } from '../actions'

const initialState = {unpackedObjects: [], packedObjects: []};


function stripFields(packingObj) {
  const {id, width, height, xCoordinate, yCoordinate, packed} = packingObj;
  if (!packed) {
    return {id: id, width: width, height: height}
  }
  else {
    return {
      id: id,
      width: width,
      height: height,
      xCoordinate: xCoordinate,
      yCoordinate: yCoordinate
    }
  }
}


const packingObjects = (state = initialState, action) => {
  switch (action.type) {
    case GET_PACKING_OBJECTS:
      let newState = {unpackedObjects: [], packedObjects: []};
      for (let i = 0; i < action.payload.length; i++) {
        let obj = action.payload[i];
        if (obj.packed) {
          newState.packedObjects.push(stripFields(obj))
        }
        else {
          newState.unpackedObjects.push(stripFields(obj))
        }
      }
      return newState
    default:
      return state
  }
}

export default packingObjects
