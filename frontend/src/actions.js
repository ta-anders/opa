/*
 * action types
 */

export const ADD_PACKING_OBJECT = 'ADD_PACKING_OBJECT'
// export const DELETE_PACKING_OBJECT = 'DELETE_PACKING_OBJECT'


/*
 * action creators
 */

export function addPackingObject(width, height, xCoordinate, yCoordinate) {
  return {
    type: ADD_PACKING_OBJECT,
    width: width,
    height: height,
    xCoordinate: xCoordinate,
    yCoordinate: yCoordinate
  }
}
