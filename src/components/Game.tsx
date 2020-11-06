import React, { useState, useEffect, useCallback } from 'react';
import { cardObj, cardStateProperties } from './Card';
import Deck from './Deck';
import HUD from './HUD';

export type gameState = {
  renderCards: boolean,
  pairCount: number,
  matchedPairCount: number,
  cards: cardObj[],
  flippedCards: number[]
}

const Game = () => {
  console.log('App: Render');

  const [ gameState, setGameState ] = useState<gameState>({
    renderCards: true,
    pairCount: 3,
    matchedPairCount: 0,
    cards: [],
    flippedCards: []
  });

  const setRenderStatus = useCallback((renderCards: boolean) => {
    setGameState((prevState: gameState) => ({
      ...prevState,
      renderCards
    }));
  }, [])

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
    setGameState((prevState: gameState) => ({ 
      ...prevState,
      pairCount: prevState.pairCount + 1,
      matchedPairCount: 0
    }));
  }, []);

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
      <div className="playground">
        <HUD 
          time={'00:30'}
          progress={ 100 / gameState.pairCount * gameState.matchedPairCount }
        />
        <Deck 
          pairCount={gameState.pairCount}
          renderCards={gameState.renderCards}
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
        />
      </div>
    </div>
  );
}

export default Game;
