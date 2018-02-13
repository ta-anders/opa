export const getActionFactory = type => response => ({ type, response });

export const updateActionFactory = type => payload => ({ type, payload });

export const createActionFactory = updateActionFactory;

export const deleteActionFactory = updateActionFactory;

export function fetchWrapper(url, config = {}) {
  return fetch(url, { ...config }).then((response) => {
    if (!response.ok) {
      return response.text().then(err => Promise.reject(err));
    }
    return response.json();
  });
}

export function sessionFetch(sessionId, url, config = {}) {
  const urlWithSession = `/sessions/${sessionId}/${url}`;
  return fetchWrapper(urlWithSession, config);
}

export function fetchAndDispatch(
  fetcher,
  args,
  responseActionCreator,
  preFetchActionCreators = [],
) {
  return (dispatch) => {
    preFetchActionCreators.map(i => dispatch(i));
    fetcher(...args).then((jsonResponse) => {
      dispatch(responseActionCreator(jsonResponse));
    });
  };
}

