import { CREATE_SESSION, DELETE_SESSION, GET_SESSIONS, UPDATE_PACKING_OBJECT, UPDATE_SESSION } from '../actions'

const initialState = [];


const sessions = (state = initialState, action) => {
  switch (action.type) {
    case GET_SESSIONS:
      return action.response;
    case CREATE_SESSION:
      return ([
        ...state,
        action.payload
      ])
    case UPDATE_SESSION:
      const indexToUpdate = state.findIndex(entity => entity.id === action.payload.id);
      return ([
        ...state.slice(0, indexToUpdate),
        action.payload,
        ...state.slice(indexToUpdate + 1, state.length),
      ]);
    case DELETE_SESSION:
      return state.filter(entity => action.payload["deleted"].indexOf(entity.id) === -1);
    default:
      return state;
  }
}

export default sessions;
