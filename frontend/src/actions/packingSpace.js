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
const updatePackingSpaceSuccess = updateActionFactory(
  ACTION_CONSTANTS.UPDATE_PACKING_SPACE,
);

export function updatePackingSpace(sessionId, body) {
  return fetchAndDispatch(
    sessionFetch,
    [
      sessionId,
      'packing_spaces',
      { method: 'PUT', body: JSON.stringify(body) },
    ],
    updatePackingSpaceSuccess,
  );
}
