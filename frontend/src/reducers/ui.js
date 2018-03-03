import * as ACTION_CONSTANTS from '../actions/constants';

const initialState = {
  loadingBaseData: false,
  updatingObjects: [],
  updatingSpace: false,
};

const ui = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_CONSTANTS.START_LOAD:
      return { ...state, loadingBaseData: true };
    case ACTION_CONSTANTS.END_LOAD:
      return { ...state, loadingBaseData: false };
    case ACTION_CONSTANTS.START_UPDATE_PACKING_OBJECT:
      return {
        ...state,
        updatingObjects: [...state.updatingObjects, action.objectId],
      };
    case ACTION_CONSTANTS.UPDATE_PACKING_OBJECT:
      return { ...state, updatingObjects: [] };
    case ACTION_CONSTANTS.START_UPDATE_PACKING_SPACE:
      return { ...state, updatingSpace: true };
    case ACTION_CONSTANTS.UPDATE_PACKING_SPACE:
      return { ...state, updatingSpace: false };
    default:
      return state;
  }
};

export default ui;
