import React, 
{ 
  useState, 
  useEffect,
  MutableRefObject,
} from 'react';

import { cardTypes, state, deckWidth, cardWidth } from '../constants';
import Card, { cardRef } from './Card';

type deckProps = {
  cardRefs: MutableRefObject<cardRef[]>,
  pairCount: number,
  gameState: state,
  handleCardMatch: Function,
  handleCardMisMatch: Function,
  handleStageEnd: Function
}

const Deck = (props: deckProps) => {
  let { 
    cardRefs,
    pairCount,
    gameState,
    handleCardMatch,
    handleCardMisMatch,
    handleStageEnd
  } = props;

  let [ renderCards, setRenderCards ] = useState<boolean>(false);
  let [ cardPool, setCardPool ] = useState<string[]>([]);
  let [ flippedCards, setFlippedCards ] = useState<number[]>([]);

  const handleTransformEnd = (i: number, isDisabled: boolean, isFlipped: boolean) => {
    if (!isDisabled && isFlipped) {
      setFlippedCards(flippedCards.concat(i));
    }

    if (i === 0 && gameState === state.stageSwitching && !isFlipped) {
      handleStageEnd();
    }
  }

  useEffect(() => {
    let cardPoolBuffer: string[] = [];

    for (let i = 0; i < pairCount; i++) {
      let selectedCardType: string = cardTypes[Math.floor(Math.random() * cardTypes.length)];
      cardPoolBuffer.push(selectedCardType, selectedCardType);
    }

    let shuffle = (arr: string[]) => {
      let emptyArr: string[] = [];
      let array: string[] = emptyArr.concat(arr);
      let currentIndex = array.length;
      let temporaryValue;
      let randomIndex;

      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }

    cardRefs.current = new Array(cardPoolBuffer.length);

    setCardPool(shuffle(cardPoolBuffer));
    setRenderCards(true);
  }, [pairCount, cardRefs]);

  useEffect(() => {
    while (flippedCards.length - 1 > 0) {
      let a: number | undefined = flippedCards.shift();
      let b: number | undefined = flippedCards.shift();

      if (a !== undefined && b !== undefined) {
        if (cardPool[a] === cardPool[b]) {
          handleCardMatch(a, b);
        } else {
          handleCardMisMatch(a, b);
        }
      }

      setFlippedCards(flippedCards);
    }
  }, [flippedCards, cardPool, handleCardMatch, handleCardMisMatch]);

  return(
    <div className="deck" 
      style={{ width: deckWidth }}>
      <div className="deck-wrapper">
        {
          renderCards &&
          cardPool.map((cardType: string, i: number) => (
            <Card 
              ref={(ref: cardRef) => cardRefs.current[i] = ref}
              key={i}
              width={cardWidth}
              cardType={cardType}
              handleTransformEnd={(isDisabled: boolean, isFlipped: boolean) => handleTransformEnd(i, isDisabled, isFlipped)}
            />
          ))
        }
      </div>
    </div>
  )
}

export default Deck;
