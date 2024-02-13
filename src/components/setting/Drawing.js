import React from "react";
import { Form } from "react-bootstrap";
import DrawingTools from "./DrawingTools";

const Drawing = ({ setting, setSetting, drawingCanva }) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "right",
          padding: "1rem",
          gap: "2rem",
          alignItems: "center",
        }}
      >
        {setting.drawMode && (
          <DrawingTools
            setting={setting}
            setSetting={setSetting}
            drawingCanva={drawingCanva}
          />
        )}
        <Form.Switch
          id="drawing"
          label="Add Annotation"
          checked={setting.drawMode}
          onChange={(e) =>
            setSetting({ ...setting, drawMode: !setting.drawMode })
          }
        />
      </div>
    </>
  );
};

export default Drawing;
