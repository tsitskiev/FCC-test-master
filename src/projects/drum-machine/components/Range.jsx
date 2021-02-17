import React, { memo } from "react";

const Range = memo(function Range({ volume, toggleVolume }) {
  return (
    <input
      type="range"
      min="0"
      max="1"
      step="0.05"
      value={`${volume}`}
      onChange={toggleVolume}
      style={{ marginBottom: "16px" }}
    />
  );
});

export default Range;
