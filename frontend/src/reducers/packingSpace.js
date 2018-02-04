import {GET_PACKING_SPACE, UPDATE_PACKING_SPACE} from '../actions.js';

const initialState = {height: 500, width: 600};


const packingSpace = (state = initialState, action) => {
  switch (action.type) {
    case GET_PACKING_SPACE:
      return action.response;
    case UPDATE_PACKING_SPACE:
      return action.payload.packing_space;
    default:
      return state
  }
}

export default packingSpace;
