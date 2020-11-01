import React from 'react';

import Deck from './Deck'

const App = () => {
  console.log('App: Render');
  return (
    <div>
      <Deck cardAmount={6} />
    </div>
  );
}

export default App;
