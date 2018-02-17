import * as ACTION_CONSTANTS from './constants';
import {
  createActionFactory, deleteActionFactory, fetchAndDispatch,
  getActionFactory, updateActionFactory, fetchWrapper,
} from './index';

// Get actions
const getSessionsSuccess = getActionFactory(
  ACTION_CONSTANTS.GET_SESSIONS,
);

export function getSessions() {
  return fetchAndDispatch(
    fetchWrapper,
    ['/sessions'],
    getSessionsSuccess,
  );
}

// Create Actions
const createSessionSuccess = createActionFactory(
  ACTION_CONSTANTS.CREATE_SESSION,
);

export function createSession(body) {
  return fetchAndDispatch(
    fetchWrapper,
    [
      '/sessions',
      { method: 'POST', body: JSON.stringify(body) },
    ],
    createSessionSuccess,
  );
}

// Update actions
const updateSessionSuccess = updateActionFactory(
  ACTION_CONSTANTS.UPDATE_SESSION,
);

export function updateSession(sessionId, body) {
  return fetchAndDispatch(
    fetchWrapper,
    [
      `/sessions/${sessionId}`,
      { method: 'PUT', body: JSON.stringify(body) },
    ],
    updateSessionSuccess,
  );
}

// Delete actions
const deleteSessionSuccess = deleteActionFactory(
  ACTION_CONSTANTS.DELETE_SESSION,
);

export function deleteSession(sessionId, body) {
  return fetchAndDispatch(
    fetchWrapper,
    [
      `/sessions/${sessionId}`,
      { method: 'DELETE', body: JSON.stringify(body) },
    ],
    deleteSessionSuccess,
  );
}
