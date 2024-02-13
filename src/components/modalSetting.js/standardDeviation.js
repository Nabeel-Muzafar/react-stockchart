import React from "react";

export const StandardDeviation = () => {
  return (
    <div>
      <h4>Instructions</h4>
      <ul>
        <li>Draw a channel - Click, Mousemove, Click</li>
        <li>The channel gets out of draw mode automatically after drawing</li>
        <li>To get back into draw mode - Press D</li>
        <li>Get out of draw mode - Press ESC</li>
        <li>Delete the last drawn channel - Press DEL</li>
      </ul>
      <p>When not in draw mode:</p>
      <ul>
        <li>Move mouse over to hover state</li>
        <li>Click the middle line to select</li>
        <li>Move the edge circles to adjust</li>
        <li>Click outside to unselect</li>
      </ul>
    </div>
  );
};
