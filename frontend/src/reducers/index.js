import { combineReducers } from 'redux'

import packingObjects from '../reducers/packingObjects'
import packingSpace from '../reducers/packingSpace'

const rootReducer = combineReducers({
  packingObjects,
  packingSpace
})

export default rootReducer
