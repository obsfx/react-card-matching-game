import React, { useEffect } from 'react';
import { cardType, cardTypes } from '../card-types';
import { deckWidth, cardWidth } from '../constants';
import { shuffle } from '../utils';
import Card, { cardObj, cardStateProperties } from './Card';

type deckProps = {
  pairCount: number,
  renderCards: boolean,
  cards: cardObj[],
  flippedCards: number[],
  increaseMatchedPairCount: () => void,
  setRenderStatus: (renderCards: boolean) => void,
  setCards: (cards: cardObj[]) => void,
  setCardProperty: (id: number, property: cardStateProperties, value: boolean) => void,
  setFlippedCards: (flippedCards: number[]) => void,
  handleCardMatch: (a: number, b: number) => void,
  handleCardMisMatch: (a: number, b: number) => void,
  handleStageEnd: () => void
}

const Deck = (props: deckProps) => {
  let { 
    pairCount,
    renderCards,
    cards,
    flippedCards,
    increaseMatchedPairCount,
    setRenderStatus,
    setCards,
    setCardProperty,
    setFlippedCards,
    handleCardMatch,
    handleCardMisMatch,
    handleStageEnd
  } = props;

  const handleFlipEnd = (i: number, isDisabled: boolean, isFlipped: boolean, handleStageEndAfterFlippedBack: boolean) => {
    if (!isDisabled && isFlipped) {
      setCardProperty(i, 'flipped', true);
      setFlippedCards(flippedCards.concat(i));
    }

    if (handleStageEndAfterFlippedBack && !isFlipped) {
      setCardProperty(i, 'handleStageEndAfterFlippedBack', false);
      handleStageEnd();
    }
  }

  const handleDisableEnd = (i: number, increaseMatchedPairCountAfterDisabled: boolean) => {
    if (increaseMatchedPairCountAfterDisabled) {
      setCardProperty(i, 'increaseMatchedPairCountAfterDisabled', false);
      increaseMatchedPairCount();
    }
  }

  useEffect(() => {
    const createCardObj = (type: cardType): cardObj => {
      let card: cardObj = {
        type,
        state: new Map<cardStateProperties, boolean>()
      }

      card.state.set('flipped', false);
      card.state.set('disabled', false);
      card.state.set('showCardType', false);
      card.state.set('increaseMatchedPairCountAfterDisabled', false);
      card.state.set('handleStageEndAfterFlippedBack', false);

      return card;
    }

    let cardsBuffer: cardObj[] = [];

    for (let i = 0; i < pairCount; i++) {
      let selectedCardType: cardType = cardTypes[Math.floor(Math.random() * cardTypes.length)];
      cardsBuffer.push(createCardObj(selectedCardType), createCardObj(selectedCardType));
    }

    setCards(shuffle(cardsBuffer));
    setRenderStatus(true);
  }, [pairCount, setCards, setRenderStatus]);

  useEffect(() => {
    while (flippedCards.length - 1 > 0) {
      let a: number | undefined = flippedCards.shift();
      let b: number | undefined = flippedCards.shift();

      if (a !== undefined && b !== undefined) {
        if (cards[a].type === cards[b].type) {
          handleCardMatch(a, b);
        } else {
          handleCardMisMatch(a, b);
        }
      }

      setFlippedCards(flippedCards);
    }
  }, [flippedCards, cards, handleCardMatch, handleCardMisMatch, setFlippedCards]);

  return(
    <div className="deck" 
      style={{ width: deckWidth }}>
      <div className="deck-wrapper">
        {
          renderCards &&
          cards.map((card: cardObj, i: number) => (
            <Card 
              key={i}
              id={i}
              width={cardWidth}
              cardType={card.type}
              flipped={card.state.get('flipped') || false}
              disabled={card.state.get('disabled') || false}
              showCardType={card.state.get('showCardType') || false}
              increaseMatchedPairCountAfterDisabled={card.state.get('increaseMatchedPairCountAfterDisabled') || false}
              handleStageEndAfterFlippedBack={card.state.get('handleStageEndAfterFlippedBack') || false}
              setCardProperty={setCardProperty}
              handleFlipEnd={(isDisabled: boolean, isFlipped: boolean, handleStageEndAfterFlippedBack: boolean) => handleFlipEnd(i, isDisabled, isFlipped, handleStageEndAfterFlippedBack)}
              handleDisableEnd={(increaseMatchedPairCountAfterDisabled: boolean) => handleDisableEnd(i, increaseMatchedPairCountAfterDisabled)}
            />
          ))
        }
      </div>
    </div>
  )
}

export default Deck;
