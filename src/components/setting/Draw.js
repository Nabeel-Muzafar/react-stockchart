import React, { useState } from "react";
import { Card, Form, Stack } from "react-bootstrap";
import DrawModal from "./shared/modal";
import { TextBox } from "../modalSetting.js/textbox";
import { StandardDeviation } from "../modalSetting.js/standardDeviation";
import { Trendline } from "../modalSetting.js/trendline";
export const Draw = ({ setting, setSetting }) => {
  const modalSetting = {
    textBox: {
      title: "Interactive Text Box",
      component: <TextBox />,
    },
    standardDeviation: {
      title: "Standard Deviation",
      component: <StandardDeviation />,
    },
    trendLine: {
      title: "Trendline",
      component: <Trendline />,
    },
  };

  const handleUpdate = (key, value) => {
    if (key === "textBox" && value) {
      setShow(true);
      setSetting((prevSetting) => ({
        ...prevSetting,
        [key]: value,
        standardDeviation: false,
        trendLine: false,
      }));
    }
    if (key === "standardDeviation" && value) {
      setShow(true);
      setSetting((prevSetting) => ({
        ...prevSetting,
        [key]: value,
        textBox: false,
        trendLine: false,
      }));
    }
    if (key === "trendLine" && value) {
      setShow(true);
      setSetting((prevSetting) => ({
        ...prevSetting,
        [key]: value,
        textBox: false,
        standardDeviation: false,
      }));
    }
    setSetting((prevSetting) => ({
      ...prevSetting,
      [key]: value,
    }));
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  return (
    <>
      <Card
        bg={"secondary"}
        key={"primary"}
        text={"white"}
        style={{ width: "18rem" }}
        className="mb-2"
      >
        <Card.Header>Draw Setting</Card.Header>
        <Card.Body>
          <Stack gap={3}>
            <div>
              <Form.Switch
                id="textBox"
                label="Interactive Text Box"
                checked={setting.textBox}
                onChange={() => handleUpdate("textBox", !setting.textBox)}
              />

              <Form.Switch
                id="standardDeviation"
                label="Standard deviation Line"
                checked={setting?.standardDeviation}
                onChange={() =>
                  handleUpdate("standardDeviation", !setting.standardDeviation)
                }
              />

              <Form.Switch
                id="trendLine"
                label="Trending line"
                checked={setting?.trendLine}
                onChange={() => handleUpdate("trendLine", !setting.trendLine)}
              />
            </div>
          </Stack>
        </Card.Body>
      </Card>

      <DrawModal
        show={show}
        handleClose={handleClose}
        heading={
          setting.textBox
            ? modalSetting["textBox"]?.title
            : setting.textBoxstandardDeviation
            ? modalSetting["standardDeviation"]?.title
            : modalSetting["trendLine"]?.title
        }
      >
        {setting.textBox
          ? modalSetting["textBox"]?.component
          : setting.textBoxstandardDeviation
          ? modalSetting["standardDeviation"]?.component
          : modalSetting["trendLine"]?.component}
      </DrawModal>
    </>
  );
};
