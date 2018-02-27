import * as ACTION_CONSTANTS from '../actions/constants';

const initialState = [];

const sessions = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_CONSTANTS.GET_SESSIONS:
      return action.response;
    case ACTION_CONSTANTS.CREATE_SESSION:
      return ([
        ...state,
        action.payload,
      ]);
    case ACTION_CONSTANTS.UPDATE_SESSION: {
      const indexToUpdate = state.findIndex(
        entity => entity.id === action.payload.id);
      return ([
        ...state.slice(0, indexToUpdate),
        action.payload,
        ...state.slice(indexToUpdate + 1, state.length),
      ]);
    }
    case ACTION_CONSTANTS.DELETE_SESSION:
      return state.filter(
        entity => action.payload.deleted.indexOf(entity.id) === -1,
      );
    case ACTION_CONSTANTS.END_LOAD:
      return action.sessions;
    default:
      return state;
  }
};

export default sessions;
