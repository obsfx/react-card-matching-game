import { useEffect } from 'react';

type timerProps = {
  setSeconds: () => void
}

const Timer = (props: timerProps) => {
  const { setSeconds } = props;

  useEffect(() => {
    const interval: NodeJS.Timeout = setInterval(() => setSeconds(), 1000);
    return () => clearInterval(interval);
  }, [setSeconds]);

  return null;
}

export default Timer;
