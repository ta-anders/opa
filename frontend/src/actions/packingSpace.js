import * as ACTION_CONSTANTS from './constants';

import {
  fetchAndDispatch, sessionFetch,
  updateActionFactory,
} from './index';

// Get actions
/* Not currently needed as being done in the base load */
// const getPackingSpaceSuccess = getActionFactory(
//   ACTION_CONSTANTS.GET_PACKING_SPACE,
// );

export function fetchPackingSpace(sessionId) {
  return sessionFetch(sessionId, 'packing_spaces');
}

// Update actions
export const updatePackingSpaceSuccess = updateActionFactory(
  ACTION_CONSTANTS.UPDATE_PACKING_SPACE,
);

export const startSpaceUpdateSuccess = () => (
  { type: ACTION_CONSTANTS.START_UPDATE_PACKING_SPACE }
);

export function startSpaceUpdate() {
  return dispatch => dispatch(startSpaceUpdateSuccess());
}

export function updatePackingSpace(sessionId, body) {
  return fetchAndDispatch(
    sessionFetch,
    [
      sessionId,
      'packing_spaces',
      { method: 'PUT', body: JSON.stringify(body) },
    ],
    updatePackingSpaceSuccess,
    // [startSpaceUpdateSuccess()],
  );
}
