import React from 'react';
import ReactDOM from 'react-dom';

import './assets/scss/index.scss';
import Game from './components/Game';

ReactDOM.render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>,
  document.getElementById('root')
);
