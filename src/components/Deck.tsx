import React, 
{ 
  useState, 
  useEffect,
  useRef,
  MutableRefObject
} from 'react';

import CardTypes from '../cardTypes';

import Card, { cardRef } from './Card';

type deckProps = {
  cardAmount: number
}

const Deck = (props: deckProps) => {
  // TODO: 2 WAY
  // [x] 1- useRef 
  // 2- useCallback, useMemo, Memo API
  console.log('Deck: Render');
  let pairCount: number = props.cardAmount;

  let cardRefs: MutableRefObject<cardRef[]> = useRef([]);

  let [ cardTypes, setCardTypes ] = useState<string[]>([]);
  let [ flippedCards, setFlippedCards ] = useState<number[]>([]);

  useEffect(() => {
    console.log('init effect fired');
    let cardTypesBuffer: string[] = [];

    for (let i = 0; i < pairCount; i++) {
      let selectedCardType: string = CardTypes[Math.floor(Math.random() * CardTypes.length)];
      cardTypesBuffer.push(selectedCardType, selectedCardType);
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

    cardRefs.current = new Array(cardTypesBuffer.length);
    setCardTypes(shuffle(cardTypesBuffer));
  }, [pairCount]);

  useEffect(() => {
    console.log('flipped cards effect fired');
    if (flippedCards.length === 2) {
      let [ a, b ] = flippedCards;

      if (cardTypes[a] === cardTypes[b]) {
        alert('BRUH');
      } else {
        cardRefs.current[a].setFlipState(false);
        cardRefs.current[b].setFlipState(false);
      }

      setFlippedCards([]);
    }
  }, [flippedCards, cardTypes]);

  return(
    <div className="deck">
      {
        cardTypes.map((cardType: string, i: number) => (
          <Card 
            ref={(ref: cardRef) => cardRefs.current[i] = ref}
            key={i}
            idx={i}
            cardType={cardType}
            isFlipped={false}
            pushToFlippedCards={(idx: number) => setFlippedCards(flippedCards.concat(idx))}
          />
        ))
      }
    </div>
  )
}

export default Deck;
