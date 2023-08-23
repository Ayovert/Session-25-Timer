import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import './style.scss';

const downTimeX = (25*60*1000);
export default function App() {
  const [timerId, setTimerId] = useState(0);
  const [downTime, setDownTime] = useState(downTimeX);


  const [timeLeft, setTimeLeft] = useState({
    minutes: 25,
    seconds: 0
  });

  const calculateTimeLeft = () => {
    const now = 1000;
    const diff = downTime - 1000;

    //console.log((diff % (1000 * 60 * 60)) / (1000 * 60))

   /*let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
   let seconds = Math.floor((diff%(1000*60)) / 1000);*/

   let minutes = Math.floor((diff / 1000 / 60) % 60);
   let seconds = Math.floor((diff / 1000) % 60);
   
   let downTimeY = ((minutes + (seconds/60)) * 60 * 1000);


    setTimeLeft({
      minutes: minutes,
      seconds: seconds
    });

    setDownTime(downTimeY);
  };

  function startTime(){
    setTimerId(setTimeout(() => {
      calculateTimeLeft();
    }, 1000));
  }


  function stopTimer(){
    
    clearTimeout(timerId);
    setTimerId(0);
    calculateTimeLeft();
    
  }
  useEffect(() => {
    let timer: any;
    if (timerId > 0) {
      setTimerId(setTimeout(() => {
        calculateTimeLeft();
      }, 1000));
    }

   // console.log(timer);


    return () => {
      clearTimeout(timerId);
    };
  }, [timeLeft]);

  // console.log(timeLeft);
//console.log(((23*60*1000) % (1000 * 60 * 60)) / (1000 * 60))

//console.log(downTime);
  return (
    <div className="container">
      <h1>Session 25 Timer</h1>
      <p>Click play to start the clock:)</p>

      <div id="time-left" onClick={() => startTime()}>
        {timeLeft.minutes} : {timeLeft.seconds}
      </div>


      <div id="stop" onClick={() => stopTimer()}>
        STOP
      </div>
    </div>
  );
}
