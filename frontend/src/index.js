import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PackingSpace from './components/PackingSpace/PackingSpace';
import UnpackedObjectSpace from './components/UnpackedObjectSpace/UnpackedObjectSpace'

import registerServiceWorker from './registerServiceWorker';


function App() {
  return(
    <div className="OuterWrapper">
      <h1 align="center">Packer</h1>
      <div className="InnerWrapper">
        <PackingSpace/>
        <UnpackedObjectSpace/>
      </div>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root'));
registerServiceWorker();
