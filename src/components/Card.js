import React, { useState, useEffect } from 'react';

const Card = props => {
  let { 
    idx,
    cardType, 
    isShown, 
    isFlipped,
    registerCardFlipStateSetEvent,
    pushToFlippedCards
  } = props;

  let [ flipState, setFlipState ] = useState(isFlipped);

  useEffect(() => {
    registerCardFlipStateSetEvent(setFlipState);
  });

  if (!isShown) return null;

  const handleClick = () => {
    if (isFlipped) return;
    setFlipState(true);
  }

  return (
    <div className="card-container" onClick={ handleClick } >
      <div id="card" className={ `card ${!flipState ? 'back-flipped' : ''}` } 
        onTransitionEnd={(e) => {
          if (e.target.id == 'card') {
            pushToFlippedCards(idx)
          }
      }}>
        <div className={ `card-face card-front ${cardType}` }></div>
        <div className="card-face card-back"></div>
      </div>
    </div>
  )
}

export default Card;
