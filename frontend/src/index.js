import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './reducers';
import './index.css';
import AppContainer from './App';

import registerServiceWorker from './registerServiceWorker';


const loggerMiddleware = createLogger()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function renderApp() {
  let store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
        )
    )
  )
  return(
    <Provider store={store}>
      <div className="OuterWrapper">
        <h1 align="center">Packer</h1>
        <AppContainer />
      </div>
    </Provider>
  )
}

ReactDOM.render(
  renderApp(),
  document.getElementById('root'));
registerServiceWorker();
