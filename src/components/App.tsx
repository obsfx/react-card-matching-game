import React from 'react';

import Deck from './Deck'
import HUD from './HUD'

const App = () => {
  console.log('App: Render');
  return (
    <div>
      <div className="playground">
        <HUD 
          time={'00:30'}
        />
        <Deck 
          pairCount={3}
          deckSize={600}
        />
      </div>
    </div>
  );
}

export default App;
