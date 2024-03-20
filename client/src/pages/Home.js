import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import FormComponent from "../components/Layout/FormComponent";
import { Col, Container } from "react-bootstrap";

const Home = () => {
  const [updateSnippet, setUpdateSnippet] = useState(null);
  return (
    <Layout>
      <Container className="d-flex justify-content-center">
        <Col md={4}>
          <FormComponent
            updateSnippet={updateSnippet}
            setUpdateSnippet={setUpdateSnippet}
          />
        </Col>
      </Container>
    </Layout>
  );
};

export default Home;
