import React from "react";
import { Container } from "react-bootstrap";
import Header from "./Header";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <Container className="mt-4 d-flex justify-content-center">
        <Toaster />
        {children}
      </Container>
    </div>
  );
};

export default Layout;
