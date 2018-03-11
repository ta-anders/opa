import * as ACTION_CONSTANTS from '../actions/constants';

const initialState = [];

const packingObjects = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_CONSTANTS.END_LOAD:
      return action.packingObjects;
    case ACTION_CONSTANTS.CREATE_PACKING_OBJECTS:
      return ([
        ...state,
        ...action.payload,
      ]);
    case ACTION_CONSTANTS.DELETE_PACKING_OBJECTS:
      return state.filter(
        entity => action.payload.deleted.indexOf(entity.id) === -1,
      );
    case ACTION_CONSTANTS.UPDATE_PACKING_OBJECT: {
      const indexToUpdate = state.findIndex(
        entity => entity.id === action.payload.id,
      );
      return ([
        ...state.slice(0, indexToUpdate),
        action.payload,
        ...state.slice(indexToUpdate + 1, state.length),
      ]);
    }
    case ACTION_CONSTANTS.CLEAR_PACKED_OBJECTS: {
      const updated = action.payload.map(i => i.id);
      return ([
        ...state.filter(entity => updated.indexOf(entity.id) === -1),
        ...action.payload,
      ]);
    }
    case ACTION_CONSTANTS.SOLVER_SUCCESS:
      return action.payload;
    case ACTION_CONSTANTS.UPDATE_PACKING_SPACE: {
      const updated = action.payload.modifiedPackingObjects.map(i => i.id);
      return ([
        ...state.filter(entity => updated.indexOf(entity.id) === -1),
        ...action.payload.modifiedPackingObjects
      ]);
    }
    default:
      return state;
  }
};

export default packingObjects;
