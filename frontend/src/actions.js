import fetch from 'isomorphic-fetch';


export const GET_PACKING_OBJECTS = 'GET_PACKING_OBJECTS';
export const GET_SESSIONS = 'GET_SESSIONS';
export const GET_PACKING_SPACE = 'GET_PACKING_SPACE';
export const UPDATE_PACKING_SPACE = 'UPDATE_PACKING_SPACE';
export const CREATE_PACKING_OBJECTS = 'CREATE_PACKING_OBJECTS';
export const DELETE_PACKING_OBJECTS = 'DELETE_PACKING_OBJECTS';
export const UPDATE_PACKING_OBJECT = 'UPDATE_PACKING_OBJECT';
export const CLEAR_PACKED_OBJECTS = 'CLEAR_PACKED_OBJECTS';
export const SOLVER_SUCCESS = 'SOLVER_SUCCESS';


export function getPackingObjectsSuccess(packingObjects) {
  return {
    type: GET_PACKING_OBJECTS,
    response: packingObjects
  }
}


export function getSessionsSuccess(sessions) {
  return {
    type: GET_SESSIONS,
    response: sessions
  }
}


export function getPackingSpaceSuccess(packingSpace) {
  return {
    type: GET_PACKING_SPACE,
    response: packingSpace
  }
}


export function updatePackingSpaceSuccess(payload) {
  return {
    type: UPDATE_PACKING_SPACE,
    payload
  }
}


export function updatePackingObjectSuccess(payload) {
  return {
    type: UPDATE_PACKING_OBJECT,
    payload,
  }
}


export function clearPackedObjectsSuccess(payload) {
  return {
    type: CLEAR_PACKED_OBJECTS,
    payload,
  }
}


export function createPackingObjectsSuccess(payload) {
  return {
    type: CREATE_PACKING_OBJECTS,
    payload,
  }
}


export function deletePackingObjectsSuccess(payload) {
  return {
    type: DELETE_PACKING_OBJECTS,
    payload,
  }
}


export function callSolverSuccess(payload) {
  return {
    type: SOLVER_SUCCESS,
    payload
  }
}


function _fetchWrapper(url, config = {}) {
  return fetch(url, { ...config }).then(response => response.json())
}


export function fetchWrapper(sessionId, url, config = {}) {
  const urlWithSession = `/sessions/${sessionId}/${url}`;
  return _fetchWrapper(urlWithSession, config);
}


export function fetchPackingObjects(sessionId) {
    return function (dispatch) {
        return fetchWrapper(sessionId, 'packing_objects').then(
          json => dispatch(getPackingObjectsSuccess(json))
        )
    }
}


export function fetchSessions() {
    return function (dispatch) {
        return _fetchWrapper('/sessions').then(
          json => dispatch(getSessionsSuccess(json))
        )
    }
}


export function fetchPackingSpace(sessionId) {
    return function (dispatch) {
        return fetchWrapper(sessionId, 'packing_spaces').then(
          json => dispatch(getPackingSpaceSuccess(json))
        )
    }
}


export function updatePackingSpace(sessionId, body) {
  return function(dispatch) {
    return fetchWrapper(
        sessionId,
        'packing_spaces',
        {method: 'PUT', body: JSON.stringify(body)}
      ).then(data => dispatch(updatePackingSpaceSuccess(data)))
    }
}


export function updatePackingObject(sessionId, body, packingObject) {
  return function(dispatch) {
    return fetchWrapper(
        sessionId,
        `packing_objects/${packingObject.id}`,
        {method: 'PUT', body: JSON.stringify(body)}
      ).then(data => dispatch(updatePackingObjectSuccess(data)))
    }
}


export function clearPackedObjects(sessionId, body) {
  return function(dispatch) {
    return fetchWrapper(
        sessionId,
        `packing_objects/clear`,
        {method: 'PUT', body: JSON.stringify(body)}
      ).then(data => dispatch(clearPackedObjectsSuccess(data)))
    }
}


export function createPackingObjects(sessionId, body) {
  return function(dispatch) {
    return fetchWrapper(
      sessionId,
      'packing_objects',
      {method: 'POST', body: JSON.stringify(body)}
    ).then(data => dispatch(createPackingObjectsSuccess(data)))
  }
}


export function deletePackingObjects(sessionId, body) {
  return function(dispatch) {
    return fetchWrapper(
      sessionId,
      'packing_objects',
      {method: 'DELETE', body: JSON.stringify(body)}
    ).then(data => dispatch(deletePackingObjectsSuccess(data)))
  }
}


export function callSolver(sessionId, body) {
  return function(dispatch) {
    return fetchWrapper(
      sessionId,
      'solve',
      {method: 'POST', body: JSON.stringify(body)}
    ).then(data => dispatch(callSolverSuccess(data)))
  }
}