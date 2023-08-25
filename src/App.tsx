import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { padNum } from './data';

import './style.scss';

const downTimeX = 25 * 60 * 1000;
export default function App() {
  const [timerId, setTimerId] = useState(0);
  const [sessionLength, setSessionLength] = useState(1);
  const [timeLeft, setTimeLeft] = useState({
    minutes: sessionLength,
    seconds: 0,
  });

  const [breakLength, setBreakLength] = useState(1);
  const [breakTime, setBreakTime] = useState({
    minutes: breakLength,
    seconds: 0,
  });

  const [isBreak, setIsBreak] = useState(false);

  const sessionTimeLeft = () => {
    const downTime = timeLeft.minutes + timeLeft.seconds / 60;

    const diff = downTime * 60 - 1;

    let minutes = Math.floor((diff / 60) % 60);
    let seconds = Math.floor(diff % 60);

    setTimeLeft({
      minutes: minutes,
      seconds: seconds,
    });

    if (diff < 1) {
      setIsBreak(true);
      setTimeLeft({
        minutes: sessionLength,
        seconds: 0,
      });
    }
  };
  const breakTimeOP = () => {
    const downTime = breakTime.minutes + breakTime.seconds / 60;
    const diff = downTime * 60 - 1;

    let minutes = Math.floor((diff / 60) % 60);
    let seconds = Math.floor(diff % 60);

    setBreakTime({
      minutes: minutes,
      seconds: seconds,
    });


    if (diff < 1) {
      setIsBreak(false);
      setBreakTime({
        minutes: breakLength,
        seconds: 0,
      });
    }
  };

  function startTime() {
    setTimerId(
      setTimeout(() => {
        isBreak ? breakTimeOP() : sessionTimeLeft();
      }, 1000)
    );
  }

  function stopTimer() {
    clearTimeout(timerId);
    setTimerId(0);
  }

 

  useEffect(() => {
    if (timerId > 0) {
      startTime();
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [timeLeft,breakTime]);

  // console.log(timeLeft);

  return (
    <div className="container">
      <h1>Session 25 Timer</h1>
      <p>Click play to start the clock:)</p>

<div id="lengthDiv">

<div id="length-control">
    <div id="break-label">
          Break Length
        </div>

        <div id="break-length">
        <FontAwesomeIcon icon={faArrowUp} /> {`    ${breakLength}    `} <FontAwesomeIcon icon={faArrowDown} />
        </div>
    </div>
    <div id="length-control">
    <div id="session-label">
          Session Length
        </div>
        <div id="break-length">
        <FontAwesomeIcon icon={faArrowUp} /> {`    ${sessionLength}    `} <FontAwesomeIcon icon={faArrowDown} />
        </div>
      </div>
</div>
    

        
    
      <div id="session_div" onClick={() => startTime()}>
        <div id="time-left" >
          {padNum(breakTime.minutes)} :{padNum(breakTime.seconds)}
        </div>

        <div id="time-left" >
          {padNum(timeLeft.minutes)} :{padNum(timeLeft.seconds)}
        </div>
      </div>

      <div id="stop" onClick={() => stopTimer()}>
        STOP
      </div>
    </div>
  );
}

/*
   
   
   <audio id="beep" preload="auto" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
   */
