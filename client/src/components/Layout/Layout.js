import React from "react";
import { Container } from "react-bootstrap";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <Container className="mt-4">{children}</Container>
    </div>
  );
};

export default Layout;
