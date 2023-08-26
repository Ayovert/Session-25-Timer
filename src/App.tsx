//Refactored by Chat GPT

import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { padNum } from './data';

import './style.scss';

const TIMER_INTERVAL = 1000;
const MAX_SESSION_LENGTH = 25;
const MIN_LENGTH = 1;

export default function App() {
  const [timerId, setTimerId] = useState(0);
  const [sessionLength, setSessionLength] = useState(MAX_SESSION_LENGTH);
  const [breakLength, setBreakLength] = useState(MIN_LENGTH);
  const [timeLeft, setTimeLeft] = useState({
    minutes: sessionLength,
    seconds: 0,
  });
  const [breakTime, setBreakTime] = useState({
    minutes: breakLength,
    seconds: 0,
  });
  const [isBreak, setIsBreak] = useState(false);



  const disableClick = timerId > 0? "none" : "auto";


  const resetTimer = () => {
    clearTimeout(timerId);
    setTimerId(0);
    setSessionLength(MAX_SESSION_LENGTH);
    setBreakLength(MIN_LENGTH);
    setTimeLeft({
        minutes: MAX_SESSION_LENGTH,
        seconds: 0,
    });
    setBreakTime({
      minutes: MIN_LENGTH,
      seconds: 0,
    });

    setIsBreak(false);
  }

  const updateTime = (type, newLength) => {
    if (type === 'break') {
      setBreakLength(newLength);
      setBreakTime({
        minutes: newLength,
        seconds: 0,
      });
    } else if (type === 'session') {
      setSessionLength(newLength);
      setTimeLeft({
        minutes: newLength,
        seconds: 0,
      });
    }
  };

  const adjustLength = (type, increment) => {
    const newLength = type === 'break' ? breakLength + increment : sessionLength + increment;
    if (newLength >= MIN_LENGTH && newLength <= MAX_SESSION_LENGTH) {
      updateTime(type, newLength);
    }
  };

  const sessionTimeLeft = () => {
    console.log(timerId, breakTime)
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

  const startTime = () => {
    setTimerId(setTimeout(() => {
      isBreak ? breakTimeOP() : sessionTimeLeft();
    }, TIMER_INTERVAL));
  };

  const pauseTimer = () => {
    clearTimeout(timerId);
    setTimerId(0);
  };

 

  useEffect(() => {
    if (timerId > 0) {
      startTime();
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [timeLeft, breakTime, sessionLength, breakLength]);

  
 
  return (
    <div className="container">
      <h1>Session 25 Timer</h1>
      <p>Click play to start the clock:)</p>
      <div id="lengthDiv">
        <div id="length-control">
          <div id="break-label">Break Length</div>
          <div id="break-length">
            <FontAwesomeIcon 
            style={{pointerEvents: disableClick} }
            icon={faArrowUp} onClick={() => adjustLength('break', 1)} 
            
            />
            {`    ${breakLength}    `}
            <FontAwesomeIcon 
            style={{pointerEvents: disableClick} }
            icon={faArrowDown} 
            onClick={() => adjustLength('break', -1)} />
          </div>
        </div>
        <div id="length-control">
          <div id="session-label">Session Length</div>
          <div id="break-length">
            <FontAwesomeIcon 
            style={{pointerEvents: disableClick} }
            icon={faArrowUp} 
            onClick={() => adjustLength('session', 1)} />
            {`    ${sessionLength}    `}
            <FontAwesomeIcon 
            style={{pointerEvents: disableClick} }
            icon={faArrowDown} onClick={() => adjustLength('session', -1)} />
          </div>
        </div>
      </div>
      <div id="session_div" >
        <div id="time-left">
          {padNum(isBreak ? breakTime.minutes : timeLeft.minutes)} : {padNum(isBreak ? breakTime.seconds : timeLeft.seconds)}
        </div>
      </div>

      <div id="timer-control"> 
      <div id="pause" onClick={pauseTimer}>Pause</div>
      <div id="play" onClick={startTime}>Play</div>
      <div id="reset" onClick={resetTimer}>Reset</div>
      </div>
      
    </div>
  );


  
}
