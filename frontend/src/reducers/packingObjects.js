import { ADD_PACKING_OBJECT } from '../actions'

const packingObjects = (state = [], action) => {
  switch (action.type) {
    case ADD_PACKING_OBJECT:
      return Object.assign({}, state, {
        packingObjects: [
          ...state,
          {
            width: action.width,
            height: action.height,
            xCoordinate: action.xCoordinate,
            yCoordinate: action.yCoordinate
          }
        ]
      })
    default:
      return state
  }
}

export default packingObjects
