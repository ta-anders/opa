import {
  CREATE_PACKING_OBJECTS,
  DELETE_PACKING_OBJECTS,
  GET_PACKING_OBJECTS,
  UPDATE_PACKING_OBJECT,
  SOLVER_SUCCESS,
  CLEAR_PACKED_OBJECTS,
} from '../actions'

const initialState = [];


const packingObjects = (state = initialState, action) => {
  switch (action.type) {
    case GET_PACKING_OBJECTS:
      return action.response;
    case CREATE_PACKING_OBJECTS:
        return ([
          ...state,
          ...action.payload
        ]);
    case DELETE_PACKING_OBJECTS:
      return state.filter(entity => action.payload["deleted"].indexOf(entity.id) === -1);
    case UPDATE_PACKING_OBJECT:
      const indexToUpdate = state.findIndex(entity => entity.id === action.payload.id);
      return ([
        ...state.slice(0, indexToUpdate),
        action.payload,
        ...state.slice(indexToUpdate + 1, state.length),
      ]);
    case CLEAR_PACKED_OBJECTS:
      return action.payload;
    case SOLVER_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}

export default packingObjects
