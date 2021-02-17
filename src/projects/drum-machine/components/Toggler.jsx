import React from 'react';
// import "./slider.css";

const Toggler = ({ onToggle, switchLabels, extraClass = '', checked = false }) => {
  return (
    <div className="mid">
      <label className="rocker rocker-small">
        <input type="checkbox" onChange={() => onToggle()} checked={checked} />
        <span className="switch-left">{switchLabels.a}</span>
        <span className={`switch-right ${extraClass}`}>{switchLabels.b}</span>
      </label>
    </div>
  );
};

export default Toggler;
