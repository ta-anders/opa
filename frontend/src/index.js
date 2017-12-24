import React from 'react'
import ReactDOM from 'react-dom'
import Board from './components/Board'
import './index.css';
import { observe } from './Game';

const rootEl = document.getElementById('root');

observe(knightPosition =>
  ReactDOM.render(
    <Board knightPosition={knightPosition} />,
    rootEl
  )
);