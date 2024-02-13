import React from "react";
import { Card, Form, FormControl } from "react-bootstrap";
import debounce from "lodash/debounce";

export const TextBoxSet = ({ setting, setSetting }) => {
  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setSetting((prevData) => ({
  //       ...prevData,
  //       textBoxFeat: {
  //         ...prevData.textBoxFeat,
  //         [name]: value,
  //       },
  //     }));
  //   };

  const debouncedSetSetting = debounce((newData) => {
    setSetting((prevData) => ({
      ...prevData,
      textBoxFeat: {
        ...prevData.textBoxFeat,
        ...newData,
      },
    }));
  }, 300);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Call the debounced function with the updated data
    debouncedSetSetting({ [name]: value });
  };

  return (
    <>
      <Card bg={"secondary"} style={{ width: "18rem" }} text={"white"}>
        <Card.Header>Header</Card.Header>
        <Card.Body>
          <Card.Title>Text Box Customization</Card.Title>
          <Card.Body>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "1rem",
              }}
            >
              <Form.Group controlId="bgFill">
                <Form.Label>Background Fill</Form.Label>
                <FormControl
                  type="color"
                  name="bgFill"
                  value={setting?.textBoxFeat?.bgFill}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="textFill">
                <Form.Label>Text Fill</Form.Label>
                <FormControl
                  type="color"
                  name="textFill"
                  value={setting?.textBoxFeat?.textFill}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>

            <Form.Group controlId="bgOpacity">
              <Form.Label>Background Opacity</Form.Label>
              <FormControl
                type="number"
                name="bgOpacity"
                value={setting?.textBoxFeat?.bgOpacity}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="bgStrokeWidth">
              <Form.Label>Background Stroke Width</Form.Label>
              <FormControl
                type="number"
                name="bgStrokeWidth"
                value={setting?.textBoxFeat?.bgStrokeWidth}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="fontSize">
              <Form.Label>Font Size</Form.Label>
              <FormControl
                type="number"
                name="fontSize"
                value={setting?.textBoxFeat?.fontSize}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="fontWeight">
              <Form.Label>Font Weight</Form.Label>
              <FormControl
                as="select"
                name="fontWeight"
                value={setting?.textBoxFeat?.fontWeight}
                onChange={handleChange}
              >
                <option value="normal">Normal</option>
                <option value="bold">Bold</option>
              </FormControl>
            </Form.Group>
          </Card.Body>
        </Card.Body>
      </Card>
    </>
  );
};
