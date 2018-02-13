import * as ACTION_CONSTANTS from './constants';

import {
  fetchAndDispatch, getActionFactory, sessionFetch,
  updateActionFactory,
} from './index';

// Get actions
const getPackingSpaceSuccess = getActionFactory(
  ACTION_CONSTANTS.GET_PACKING_SPACE,
);

export function getPackingSpace(sessionId) {
  return fetchAndDispatch(
    sessionFetch,
    [sessionId, 'packing_spaces'],
    getPackingSpaceSuccess,
  );
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
