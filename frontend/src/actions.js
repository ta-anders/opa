import fetch from 'isomorphic-fetch';


export const GET_PACKING_OBJECTS = 'GET_PACKING_OBJECTS';
export const CREATE_PACKING_OBJECTS = 'CREATE_PACKING_OBJECTS';
export const DELETE_PACKING_OBJECTS = 'DELETE_PACKING_OBJECTS';
export const UPDATE_PACKING_OBJECT = 'UPDATE_PACKING_OBJECT';


export function getPackingObjectsSuccess(packingObjects) {
  return {
    type: GET_PACKING_OBJECTS,
    response: packingObjects
  }
}


export function updatePackingObjectSuccess(payload) {
  return {
    type: UPDATE_PACKING_OBJECT,
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


export function fetchWrapper(url, config = {}) {
  return fetch(url, { ...config }).then(response => response.json())
}


export function fetchPackingObjects() {
    return function (dispatch) {
        return fetchWrapper('/packing_objects').then(
          json => dispatch(getPackingObjectsSuccess(json))
        )
    }
}


export function updatePackingObject(body, packingObject) {
  return function(dispatch) {
    return fetchWrapper(
        `/packing_objects/${packingObject.id}`,
        {method: 'PUT', body: JSON.stringify(body)}
      ).then(data => dispatch(updatePackingObjectSuccess(data)))
    }
}


export function createPackingObjects(body) {
  return function(dispatch) {
    return fetchWrapper(
      '/packing_objects',
      {method: 'POST', body: JSON.stringify(body)}
    ).then(data => dispatch(createPackingObjectsSuccess(data)))
  }
}


export function deletePackingObjects(body) {
  return function(dispatch) {
    return fetchWrapper(
      '/packing_objects',
      {method: 'DELETE', body: JSON.stringify(body)}
    ).then(data => dispatch(deletePackingObjectsSuccess(data)))
  }
}
