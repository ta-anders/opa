import fetch from 'isomorphic-fetch'


export const GET_PACKING_OBJECTS = 'GET_PACKING_OBJECTS'


export function getPackingObjects(packingObjects) {
  return {
    type: GET_PACKING_OBJECTS,
    payload: packingObjects
  }
}


export function fetchPackingObjects() {
    return function (dispatch) {
        return fetch('/packing_objects')
            .then(
                response => response.json()
            )
            .then(
                json => dispatch(getPackingObjects(json))
            )
    }
}
