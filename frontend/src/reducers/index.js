import { combineReducers } from 'redux';

import packingObjects from '../reducers/packingObjects';
import packingSpace from '../reducers/packingSpace';
import sessions from '../reducers/sessions';
import ui from '../reducers/ui';

const rootReducer = combineReducers({
  packingObjects,
  packingSpace,
  sessions,
  ui,
});

export default rootReducer;
