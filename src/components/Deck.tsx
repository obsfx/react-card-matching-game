import React, { useState, useEffect } from 'react';

import CardTypes from '../cardTypes';

import Card from './Card';

type deckProps = {
  cardAmount: number
}

const Deck = (props: deckProps) => {
  const pairCount = props.cardAmount;

  let selectedCardTypes = [];

  for (let i = 0; i < pairCount; i++) {
    let selectedCardType = CardTypes[Math.floor(Math.random() * CardTypes.length)];
    selectedCardTypes.push(selectedCardType, selectedCardType);
  }

  let shuffle = (arr: string[]) => {
    let emptyArr: string[] = [];
    let array: string[] = emptyArr.concat(arr);
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  let cardPool = useState(shuffle(selectedCardTypes))[0];
  let [ flippedCards, setFlippedCards ] = useState<number[]>([]);

  let cardFlipStateEvents: Function[] = [];

  useEffect(() => {
    console.log(flippedCards);
    if (flippedCards.length == 2) {
      let [ a, b ] = flippedCards;

      if (cardPool[a] === cardPool[b]) {
        alert('BRUH');
      } else {
        cardFlipStateEvents[a](false);
        cardFlipStateEvents[b](false);
      }

      setFlippedCards([]);
    }
  }, [flippedCards]);

  return(
    <div className="deck">
      {
        cardPool.map((e, i) => (
          <Card 
            key={i}
            idx={i}
            cardType={e}
            isShown={true}
            isFlipped={false}
            registerCardFlipStateSetEvent={ (setFn: Function) => cardFlipStateEvents.push(setFn) }
            pushToFlippedCards={ (idx: number) => setFlippedCards([ ...flippedCards, idx ])}
          />
        ))
      }
    </div>
  )
}

export default Deck;
