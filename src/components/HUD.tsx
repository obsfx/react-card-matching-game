import React, { useState } from 'react';

type hudProps = {
  time: string,
}

const HUD = (props: hudProps) => {
  let {
    time,
  } = props;

  let [ progress, setProgress ] = useState(0);

  return (
    <div className="hud">
      <div className="timer">
        {time}
      </div>

      <div className="progress-bar">
        <div className="bar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="info">
        a card matching game built with react. <br />
        source: <a href="https://github.com/obsfx/react-card-matching-game">github.com/obsfx/react-card-matching-game</a>
      </div>
    </div>
  )
}

export default HUD;
