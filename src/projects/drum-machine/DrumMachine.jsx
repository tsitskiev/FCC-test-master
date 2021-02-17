import React, { useCallback, useState, useEffect } from 'react';
import { DrumBtn, Toggler, Range } from './components';

const { bankOne, bankTwo } = require('./pads.json');

const DrumMachine = () => {
  const [power, setPower] = useState(true);
  const [volume, setVolume] = useState(0.1);
  const [activeBank, setActiveBank] = useState(bankOne);
  const [displayText, setDisplayText] = useState('');

  const clearDisplay = () => {
    setTimeout(() => {
      setDisplayText('');
    }, 2000);
  };

  const toggleVolume = useCallback(
    (e) => {
      setVolume(e.target.value);
      setDisplayText(`Volume: ${Math.floor(volume * 100)}`);
      clearDisplay();
    },
    [volume],
  );

  const togglePower = useCallback(() => {
    setPower(!power);
    setDisplayText(`Power: ${power ? 'Off' : 'On'}`);
    clearDisplay();
    if (power) {
      document.querySelectorAll('.drum-pad').forEach((pad) => {
        pad.className += ' disabled';
      });
    } else {
      document.querySelectorAll('.drum-pad').forEach((pad) => {
        pad.classList.remove('disabled');
      });
    }
  }, [power, setPower]);

  const toggleBank = useCallback(() => {
    setActiveBank(activeBank === bankOne ? bankTwo : bankOne);
    setDisplayText(`Bank: ${activeBank === bankOne ? 'Two' : 'One'}`);
    clearDisplay();
  }, [activeBank, setActiveBank]);

  const playSound = useCallback((key, id) => {
    try {
      const sound = document.querySelector(`#${key}`);
      sound.currentTime = 0;
      sound.play();
      setDisplayText(`${id}`);
      clearDisplay();
    } catch (e) {
      console.log('Error: ' + e);
    }
  }, []);

  useEffect(() => {
    document.querySelectorAll('.clip').forEach((clip) => {
      clip.volume = volume;
    });
  }, [volume]);

  return (
    <div className="content">
      <div className="contaier" id="drum-machine">
        <div className="drum-board">
          {activeBank.map((elem, index) => (
            <DrumBtn
              keyCode={elem.keyCode}
              keyTrigger={elem.keyTrigger}
              id={elem.id}
              url={elem.url}
              key={`drumBtn${index}`}
              onBtnClick={playSound}
            />
          ))}
        </div>
        <div className="control-pad">
          <Toggler onToggle={togglePower} switchLabels={{ a: 'On', b: 'Off' }} checked={power} />
          <Toggler
            onToggle={toggleBank}
            switchLabels={{ a: 'Bn2', b: 'Bn1' }}
            extraClass="switch-right-modified"
            checked={activeBank === bankOne ? false : true}
          />
          <div className="display" id="display">
            <p>{displayText}</p>
          </div>
          <Range volume={volume} toggleVolume={toggleVolume} />
        </div>
      </div>
    </div>
  );
};

export default DrumMachine;
