import * as ACTION_CONSTANTS from './constants';

import { fetchPackingObject } from './packingObjects';
import { fetchPackingSpace } from './packingSpace';
import { fetchSessions } from './sessions';
import { fetchSettings } from './settings';

export const startLoad = () => ({
  type: ACTION_CONSTANTS.START_LOAD,
});

export const endLoad = data => ({
  type: ACTION_CONSTANTS.END_LOAD,
  ...data,
});

export const loadData = sessionId => (dispatch) => {
  dispatch(startLoad());

  const getActions = {
    packingObjects: fetchPackingObject(sessionId),
    packingSpace: fetchPackingSpace(sessionId),
    sessions: fetchSessions(),
    settings: fetchSettings(sessionId),
  };

  Promise.all(Object.values(getActions)).then((data) => {
    Object.keys(getActions).forEach((key, i) => {
      getActions[key] = data[i];
    });
    dispatch(endLoad(getActions));
  });
};
