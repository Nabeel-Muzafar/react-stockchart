// GridSettingCard.js
import React from "react";
import { Card, Form, Stack } from "react-bootstrap";

const GridSettingCard = ({ gridSetting, setGridSetting }) => {
  return (
    <Card
      bg={"secondary"}
      key={"primary"}
      text={"white"}
      style={{ width: "18rem" }}
      className="mb-2"
    >
      <Card.Header>Grid Setting</Card.Header>
      <Card.Body>
        <Stack gap={3}>
          <div>
            <div style={{ marginBottom: "1rem" }}>
              <Form.Switch
                id="grid"
                label="Show Grid"
                checked={gridSetting.grid}
                onChange={() =>
                  setGridSetting({ ...gridSetting, grid: !gridSetting.grid })
                }
              />
            </div>

            <Form.Label htmlFor="gridStyle">Select Style</Form.Label>
            <Form.Select
              id="gridStyle"
              value={gridSetting.style}
              onChange={(e) =>
                setGridSetting({ ...gridSetting, style: e.target.value })
              }
              aria-label="Grid style setting"
            >
              <option value="Solid">Solid</option>
              <option value="ShortDash">ShortDash</option>
              <option value="ShortDot">ShortDot</option>
              <option value="ShortDashDot">ShortDashDot</option>
              <option value="ShortDashDotDot">ShortDashDotDot</option>
              <option value="Dot">Dot</option>
              <option value="Dash">Dash</option>
              <option value="LongDash">LongDash</option>
              <option value="DashDot">DashDot</option>
              <option value="LongDashDot">LongDashDot</option>
              <option value="LongDashDotDot">LongDashDotDot</option>
            </Form.Select>
          </div>

          <div>
            <Form.Label htmlFor="gridOpacity">Select Opacity</Form.Label>
            <Form.Select
              id="gridOpacity"
              value={gridSetting.opacity}
              onChange={(e) =>
                setGridSetting({
                  ...gridSetting,
                  opacity: e.target.value,
                })
              }
              aria-label="Stroke opacity"
            >
              <option value="1">1</option>
              <option value="0.9">0.9</option>
              <option value="0.8">0.8</option>
              <option value="0.7">0.7</option>
              <option value="0.6">0.6</option>
              <option value="0.5">0.5</option>
              <option value="0.4">0.4</option>
              <option value="0.3">0.3</option>
              <option value="0.2">0.2</option>
              <option value="0.1">0.1</option>
            </Form.Select>
          </div>

          <div>
            <Form.Label htmlFor="gridStrokeWidth">
              Select Stroke Width
            </Form.Label>
            <Form.Select
              id="gridStrokeWidth"
              value={gridSetting.strokeWidth}
              onChange={(e) =>
                setGridSetting({
                  ...gridSetting,
                  strokeWidth: e.target.value,
                })
              }
              aria-label="Stroke width"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </Form.Select>
          </div>
        </Stack>
      </Card.Body>
    </Card>
  );
};

export default GridSettingCard;
