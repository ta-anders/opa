import * as ACTION_CONSTANTS from './constants';
import { createActionFactory, fetchAndDispatch, sessionFetch } from './index';

// Get actions
const callSolverSuccess = createActionFactory(
  ACTION_CONSTANTS.SOLVER_SUCCESS,
);

export default function callSolver(sessionId, body) {
  return fetchAndDispatch(
    sessionFetch,
    [
      sessionId,
      'solve',
      { method: 'POST', body: JSON.stringify(body) },
    ],
    callSolverSuccess,
  );
}
