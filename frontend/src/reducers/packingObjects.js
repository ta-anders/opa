import {
  CREATE_PACKING_OBJECTS,
  DELETE_PACKING_OBJECTS,
  GET_PACKING_OBJECTS,
  UPDATE_PACKING_OBJECT,
  SOLVER_SUCCESS,
  CLEAR_PACKED_OBJECTS,
} from '../actions'

const initialState = [];


const clearCoords = (packingObject) => {
  return {...packingObject, xCoordinate: null, yCoordinate: null, packed: false};
}


const mapBackendReturnToFrontend = (backendPackingObject) => {
  const ret = {
    xCoordinate: backendPackingObject.x_coordinate,
    yCoordinate: backendPackingObject.y_coordinate,
    backgroundColor: backendPackingObject.background_color,
    ...backendPackingObject
  };
  delete ret["x_coordinate"];
  delete ret["y_coordinate"];
  delete ret["background_color"];

  return ret
}


const packingObjects = (state = initialState, action) => {
  switch (action.type) {
    case GET_PACKING_OBJECTS:
      return action.response.map(i => mapBackendReturnToFrontend(i));
    case CREATE_PACKING_OBJECTS:
        return ([
          ...state,
          ...action.payload.map(i => mapBackendReturnToFrontend(i)),
        ]);
    case DELETE_PACKING_OBJECTS:
      return state.filter(entity => action.payload["deleted"].indexOf(entity.id) === -1);
    case UPDATE_PACKING_OBJECT:
      const indexToUpdate = state.findIndex(entity => entity.id === action.payload.id);
      return ([
        ...state.slice(0, indexToUpdate),
        mapBackendReturnToFrontend(action.payload),
        ...state.slice(indexToUpdate + 1, state.length),
      ]);
    case CLEAR_PACKED_OBJECTS:
      return state.map(s => clearCoords(s));
    case SOLVER_SUCCESS:
      return action.payload.map(i => mapBackendReturnToFrontend(i));
    default:
      return state;
  }
}

export default packingObjects
