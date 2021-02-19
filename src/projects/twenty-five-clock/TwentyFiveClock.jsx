import React, { useState, useEffect, useRef } from 'react';
import Timer from './components/Timer';

const TwentyFiveClock = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timer, setTimer] = useState(sessionLength * 60);
  const [isRun, setIsRun] = useState(false);
  const [timeInterval, setTimeInterval] = useState(null);
  const [breakOrSession, setBreakOrSession] = useState('session');

  const audioRef = useRef(null);

  const handleBreakInc = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };
  const handleBreakDec = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };
  const handleSessionInc = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
    }
  };
  const handleSessionDec = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
    }
  };

  const handleReset = () => {
    setBreakOrSession('session');
    setIsRun(false);
    setBreakLength(5);
    setSessionLength(25);
    setTimer(sessionLength * 60);
    clearInterval(timeInterval);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  const handleStartStop = () => {
    if (!isRun) {
      setIsRun(true);
      setTimeInterval(
        setInterval(() => {
          setTimer((timer) => timer - 1);
        }, 1000),
      );
    } else {
      setIsRun(false);
      clearInterval(timeInterval);
    }
  };

  const breakStarter = () => {
    setTimer(breakLength * 60);
    setBreakOrSession('break');
  };

  const sessionStarter = () => {
    setBreakOrSession('session');
    setTimer(sessionLength * 60);
  };

  useEffect(() => {
    setTimer(sessionLength * 60);
  }, [sessionLength]);

  useEffect(() => {
    if (timer < 1) {
      if (breakOrSession === 'session') {
        breakStarter();
        audioRef.current.play();
      } else {
        sessionStarter();
        audioRef.current.play();
      }
    }
  }, [timer]);

  return (
    <div className="content">
      <audio
        id="beep"
        ref={audioRef}
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
      <div className="clock-container">
        <div className="left-col">
          <div id="break-label">Break length</div>
          <div className="ctrl-panel">
            <button
              id="break-decrement"
              className="btn ctrl-btn"
              disabled={isRun}
              onClick={handleBreakDec}>
              <span class="material-icons" style={{ fontSize: '36px' }}>
                arrow_circle_down
              </span>
            </button>
            <div id="break-length">{breakLength}</div>
            <button
              id="break-increment"
              className="btn ctrl-btn"
              disabled={isRun}
              onClick={handleBreakInc}>
              {' '}
              <span class="material-icons" style={{ fontSize: '36px' }}>
                arrow_circle_up
              </span>
            </button>
          </div>
        </div>
        <div className="right-col">
          <div id="session-label">Session-length</div>
          <div className="ctrl-panel">
            <button
              id="session-decrement"
              className="btn ctrl-btn"
              disabled={isRun}
              onClick={handleSessionDec}>
              {' '}
              <span class="material-icons" style={{ fontSize: '36px' }}>
                arrow_circle_down
              </span>
            </button>
            <div id="session-length">{sessionLength}</div>
            <button
              id="session-increment"
              className="btn ctrl-btn"
              disabled={isRun}
              onClick={handleSessionInc}>
              <span class="material-icons" style={{ fontSize: '36px' }}>
                arrow_circle_up
              </span>
            </button>
          </div>
        </div>

        <div className="bottom">
          <div className="session" style={{ display: 'block' }}>
            <div id="timer-label" style={{ display: 'block' }}>
              {`${breakOrSession === 'session' ? 'Session' : 'Break'}`}
            </div>
            <Timer isBreak={breakOrSession} time={timer} />
          </div>
          <div>
            <button id="start_stop" className="btn btn-start" onClick={handleStartStop}>
              <span class="material-icons" style={{ fontSize: '36px' }}>
                not_started
              </span>
            </button>
            <button id="reset" className="btn btn-reset" onClick={handleReset}>
              <span class="material-icons" style={{ fontSize: '36px' }}>
                replay
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwentyFiveClock;
