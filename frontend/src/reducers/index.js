import { combineReducers } from 'redux'

import packingObjects from '../reducers/packingObjects'
import packingSpace from '../reducers/packingSpace'
import sessions from '../reducers/sessions'

const rootReducer = combineReducers({
  packingObjects,
  packingSpace,
  sessions
})

export default rootReducer
