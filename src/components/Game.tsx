import React, { useState, useEffect, useCallback } from 'react';
import { cardObj, cardStateProperties } from './Card';
import Deck from './Deck';
import Overlay from './Overlay';
import HUD from './HUD';
import Timer from './Timer';

export type gameState = {
  renderCards: boolean,
  renderExtraTimeIndicator: boolean,
  startTimer: boolean,
  pairCount: number,
  matchedPairCount: number,
  secs: number,
  extraSecs: number,
  cards: cardObj[],
  flippedCards: number[]
}

const Game = () => {
  console.log('App: Render');

  const [ gameState, setGameState ] = useState<gameState>({
    renderCards: false,
    renderExtraTimeIndicator: false,
    startTimer: false,
    pairCount: 3,
    matchedPairCount: 0,
    secs: 60,
    extraSecs: 0,
    cards: [],
    flippedCards: []
  });

  const startGame = () => {
    setRenderStatus(true);
    setTimerStatus(true);
  }

  const setRenderStatus = useCallback((renderCards: boolean) => {
    setGameState((prevState: gameState) => ({
      ...prevState,
      renderCards
    }));
  }, [])

  const setTimerStatus = useCallback((startTimer: boolean) => {
    setGameState((prevState: gameState) => ({
      ...prevState,
     startTimer 
    }));
  }, [])

  const decreaseSeconds = useCallback(() => {
    setGameState((prevState: gameState) => ({
      ...prevState,
      secs: prevState.secs - 1
    }));
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
  }, [setExtraTime, setExtraTimeIndicator]);

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
          progress={100 / gameState.pairCount * gameState.matchedPairCount}
          extraTime={gameState.extraSecs}
          showExtraTimeIndicator={gameState.renderExtraTimeIndicator}
          setExtraTimeIndicator={setExtraTimeIndicator}
        />
        <div className="playground">
          { gameState.startTimer && <Timer setSeconds={decreaseSeconds} /> }
          { gameState.renderCards ?
            <Deck 
              pairCount={gameState.pairCount}
              cards={gameState.cards}
              flippedCards={gameState.flippedCards}
              increaseMatchedPairCount={increaseMatchedPairCount}
              setRenderStatus={setRenderStatus}
              setCards={setCards}
              setCardProperty={setCardProperty}
              setFlippedCards={setFlippedCards}
              handleCardMatch={handleCardMatch}
              handleCardMisMatch={handleCardMisMatch}
              handleStageEnd={handleStageEnd}
            /> :
            <Overlay 
              handleStart={startGame}
            />
          }
        </div>
      </div>
    </div>
  );
}

export default Game;
