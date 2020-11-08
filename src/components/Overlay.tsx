import React from 'react';

type overlayProps = {
  state: 'start' | 'endgame',
  level: number,
  handleStart: () => void
}
const Overlay = (props: overlayProps) => {
  const { 
    state,
    level,
    handleStart 
  } = props;

  return (
    <div className="overlay">
      <div className="overlay-wrapper">
        { state === 'start' && 
          <>
            <h2>Card Matching Game</h2>
            <p>Built with <strong>React</strong>.</p>
            <p><a href="https://github.com/obsfx/react-card-matching-game">github.com/obsfx/react-card-matching-game</a></p>
            <div className="start-button" onClick={handleStart}>Start</div>
          </>
        }
        { state === 'endgame' && 
          <>
            <h2>Time's Up!</h2>
            <p>Level you reached <strong>{level}</strong></p>
            <div className="start-button" onClick={handleStart}>Play Again</div>
          </>
        }
      </div>
    </div>
  );
}

export default Overlay;
