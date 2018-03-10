import * as ACTION_CONSTANTS from './constants';
import {
  createActionFactory,
  fetchAndDispatch,
  sessionFetch,
} from './index';

const callSolverSuccess = createActionFactory(
  ACTION_CONSTANTS.SOLVER_SUCCESS,
);

export default function callSolver(sessionId, selectedAlgorithmId, body) {
  return fetchAndDispatch(
    sessionFetch,
    [
      sessionId,
      `solve/${selectedAlgorithmId}`,
      { method: 'POST', body: JSON.stringify(body) },
    ],
    callSolverSuccess,
  );
}
