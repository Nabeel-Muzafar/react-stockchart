import React from "react";

export const Trendline = () => {
  return (
    <div>
      <h4>Instructions:</h4>
      <ul>
        <li>Draw a line - Click, Mousemove, Click</li>
        <li>By default, the line edge snaps to the nearest high or low</li>
        <li>Press Shift when you click to disable snap temporarily</li>
        <li>The line gets out of draw mode automatically after drawing</li>
        <li>To get back into draw mode again - Press D</li>
        <li>Delete the last drawn line - Press DEL</li>
        <li>Get out of draw mode - Press ESC</li>
      </ul>
      <p>When not in draw mode:</p>
      <ul>
        <li>Hover and click to select</li>
        <li>Move the line or edges</li>
        <li>Click outside to unselect</li>
      </ul>
    </div>
  );
};
