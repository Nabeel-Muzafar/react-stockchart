// ThemeModeCard.js
import React from "react";
import {
  Button,
  Card,
  Form,
  OverlayTrigger,
  Stack,
  Tooltip,
} from "react-bootstrap";
import { BlockPicker } from "react-color";

const ThemeModeCard = ({ setting, setSetting }) => {
  const handleColor = (color, name) => {
    setSetting({ ...setting, [name]: color.hex });
  };

  const renderBBF = (name) => {
    return (
      <Tooltip id="button-tooltip" {...name}>
        <div style={{ backgroundColor: "white" }}>
          <BlockPicker
            styles={{ backgroundColor: "white" }}
            color={setting.name}
            onChange={(color) => handleColor(color, name)}
            triangle="hide"
          />
        </div>
      </Tooltip>
    );
  };

  return (
    <Card
      bg={"secondary"}
      key={"primary"}
      text={"white"}
      style={{ width: "18rem" }}
      className="mb-2"
    >
      <Card.Header>Theme Mode</Card.Header>
      <Card.Body>
        <Stack gap={3}>
          <div>
            <Form.Label htmlFor="colorMode">Select Mode</Form.Label>
            <Form.Select
              id="colorMode"
              value={setting.colorMode}
              onChange={(e) =>
                setSetting({ ...setting, colorMode: e.target.value })
              }
              aria-label="Color mode setting"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </Form.Select>
          </div>
          <div>
            <OverlayTrigger
              placement="right"
              trigger={"click"}
              delay={{ show: 250, hide: 400 }}
              overlay={renderBBF("bbfill")}
              name={"bbfill"}
            >
              <Button variant="success">
                Toggle to Change Bollinger Band Color
              </Button>
            </OverlayTrigger>
          </div>

          <div>
            <OverlayTrigger
              placement="right"
              trigger={"click"}
              delay={{ show: 250, hide: 400 }}
              overlay={renderBBF("bbt")}
              name={"bbu"}
            >
              <Button variant="success">
                Toggle to Change Bollinger Band Upper Color
              </Button>
            </OverlayTrigger>
          </div>
          <div>
            <OverlayTrigger
              placement="right"
              trigger={"click"}
              delay={{ show: 250, hide: 400 }}
              overlay={renderBBF("bbb")}
              name={"bbl"}
            >
              <Button variant="success">
                Toggle to Change Bollinger Band Lower Color
              </Button>
            </OverlayTrigger>
          </div>
          <div>
            <OverlayTrigger
              placement="right"
              trigger={"click"}
              delay={{ show: 250, hide: 400 }}
              overlay={renderBBF("bbm")}
              name={"bbm"}
            >
              <Button variant="success">
                Toggle to Change Bollinger Band Middle Color
              </Button>
            </OverlayTrigger>
          </div>
        </Stack>
      </Card.Body>
    </Card>
  );
};

export default ThemeModeCard;
