import * as ACTION_CONSTANTS from './constants';

import { fetchPackingObject } from './packingObjects';
import { fetchPackingSpace } from './packingSpace';
import { fetchSessions } from './sessions';

export const endLoad = data => ({
  type: ACTION_CONSTANTS.END_LOAD,
  ...data,
});

export const loadData = sessionId => (dispatch) => {
  const getActions = {
    packingObjects: fetchPackingObject(sessionId),
    packingSpace: fetchPackingSpace(sessionId),
    sessions: fetchSessions(),
  };

  Promise.all(Object.values(getActions)).then((data) => {
    Object.keys(getActions).forEach((key, i) => {
      getActions[key] = data[i];
    });
    dispatch(endLoad(getActions));
  });
};
