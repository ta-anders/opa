import { combineReducers } from 'redux';

import packingObjects from '../reducers/packingObjects';
import packingSpace from '../reducers/packingSpace';
import sessions from '../reducers/sessions';
import settings from '../reducers/settings';
import ui from '../reducers/ui';

const rootReducer = combineReducers({
  packingObjects,
  packingSpace,
  sessions,
  settings,
  ui,
});

export default rootReducer;
