import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import './style.scss';

const downTime = +new Date().getTime() + 25 * 60 * 1000;
export default function App() {
  // const [currentTime, setCurrentTime] = useState();

  const [timeLeft, setTimeLeft] = useState({
    minutes: new Date().getMinutes(),
    seconds: new Date().getSeconds(),
  });

  const calculateTimeLeft = () => {
    const currentTime = +new Date().getTime();
    const diff = downTime - currentTime;

    //60 - +(new Date().getSeconds() ===0 ? 60 :new Date().getSeconds())
    setTimeLeft({
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
    });
  };

  useEffect(() => {
    let timer: any;
    if (timeLeft.seconds > 0) {
      timer = setTimeout(() => {
        calculateTimeLeft();
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [timeLeft]);

  // console.log(timeLeft);
  return (
    <div className="container">
      <h1>Session 25 Timer</h1>
      <p>Click play to start the clock:)</p>

      <div id="time-left" onClick={() => calculateTimeLeft()}>
        {timeLeft.minutes} : {timeLeft.seconds}
      </div>
    </div>
  );
}
