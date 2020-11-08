import React, { useState, useEffect, useCallback } from 'react';
import { cardObj, cardStateProperties } from './Card';
import Deck from './Deck';
import Overlay from './Overlay';
import HUD from './HUD';
import Timer from './Timer';

export type gameState = {
  state: 'start' | 'action' | 'endgame',
  renderExtraTimeIndicator: boolean,
  startTimer: boolean,
  pairCount: number,
  matchedPairCount: number,
  secs: number,
  extraSecs: number,
  level: number,
  cards: cardObj[],
  flippedCards: number[]
}

const Game = () => {
  console.log('App: Render');

  const initialGameState: gameState = {
    state: 'start',
    renderExtraTimeIndicator: false,
    startTimer: false,
    pairCount: 3,
    matchedPairCount: 0,
    secs: 60,
    extraSecs: 0,
    level: 1,
    cards: [],
    flippedCards: []
  }

  const [ gameState, setGameState ] = useState<gameState>({
    ...initialGameState
  });

  const startGame = () => {
    setGameState({
      ...initialGameState,
      state: 'action',
      startTimer: true
    });
  }

  const decreaseSeconds = useCallback(() => {
    setGameState((prevState: gameState) => {
      let currentSecs: number = prevState.secs - 1;

      if (currentSecs < 0) {
        setGameState((prevState: gameState) => ({
          ...prevState,
          state: 'endgame',
          startTimer: false
        }));
      }

      return {
        ...prevState,
        secs: currentSecs < 0 ? 0 : currentSecs
      }
    });
  }, []);

  const setExtraTime = useCallback((extraSecs: number) => {
    setGameState((prevState: gameState) => ({
      ...prevState,
      extraSecs
    }));
  }, []);

  const setExtraTimeIndicator = useCallback((renderExtraTimeIndicator: boolean) => {
    setGameState((prevState: gameState) => ({
      ...prevState,
      renderExtraTimeIndicator
    }));
  }, []);

  const increaseLevel = useCallback(() => {
    setGameState((prevState: gameState) => ({
      ...prevState,
      level: prevState.level + 1
    }));
  }, []);

  const setCards = useCallback((cards: cardObj[]) => {
    setGameState((prevState: gameState) => ({
      ...prevState,
      cards
    }));
  }, []);

  const setCardProperty = useCallback((id: number, property: cardStateProperties, value: boolean) => {
    setGameState((prevState: gameState) => ({
      ...prevState,
      cards: prevState.cards.map((card: cardObj, i: number) => {
        if (i === id && card.state.has(property)) card.state.set(property, value);
        return card;
      })
    }));
  }, []);

  const setFlippedCards = useCallback((flippedCards: number[]) => {
    setGameState((prevState: gameState) => ({
      ...prevState,
      flippedCards
    }));
  }, []);

  const increaseMatchedPairCount = useCallback(() => {
    setGameState((prevState: gameState) => ({ 
      ...prevState, 
      matchedPairCount: prevState.matchedPairCount + 1 
    }));
  }, [])

  const handleCardMatch = useCallback((a: number, b: number) => {
    setGameState((prevState: gameState) => ({ 
      ...prevState, 
      cards: prevState.cards.map((card: cardObj, i: number) => {
        if (i === a || i === b) card.state.set('disabled', true);
        if (i === b) card.state.set('increaseMatchedPairCountAfterDisabled', true);
        return card;
      }) 
    }));
  }, []);

  const handleCardMisMatch = useCallback((a: number, b: number) => {
    setGameState((prevState: gameState) => ({ 
      ...prevState, 
      cards: prevState.cards.map((card: cardObj, i: number) => {
        if (i === a || i === b) card.state.set('flipped', false);
        return card;
      }) 
    }));
  }, []);

  const handleStageEnd = useCallback(() => {
    setGameState((prevState: gameState) => {
      let pairCount: number = prevState.pairCount + 1;
      let extraTime: number = prevState.pairCount * 4;

      setExtraTime(extraTime);

      return {
        ...prevState,
        pairCount,
        secs: prevState.secs + extraTime,
        matchedPairCount: 0
      }
    });

    setExtraTimeIndicator(true);
    increaseLevel();
  }, [setExtraTime, setExtraTimeIndicator, increaseLevel]);

  useEffect(() => {
    if (gameState.matchedPairCount === gameState.pairCount) {
      setGameState((prevState: gameState) => ({
        ...prevState,
        cards: prevState.cards.map((card: cardObj, i: number) => {
          if (i === 0) card.state.set('handleStageEndAfterFlippedBack', true);
          card.state.set('disabled', false);
          card.state.set('flipped', false);
          return card;
        })
      }));
    }
  }, [gameState.matchedPairCount, gameState.pairCount]);

  return (
    <div>
      <div className="game">
        <HUD 
          secs={gameState.secs}
          level={gameState.level}
          progress={100 / gameState.pairCount * gameState.matchedPairCount}
          extraTime={gameState.extraSecs}
          showExtraTimeIndicator={gameState.renderExtraTimeIndicator}
          setExtraTimeIndicator={setExtraTimeIndicator}
        />
        <div className="playground">
          { gameState.startTimer && <Timer setSeconds={decreaseSeconds} /> }
          { (gameState.state === 'start' || gameState.state === 'endgame') &&
            <Overlay 
              state={gameState.state}
              level={gameState.level}
              handleStart={startGame}
            />
          }
          { gameState.state === 'action' &&
            <Deck 
              pairCount={gameState.pairCount}
              cards={gameState.cards}
              flippedCards={gameState.flippedCards}
              increaseMatchedPairCount={increaseMatchedPairCount}
              setCards={setCards}
              setCardProperty={setCardProperty}
              setFlippedCards={setFlippedCards}
              handleCardMatch={handleCardMatch}
              handleCardMisMatch={handleCardMisMatch}
              handleStageEnd={handleStageEnd}
            /> 
          }
        </div>
      </div>
    </div>
  );
}

export default Game;
