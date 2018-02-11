import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';


import rootReducer from './reducers';
import './index.css';
import OpaAppContainer from './components/OpaAppContainer/OpaAppContainer';
import SessionsList from './components/Sessions/SessionsList';


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
        <Router>
          <div>
            <Route exact path="/" render = {() => (
              <Redirect to={{pathname: "/sessions"}}/>
              )}/>
            <Route exact path="/sessions" component={SessionsList}/>
            <Route path="/sessions/:sessionId" component={OpaAppContainer} />
          </div>
        </Router>
      </Provider>
    )
  }
}


export default DragDropContext(HTML5Backend)(App);