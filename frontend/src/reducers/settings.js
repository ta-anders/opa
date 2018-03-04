import * as ACTION_CONSTANTS from '../actions/constants';

const initialState = { enableTooltips: true };

const settings = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_CONSTANTS.END_LOAD:
      return action.settings;
    case ACTION_CONSTANTS.UPDATE_SETTINGS:
      return action.payload;
    default:
      return state;
  }
};

export default settings;
