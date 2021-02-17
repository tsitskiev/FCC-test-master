import React from 'react';

const Timer = ({ time, isBreak }) => {
  const clockStyle = {
    color: isBreak === 'session' ? '#fff' : 'red',
    textAlign: 'center',
    fontSize: '26px',
    marginBottom: '20px',
  };

  const clocks = () => {
    const min = Math.floor(time / 60);
    const sec = time - min * 60;
    return `${min < 10 ? '0' + min : min === 60 ? '60' : min}:${sec < 10 ? '0' + sec : sec}`;
  };

  return (
    <div id="time-left" style={clockStyle}>
      {clocks()}
    </div>
  );
};

export default Timer;
