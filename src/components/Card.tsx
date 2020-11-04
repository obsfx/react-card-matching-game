import React, 
{ 
  useState, 
  useImperativeHandle,
  forwardRef,
  TransitionEvent,
} from 'react';

type cardProps = {
  width: number,
  cardType: string,
  handleTransformEnd: Function
}

export type cardRef = {
  setFlipState: Function,
  setDisabled: Function
}

const Card = forwardRef<cardRef, cardProps>((props, ref) => {
  //console.log('Card: Render');
  let { 
    width,
    cardType, 
    handleTransformEnd
  } = props;

  let [ flipState, setFlipState ] = useState<boolean>(false);
  let [ cardTypeVisible, setCardTypeVisible ] = useState<boolean>(false);
  let [ disabled, setDisabled ] = useState<boolean>(false);

  useImperativeHandle(ref, () => {
    return {
      setFlipState,
      setDisabled
    }
  });

  const handleClick = () => {
    if (flipState || disabled) return;
    setFlipState(true);
    setCardTypeVisible(true);
  }

  const handleTransitionEnd = (e: TransitionEvent) => {
    if (e.nativeEvent.propertyName === 'transform') {
      handleTransformEnd(disabled, flipState);

      if (!flipState) {
        setCardTypeVisible(false);
      }
    }
  }

  return (
    <div 
      className={`card-container ${disabled ? 'card-disabled' : ''}`} 
      style={{ width, height: width * 1.422}}
      onClick={handleClick}>
      <div 
      className={`card ${!flipState ? 'back-flipped' : ''} flip-transition`} 
        onTransitionEnd={handleTransitionEnd}>
        <div className={`card-face card-front ${cardTypeVisible ? cardType : ''} ${disabled ? 'card-face-disabled' : ''}`}></div>
        <div className={`card-face card-back`}></div>
      </div>
    </div>
  )
});


export default Card;
