import React from "react";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Error = () => {
  return (
    <div>
      <h1>error</h1>

      <Button variant="contained" startIcon={<ArrowForwardIcon />}>
        Home
      </Button>
    </div>
  );
};

export default Error;
