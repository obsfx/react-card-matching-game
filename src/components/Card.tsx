import React, 
  { 
    useState, 
    useEffect,
    TransitionEvent
  } from 'react';

type cardProps = {
  idx: number,
  cardType: string,
  isShown: boolean,
  isFlipped: boolean,
  registerCardFlipStateSetEvent: Function,
  pushToFlippedCards: Function
}

const Card = (props: cardProps) => {
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
  }, [registerCardFlipStateSetEvent]);

  if (!isShown) return null;

  const handleClick = () => {
    if (isFlipped) return;
    setFlipState(true);
  }

  const handleTransitionEnd = (e: TransitionEvent) => {
    if (e.nativeEvent.propertyName === 'transform') {
      pushToFlippedCards(idx)
    }
  }

  return (
    <div 
      className="card-container" 
      onClick={ handleClick } >
      <div 
        id="card" 
        className={ `card ${!flipState ? 'back-flipped' : ''}` } 
        onTransitionEnd={ handleTransitionEnd }>
        <div className={ `card-face card-front ${cardType}` }></div>
        <div className="card-face card-back"></div>
      </div>
    </div>
  )
}

export default Card;
