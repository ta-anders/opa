import * as ACTION_CONSTANTS from './constants';

import {
  createActionFactory, deleteActionFactory, fetchAndDispatch,
  sessionFetch, updateActionFactory,
} from './index';

// Get actions

/* Not currently needed as being done in the base load */
// const getPackingObjectSuccess = getActionFactory(
//   ACTION_CONSTANTS.GET_PACKING_OBJECTS,
// );

export function fetchPackingObject(sessionId) {
  return sessionFetch(sessionId, 'packing_objects');
}

// Create Actions
export const createPackingObjectsSuccess = createActionFactory(
  ACTION_CONSTANTS.CREATE_PACKING_OBJECTS,
);

export function createPackingObjects(sessionId, body) {
  return fetchAndDispatch(
    sessionFetch,
    [
      sessionId,
      'packing_objects',
      { method: 'POST', body: JSON.stringify(body) },
    ],
    createPackingObjectsSuccess,
  );
}

// Update actions
export const updatePackingObjectSuccess = updateActionFactory(
  ACTION_CONSTANTS.UPDATE_PACKING_OBJECT,
);

export const startObjectUpdateSuccess = objectId => (
  { type: ACTION_CONSTANTS.START_UPDATE_PACKING_OBJECT, objectId }
);

export function updatePackingObject(sessionId, body, id) {
  return fetchAndDispatch(
    sessionFetch,
    [
      sessionId,
      `packing_objects/${id}`,
      { method: 'PUT', body: JSON.stringify(body) },
    ],
    updatePackingObjectSuccess,
    [startObjectUpdateSuccess(id)],
  );
}

const clearPackedObjectsSuccess = updateActionFactory(
  ACTION_CONSTANTS.CLEAR_PACKED_OBJECTS,
);

export function clearPackedObjects(sessionId, body) {
  return fetchAndDispatch(
    sessionFetch,
    [
      sessionId,
      'packing_objects/clear',
      { method: 'PUT', body: JSON.stringify(body) },
    ],
    clearPackedObjectsSuccess,
  );
}


// Delete actions
const deletePackingObjectsSuccess = deleteActionFactory(
  ACTION_CONSTANTS.DELETE_PACKING_OBJECTS,
);

export function deletePackingObjects(sessionId, body) {
  return fetchAndDispatch(
    sessionFetch,
    [
      sessionId,
      'packing_objects',
      { method: 'DELETE', body: JSON.stringify(body) },
    ],
    deletePackingObjectsSuccess,
  );
}
