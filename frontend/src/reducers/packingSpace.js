import * as ACTION_CONSTANTS from '../actions/constants';

const initialState = { height: 500, width: 600 };

const packingSpace = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_CONSTANTS.END_LOAD:
      return action.packingSpace;
    case ACTION_CONSTANTS.UPDATE_PACKING_SPACE:
      return action.payload.packing_space;
    default:
      return state;
  }
};

export default packingSpace;
