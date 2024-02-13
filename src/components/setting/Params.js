import React from "react";
import { Button, FormControl } from "react-bootstrap";

export const Params = ({
  setting,
  setSetting,
  setIsSubmit,
  isSubmit,
  loader,
}) => {
  const handleSubmit = () => {
    if (setting.symbol && setting.startDate && setting.period) {
      setIsSubmit(!isSubmit);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "gray",
        display: "flex",
        gap: "1rem",
        padding: "1rem 1rem",
        alignItems: "end",
        flexWrap: "wrap",
      }}
      gap={3}
    >
      <div>
        <div>Stock Name</div>
        <FormControl
          type="text"
          value={setting.symbol}
          onChange={(e) => setSetting({ ...setting, symbol: e.target.value })}
          placeholder="Enter stock name"
        />
      </div>

      <div>
        <div>Date</div>
        <FormControl
          type="date"
          value={setting.startDate}
          onChange={(e) =>
            setSetting({ ...setting, startDate: e.target.value })
          }
          placeholder="Select start date ' yyyy/mm/dd '"
        />
      </div>
      <div>
        <div>Period</div>
        <FormControl
          onChange={(e) => setSetting({ ...setting, period: e.target.value })}
          type="number"
          value={setting.period}
          placeholder="Enter days"
        />
      </div>
      <div>
        <Button
          disabled={!setting.period || !setting.symbol || !setting.startDate}
          onClick={handleSubmit}
        >
          {loader ? "please wait .." : "Update"}
        </Button>
      </div>
    </div>
  );
};
