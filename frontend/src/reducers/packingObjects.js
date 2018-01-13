import { CREATE_PACKING_OBJECTS, DELETE_PACKING_OBJECTS, GET_PACKING_OBJECTS, UPDATE_PACKING_OBJECT } from '../actions'

const initialState = [];


const packingObjects = (state = initialState, action) => {
  switch (action.type) {
    case GET_PACKING_OBJECTS:
      return action.response
    case CREATE_PACKING_OBJECTS:
        return ([
          ...state,
          ...action.payload,
        ])
    case DELETE_PACKING_OBJECTS:
      return [];
    case UPDATE_PACKING_OBJECT:
      const indexToUpdate = state.findIndex(entity => entity.id === action.payload.id);
      return ([
        ...state.slice(0, indexToUpdate),
        action.payload,
        ...state.slice(indexToUpdate + 1, state.length),
      ])
    default:
      return state
  }
}

export default packingObjects
