import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import 'semantic-ui-css/semantic.min.css';

import rootReducer from './reducers';
import './index.css';
import OpaAppContainer from './components/OpaAppContainer/OpaAppContainer';


class App extends Component {
  constructor() {
    super();
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line
    const loggerMiddleware = createLogger();
    this.store = createStore(
      rootReducer,
      composeEnhancers(
          applyMiddleware(
              thunkMiddleware,
              loggerMiddleware
          )
      )
    )
  }

  render() {
    return(
      <Provider store={this.store}>
        <div className="OuterWrapper">
          <h1 align="center">OPA</h1>
          <OpaAppContainer />
        </div>
      </Provider>
    )
  }
}


export default App