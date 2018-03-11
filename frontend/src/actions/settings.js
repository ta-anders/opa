import * as ACTION_CONSTANTS from './constants';
import { fetchAndDispatch, sessionFetch, updateActionFactory, } from './index';

// Get actions
export function fetchSettings(sessionId) {
  return sessionFetch(sessionId, 'session_configuration/');
}

// Update actions
export const updateSettingsSuccess = updateActionFactory(
  ACTION_CONSTANTS.UPDATE_SETTINGS,
);

export function updateSettings(sessionId, body, id) {
  return fetchAndDispatch(
    sessionFetch,
    [
      sessionId,
      `session_configuration/${id}/`,
      { method: 'PUT', body: JSON.stringify(body) },
    ],
    updateSettingsSuccess,
  );
}
