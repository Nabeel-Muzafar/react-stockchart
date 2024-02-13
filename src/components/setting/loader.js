import React from "react";
import { Spinner } from "react-bootstrap";

export const loader = () => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <Spinner animation="grow" />
      <p>Please Wait we are loading graph</p>
    </div>
  );
};
