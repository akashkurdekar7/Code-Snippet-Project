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
  const [updateSnippet, setUpdateSnippet] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(10);

  // Get code snippets for the current page
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = codeSnippets.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );

  // Calculate total number of pages
  const totalPages = Math.ceil(codeSnippets.length / entriesPerPage);

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

      // Check if creating a new user and validate form fields
      if (!updateSnippet) {
        switch (true) {
          case !username:
            toast.error("Please enter a username");
            return;
          case !code_language || code_language === "0":
            toast.error("Please select a code language");
            return;
          case !stdin:
            toast.error("Please enter standard input");
            return;
          case !source_code:
            toast.error("Please enter source code");
            return;
          default:
            break;
        }
      }

      // Proceed with form submission
      if (updateSnippet) {
        const res = await axios.put(
          `http://localhost:4000/api/users/update/${updateSnippet.id}`,
          {
            username,
            code_language,
            stdin,
            source_code,
          }
        );
        if (res && res.data && res.data.success) {
          toast.success("User updated successfully");
          getAllUsers();
          resetForm();
        } else {
          toast.error(res?.data?.message || "Failed to update user");
        }
      } else {
        const res = await axios.post(`http://localhost:4000/api/users/create`, {
          username,
          code_language,
          stdin,
          source_code,
        });
        if (res && res.data && res.data.success) {
          toast.success("User saved successfully");
          getAllUsers();
          resetForm();
        } else {
          toast.error(res?.data?.message || "Failed to save user");
        }
      }
    } catch (error) {
      toast.error("Creating User failed");
    }
  };

  // handle delete
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/api/users/delete/${id}`
      );
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

  const handleUpdateClick = (id) => {
    const snippetToUpdate = codeSnippets.find((snippet) => snippet.id === id);
    setFormData({
      username: snippetToUpdate.username,
      code_language: snippetToUpdate.code_language,
      stdin: snippetToUpdate.stdin,
      source_code: snippetToUpdate.source_code,
    });
    setUpdateSnippet(snippetToUpdate);
  };

  // Reset form fields
  const resetForm = () => {
    setFormData({
      username: "",
      code_language: "",
      stdin: "",
      source_code: "",
    });
    setUpdateSnippet(null);
  };

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Layout>
      <Row>
        <Col md={3}>
          <h2>
            {updateSnippet ? "Update Code Snippet" : "Submit Code Snippet"}
          </h2>
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
                <option value="">Choose...</option>
                <option value="C++">C++</option>
                <option value="Java">Java</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
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

            <Button className="mt-3 mb-3 btn-dark text-white" type="submit">
              {updateSnippet ? "Update" : "Submit"}
            </Button>
          </Form>
        </Col>

        <Col md={9}>
          <h2>Code Snippets</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Code Language</th>
                <th>Standard Input</th>
                <th>Source Code</th>
                <th>Time Stamp</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentEntries.map((snippet) => (
                <tr key={snippet.id}>
                  <td>{snippet.id}</td>
                  <td>{snippet.username}</td>
                  <td>{snippet.code_language}</td>
                  <td>{snippet.stdin}</td>
                  <td>{snippet.source_code.substring(0, 100)}...</td>
                  <td>{snippet.timestamp}</td>
                  <td>
                    <Button
                      className="btn btn-warning btn-block mb-3"
                      onClick={() => handleUpdateClick(snippet.id)}
                    >
                      Update
                    </Button>
                    <Button
                      className="btn btn-danger btn-block"
                      onClick={() => handleDelete(snippet.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* Pagination */}
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <li
                key={i}
                className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
              >
                <button onClick={() => paginate(i + 1)} className="page-link">
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </Layout>
  );
};

export default Home;
