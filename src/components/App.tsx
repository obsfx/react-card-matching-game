import React from 'react';

import Deck from './Deck'

const App = () => {
  console.log('App: Render');
  return (
    <div>
      <Deck 
        pairCount={4}
        deckWidth={520}
        cardWidth={120}
      />
    </div>
  );
}

export default App;
