import * as ACTION_CONSTANTS from '../actions/constants';

const initialState = {
  loadingBaseData: true,
  updatingObjects: [],
  updatingSpace: false,
};

const ui = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_CONSTANTS.END_LOAD:
      return { ...state, loadingBaseData: false };
    case ACTION_CONSTANTS.START_UPDATE_PACKING_OBJECT:
      return {
        ...state,
        updatingObjects: [...state.updatingObjects, action.objectId],
      };
    case ACTION_CONSTANTS.UPDATE_PACKING_OBJECT:
      return { ...state, updatingObjects: [] };
    default:
      return state;
  }
};

export default ui;
