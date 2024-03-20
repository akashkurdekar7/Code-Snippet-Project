import React, { useState } from "react";
import { Form, Container } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaArrowAltCircleRight } from "react-icons/fa";
import Button from "@mui/material/Button";

const FormComponent = ({ getAllUsers }) => {
  const [formData, setFormData] = useState({
    username: "",
    code_language: "",
    stdin: "",
    source_code: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { username, code_language, stdin, source_code } = formData;

      // Validate form fields
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

      // Proceed with form submission
      const res = await axios.post(`http://localhost:4000/api/users/create`, {
        username,
        code_language,
        stdin,
        source_code,
      });
      if (res && res?.data && res?.data?.success === true) {
        toast.success("User saved successfully");
        setTimeout(() => {
          navigate("/code");
        }, 2000);
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
      console.log("Error:", error);
      console.log("Response data:", error.response?.data);
    }
  };

  return (
    <Container>
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
        <div className="mt-3 d-flex justify-content-center align-items-center gap-2">
          <Button
            variant="contained"
            className="mr-3 btn-dark text-white d-flex align-items-center justify-content-center"
            type="submit"
          >
            Submit
          </Button>
          <Button
            color="success"
            variant="contained"
            onClick={() => navigate("/code")}
            endIcon={<FaArrowAltCircleRight />}
          >
            <span>Code Snippets</span>
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default FormComponent;
