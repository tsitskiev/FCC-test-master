import React, { useEffect, useCallback } from 'react';

const DrumBtn = ({ onBtnClick, keyCode, keyTrigger, id, url }) => {
  const onPadClick = useCallback(
    (key, id) => {
      onBtnClick(key, id);
    },
    [onBtnClick],
  );

  useEffect(() => {
    document.addEventListener('keypress', (e) => {
      // console.log(e.key, keyTrigger.toLowerCase());
      if (e.key === keyTrigger || e.key === keyTrigger.toLowerCase()) {
        onPadClick(keyTrigger, id);
      }
    });
  }, []);

  return (
    <div className="drum-pad" id={id} onClick={() => onPadClick(keyTrigger, id)}>
      <p>{keyTrigger}</p>
      <audio id={keyTrigger} src={url} className="clip"></audio>
    </div>
  );
};

export default DrumBtn;
