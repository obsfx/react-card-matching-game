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
  pushToFlippedCards: Function
}

export type cardRef = {
  setFlipState: Function,
  setDisabled: Function
}

const Card = forwardRef<cardRef, cardProps>((props, ref) => {
  //console.log('Card: Render');
  let { 
    idx,
    cardType, 
    pushToFlippedCards
  } = props;

  let [ flipState, setFlipState ] = useState(false);
  let [ disabled, setDisabled ] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      setFlipState,
      setDisabled
    }
  });

  const handleClick = () => {
    if (flipState || disabled) return;
    setFlipState(true);
  }

  const handleTransitionEnd = (e: TransitionEvent) => {
    if (!disabled && flipState && e.nativeEvent.propertyName === 'transform') {
      pushToFlippedCards(idx)
    }
  }

  return (
    <div 
      className={`card-container ${disabled ? 'card-disabled' : ''}`} 
      onClick={handleClick}>
      <div 
        id="card" 
        className={`card ${!flipState ? 'back-flipped' : ''}`} 
        onTransitionEnd={handleTransitionEnd}>
        <div className={`card-face card-front ${cardType} ${disabled ? 'card-face-disabled' : ''}`}></div>
        <div className={`card-face card-back`}></div>
      </div>
    </div>
  )
});


export default Card;
