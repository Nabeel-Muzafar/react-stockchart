import React from "react";

export const TextBox = () => {
  return (
    <div>
      <h4>Instructions</h4>
      <ul>
        <li>Create a Text box - Click on any where in graph</li>
        <li>To get back into draw mode again - Press D</li>
        <li>Get out of draw mode - Press ESC</li>
        <li>Delete the last text - Press DEL</li>
      </ul>
      <p>When not in draw mode:</p>
      <ul>
        <li>Move mouse over to hover state</li>
        <li>Click to select</li>
        <li>Drag to perform actions</li>
      </ul>
    </div>
  );
};
