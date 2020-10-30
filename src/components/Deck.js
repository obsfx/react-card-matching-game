import React, { useState, useEffect } from 'react';

import CardTypes from '../cards';

import Card from './Card';

const Deck = props => {
  const pairCount = props.cardAmount;

  let selectedCardTypes = [];

  for (let i = 0; i < pairCount; i++) {
    let selectedCardType = CardTypes[Math.floor(Math.random() * CardTypes.length)];
    selectedCardTypes.push(selectedCardType, selectedCardType);
  }

  let shuffle = arr => {
    let array = [].concat(arr);
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

  let [ cardPool, _ ] = useState(shuffle(selectedCardTypes));
  let [ flippedCards, setFlippedCards ] = useState([]);

  let cardFlipStateEvents = [];

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

  const registerCardFlipStateSetEvent = setFn => {
    cardFlipStateEvents.push(setFn);
  }

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
            registerCardFlipStateSetEvent={registerCardFlipStateSetEvent}
            pushToFlippedCards={ idx => setFlippedCards([ ...flippedCards, idx ])}
          />
        ))
      }
    </div>
  )
}

export default Deck;
