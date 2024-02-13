// ChartSettingsControl.js
import React from "react";
import { Form, Stack, Card } from "react-bootstrap";

const ChartSettingsControl = ({ setting, setSetting }) => {
  const handleUpdate = (key, value) => {
    setSetting((prevSetting) => ({
      ...prevSetting,
      [key]: value,
    }));
  };

  const renderInputField = (key, label, value) => {
    return (
      <Form.Group controlId={key} className="mb-3">
        <Form.Label>{label}</Form.Label>
        <Form.Control
          type="text"
          value={value}
          onChange={(e) => handleUpdate(key, e.target.value)}
        />
      </Form.Group>
    );
  };

  return (
    <div>
      <Card
        bg={"secondary"}
        key={"primary"}
        text={"white"}
        style={{ width: "18rem" }}
        className="mb-2"
      >
        <Card.Header>Label Setting</Card.Header>
        <Card.Body>
          <Stack gap={3}>
            <div>
              <Form.Switch
                id="xLabelSwitch"
                label="X Axis Label"
                checked={setting.xLabel}
                onChange={() => handleUpdate("xLabel", !setting.xLabel)}
              />
              {setting.xLabel &&
                renderInputField(
                  "xLabelText",
                  "X Axis Label",
                  setting.xLabelText
                )}

              <Form.Switch
                id="yLabelSwitch"
                label="Y Axis Label"
                checked={setting.yLabel}
                onChange={() => handleUpdate("yLabel", !setting.yLabel)}
              />
              {setting.yLabel &&
                renderInputField(
                  "yLabelText",
                  "Y Axis Label",
                  setting.yLabelText
                )}

              <Form.Switch
                id="titleSwitch"
                label="Chart Title"
                checked={setting.title}
                onChange={() => handleUpdate("title", !setting.title)}
              />
              {setting.title &&
                renderInputField("titleText", "Chart Title", setting.titleText)}
            </div>
          </Stack>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ChartSettingsControl;
