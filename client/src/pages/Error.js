import React from "react";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Container, Typography } from "@mui/material";

const Error = () => {
  return (
    <Container
      maxWidth="md"
      className="mt-5 d-flex justify-content-center align-items-center flex-column"
    >
      <Typography variant="h3" align="center" color="black" gutterBottom>
        Oops! Something went wrong.
      </Typography>
      <Typography variant="h5" align="center" gutterBottom>
        We're sorry, but it seems there was an error.
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Please try again later or contact support if the problem persists.
      </Typography>
      <Button
        variant="contained"
        color="success"
        className="text-center"
        startIcon={<ArrowBackIcon />}
        onClick={() => window.history.back()}
      >
        Go Back
      </Button>
    </Container>
  );
};

export default Error;
