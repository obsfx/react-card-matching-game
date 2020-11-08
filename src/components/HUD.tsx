import React from 'react';

type hudProps = {
  secs: number,
  progress: number,
  level: number,
  extraTime: number,
  showExtraTimeIndicator: boolean,
  setExtraTimeIndicator: (renderExtraTimeIndicator: boolean) => void
}

const HUD = (props: hudProps) => {
  let {
    secs,
    progress,
    level,
    extraTime,
    showExtraTimeIndicator,
    setExtraTimeIndicator
  } = props;

  return (
    <div className="hud">
      <div className="timer">
        { 
          showExtraTimeIndicator && 
          <div 
          className="extra-time" 
          onAnimationEnd={() => setExtraTimeIndicator(false)}>
            +{ Math.floor(extraTime / 60) }
            : 
            { extraTime % 60 < 10 ? `0${extraTime % 60}` : extraTime % 60 }
          </div> 
        }
        { Math.floor(secs / 60) }
        :
        { secs % 60 < 10 ? `0${secs % 60}` : secs % 60 }
      </div>

      <div className="progress-bar">
        <div className="level-indicator">
          Level <span className="level-number">{level}</span>
        </div>
        <div className="bar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  )
}

export default HUD;
