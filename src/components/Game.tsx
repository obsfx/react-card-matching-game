import React, 
{ 
  useState, 
  useEffect,
  useRef,
  MutableRefObject
} from 'react';

import { state } from '../constants';
import { cardRef } from './Card';

import Deck from './Deck';
import HUD from './HUD';

const Game = () => {
  console.log('App: Render');

  let cardRefs: MutableRefObject<cardRef[]> = useRef([]);

  let [ gameState, setGameState ] = useState<state>(state.onStage);
  let [ currentPairCount, setCurrentPairCount ] = useState<number>(1);
  let [ matchedPairCount, setMatchedPairCount ] = useState<number>(0);

  const handleCardMatch = (a: number, b: number) => {
    cardRefs.current[a].setDisabled(true);
    cardRefs.current[b].setDisabled(true);

    setMatchedPairCount(matchedPairCount + 1);
  }

  const handleCardMisMatch = (a: number, b: number) => {
    cardRefs.current[a].setFlipState(false);
    cardRefs.current[b].setFlipState(false);
  }

  const handleStageEnd = () => {
    setGameState(state.onStage);
    setCurrentPairCount(currentPairCount + 1);
    setMatchedPairCount(0);
  }

  useEffect(() => {
    if (matchedPairCount === currentPairCount) {
      setGameState(state.stageSwitching);

      cardRefs.current = cardRefs.current.map((ref: cardRef) => {
        ref.setDisabled(false);
        ref.setFlipState(false);
        return ref;
      });
    }
  }, [matchedPairCount, currentPairCount]);

  return (
    <div>
      <div className="playground">
        <HUD 
          time={'00:30'}
          progress={ 100 / currentPairCount * matchedPairCount }
        />
        <Deck 
          cardRefs={cardRefs}
          pairCount={currentPairCount}
          gameState={gameState}
          handleCardMatch={handleCardMatch}
          handleCardMisMatch={handleCardMisMatch}
          handleStageEnd={handleStageEnd}
        />
      </div>
    </div>
  );
}

export default Game;
