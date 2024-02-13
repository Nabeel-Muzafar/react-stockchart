import React, { useState } from "react";
import { Button, FormControl } from "react-bootstrap";
import { SketchPicker } from "react-color";

const DrawingTools = ({ setting, setSetting, drawingCanva }) => {
  const [displayColorPicker, setdisplayColorPicker] = useState(false);
  const [toggleMode, setToggleMode] = useState(false);

  const handleClick = () => {
    setdisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setdisplayColorPicker(false);
  };

  const handleChange = (co) => {
    setSetting({ ...setting, stokeColor: co.hex });
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "2rem",
          flexWrap: "wrap",
          alignItems: "center",
          border: "1px solid #d3d3d3",
          padding: "10px",
          borderRadius: "9px",
        }}
      >
        <div>
          <div
            style={{
              padding: "5px",
              borderRadius: "1px",
              display: "inline-block",
              alignItems: "center",
              gap: "1rem",
              cursor: "pointer",
            }}
            onClick={handleClick}
          >
            <div>Stroke Color</div>
            <div
              style={{
                width: "100px",
                height: "34px",
                border: "1px solid gray",
                borderRadius: "2px",
                background: `${setting.stokeColor}`,
              }}
            />
          </div>
          {displayColorPicker && (
            <div
              style={{
                position: "absolute",
                zIndex: "99999",
              }}
            >
              <div
                style={{
                  position: "fixed",
                  top: "0px",
                  right: "0px",
                  bottom: "0px",
                  left: "0px",
                }}
                onClick={handleClose}
              />
              <SketchPicker
                color={setting.stokeColor}
                onChange={handleChange}
              />
            </div>
          )}
        </div>
        <div>
          <div>Stroke Width</div>
          <FormControl
            type="number"
            value={setting.strokeWidth}
            onChange={(e) =>
              setSetting({ ...setting, strokeWidth: e.target.value })
            }
            placeholder="Stroke Width"
          />
        </div>

        <div>
          <div>Eraser Width</div>
          <FormControl
            type="number"
            value={setting.eraserWidth}
            onChange={(e) =>
              setSetting({ ...setting, eraserWidth: e.target.value })
            }
            placeholder="Eraser Width"
          />
        </div>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <Button
            onClick={() => {
              drawingCanva.current.undo();
            }}
          >
            Undo
          </Button>
          <Button
            onClick={() => {
              drawingCanva.current.redo();
            }}
          >
            Redo
          </Button>
          <Button
            onClick={() => {
              drawingCanva.current.clearCanvas();
            }}
          >
            clear All
          </Button>
          <Button
            onClick={() => {
              setToggleMode(false);
              drawingCanva.current.eraseMode(false);
            }}
            variant="success"
          >
            Pen
          </Button>
          <Button
            variant="success"
            onClick={() => {
              setToggleMode(true);
              drawingCanva.current.eraseMode(true);
            }}
          >
            Eraser
          </Button>
        </div>
      </div>
    </>
  );
};

export default DrawingTools;
