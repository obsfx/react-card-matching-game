import React, { TransitionEvent } from 'react';

type cardProps = {
  id: number,
  width: number,
  cardType: string,
  flipped: boolean,
  disabled: boolean,
  showCardType: boolean,
  increaseMatchedPairCountAfterDisabled: boolean,
  handleStageEndAfterFlippedBack: boolean,
  setCardProperty: (i: number, property: cardStateProperties, value: boolean) => void,
  handleFlipEnd: (isDisabled: boolean, isFlipped: boolean, handleStageEndAfterFlippedBack: boolean) => void,
  handleDisableEnd: (increaseMatchedPairCountAfterDisabled: boolean) => void
}

export type cardStateProperties = 'type' |
  'flipped' |
  'disabled' |
  'showCardType' |
  'increaseMatchedPairCountAfterDisabled' |
  'handleStageEndAfterFlippedBack';

export type cardObj = {
  type: string,
  state: Map<cardStateProperties, boolean>
}

const Card = (props: cardProps) => {
  let { 
    id,
    width,
    cardType, 
    flipped,
    disabled,
    showCardType,
    increaseMatchedPairCountAfterDisabled,
    handleStageEndAfterFlippedBack,
    setCardProperty,
    handleFlipEnd,
    handleDisableEnd
  } = props;

  const handleClick = () => {
    if (flipped || disabled) return;
    setCardProperty(id, 'flipped', true);
    setCardProperty(id, 'showCardType', true);
  }

  const handleDisableTransitionEnd = (e: TransitionEvent) => {
    if (e.propertyName === 'transform' && e.currentTarget === e.target && e.currentTarget.classList.contains('card-disabled')) {
      handleDisableEnd(increaseMatchedPairCountAfterDisabled);
    }
  }

  const handleFlipTransitionEnd = (e: TransitionEvent) => {
    if (e.propertyName === 'transform' && e.currentTarget === e.target) {
      handleFlipEnd(disabled, flipped, handleStageEndAfterFlippedBack);

      if (!flipped) {
        setCardProperty(id, 'showCardType', false);
      }
    }
  }

  return (
    <div 
      className={`card-container ${disabled ? 'card-disabled' : ''}`} 
      style={{ width, height: width * 1.422}}
      onClick={handleClick}
      onTransitionEnd={handleDisableTransitionEnd}>
      <div 
        className={`card ${!flipped ? 'back-flipped' : ''} flip-transition`}
        onTransitionEnd={handleFlipTransitionEnd}>
        <div className={`card-face card-front ${showCardType ? cardType : ''} ${disabled ? 'card-face-disabled' : ''}`}></div>
        <div className={`card-face card-back`}></div>
      </div>
    </div>
  )
};

export default Card;
