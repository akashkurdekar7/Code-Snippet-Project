import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button, Table } from "react-bootstrap";
import axios from "axios";
import Layout from "../components/Layout/Layout";
import { toast } from "react-hot-toast";

const Home = () => {
  const [formData, setFormData] = useState({
    username: "",
    code_language: "",
    stdin: "",
    source_code: "",
  });
  const [codeSnippets, setCodeSnippets] = useState([]);

  // get Users
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(`http://localhost:4000/api/users`);
      // console.log("data: ", data);
      if (data?.success) {
        setCodeSnippets(data?.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in getting users");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  //creatin users form submission api
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { username, code_language, stdin, source_code } = formData;
      const res = await axios.post(`http://localhost:4000/api/users/create`, {
        username,
        code_language,
        stdin,
        source_code,
      });
      if (res && res.data && res.data.success) {
        toast.success("User saved successfully");
        getAllUsers();
        setFormData({
          username: "",
          code_language: "",
          stdin: "",
          source_code: "",
        });
      } else {
        toast.error(res?.data?.message || "Failed to save user");
      }
    } catch (error) {
      toast.error("Creating User failed");
    }
  };

  const handleUpdate = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:4000/api/users/update/${id}`
      );
      console.log("Updated succesfullty", res);
      if (res && res.data && res.data.success) {
        toast.success("User Updated successfully");
        // Refresh code snippets after deleting a user
        getAllUsers();
      } else {
        toast.error(res?.data?.message || "Failed to Update user");
      }
    } catch (error) {
      toast.error("Failed to Update snippet");
    }
  };
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/api/users/delete/${id}`
      );
      console.log("Deleted succesfullty", res);
      if (res && res.data && res.data.success) {
        toast.success("User deleted successfully");
        getAllUsers();
      } else {
        toast.error(res?.data?.message || "Failed to delete user");
      }
    } catch (error) {
      toast.error("Failed to delete snippet");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Layout>
      <Row>
        <Col md={4}>
          <h2>Submit Code Snippet</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Enter username"
              />
            </Form.Group>

            <Form.Group controlId="codeLanguage">
              <Form.Label>Code Language</Form.Label>
              <Form.Control
                as="select"
                name="code_language"
                value={formData.code_language}
                onChange={handleInputChange}
              >
                <option>Choose...</option>
                <option>C++</option>
                <option>Java</option>
                <option>JavaScript</option>
                <option>Python</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="stdin">
              <Form.Label>Standard Input</Form.Label>
              <Form.Control
                type="text"
                name="stdin"
                value={formData.stdin}
                onChange={handleInputChange}
                placeholder="Enter stdin"
              />
            </Form.Group>

            <Form.Group controlId="sourceCode">
              <Form.Label>Source Code</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="source_code"
                value={formData.source_code}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
        <Col md={8}>
          <h2>Code Snippets</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Code Language</th>
                <th>Standard Input</th>
                <th>Source Code</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {codeSnippets.map((snippet) => (
                <tr key={snippet.id}>
                  <td>{snippet.id}</td>
                  <td>{snippet.username}</td>
                  <td>{snippet.code_language}</td>
                  <td>{snippet.stdin}</td>
                  {/* <td>{snippet.sourceCode.substring(0, 100)}</td> */}
                  <td>{snippet.source_code}</td>
                  <td>
                    <Button
                      variant="info"
                      onClick={() => handleUpdate(snippet.id)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(snippet.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Layout>
  );
};

export default Home;
