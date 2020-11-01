import React, 
  { 
    useState, 
    useImperativeHandle,
    forwardRef,
    TransitionEvent,
  } from 'react';

type cardProps = {
  idx: number,
  cardType: string,
  isFlipped: boolean,
  pushToFlippedCards: Function
}

export type cardRef = {
  setFlipState: Function
}

const Card = forwardRef<cardRef, cardProps>((props, ref) => {
  console.log('Card: Render');
  let { 
    idx,
    cardType, 
    isFlipped,
    pushToFlippedCards
  } = props;

  let [ flipState, setFlipState ] = useState(isFlipped);

  useImperativeHandle(ref, () => {
    return {
      setFlipState,
    }
  });

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
      onClick={handleClick}>
      <div 
        id="card" 
        className={`card ${!flipState ? 'back-flipped' : ''}`} 
        onTransitionEnd={handleTransitionEnd}>
        <div className={`card-face card-front ${cardType}`}></div>
        <div className="card-face card-back"></div>
      </div>
    </div>
  )
});


export default Card;
