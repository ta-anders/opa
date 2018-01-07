import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'
import './index.css';
import AppContainer from './App'

import registerServiceWorker from './registerServiceWorker';

function renderApp() {
  let store = createStore(rootReducer);
  return(
    <Provider store={store}>
      <div className="OuterWrapper">
        <h1 align="center">Packer</h1>
        < AppContainer />
      </div>
    </Provider>
  )
}

ReactDOM.render(
  renderApp(),
  document.getElementById('root'));
registerServiceWorker();
