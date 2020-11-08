import React from 'react';

type overlayProps = {
  handleStart: () => void
}
const Overlay = (props: overlayProps) => {
  let { handleStart } = props;

  return (
    <div className="overlay">
      <div className="start-screen">
        <h2>Card Matching Game</h2>
        <p>Built with <strong>React</strong>.</p>
        <p><a href="github.com/obsfx/react-card-matching-game">github.com/obsfx/react-card-matching-game</a></p>
        <div className="start-button" onClick={handleStart}>Start</div>
      </div>
    </div>
  );
}

export default Overlay;
