import React, { Component } from 'react';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import OpaAppContainer from './components/OpaAppContainer/OpaAppContainer';
import SessionsList from './components/Sessions/SessionsList';

import rootReducer from './reducers';

const redirectToSessions = () => {
  window.location = '/sessions';
};

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
          loggerMiddleware,
        ),
      ),
    );
  }

  render() {
    return (
      <Provider store={this.store}>
        <Router>
          <div>
            <Route exact path="/" render={() => redirectToSessions()} />
            <Route exact path="/sessions" component={SessionsList} />
            <Route path="/sessions/:sessionId" component={OpaAppContainer} />
          </div>
        </Router>
      </Provider>
    );
  }
}


export default DragDropContext(HTML5Backend)(App);
