import React, { useState } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const UpdateFormComponent = ({ snippet, getAllUsers, onClose }) => {
  const [formData, setFormData] = useState({
    username: snippet.username,
    code_language: snippet.code_language,
    stdin: snippet.stdin,
    source_code: snippet.source_code,
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
      const res = await axios.put(
        `http://localhost:4000/api/v1/users/update/${snippet.id}`,
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
        onClose(); // Close the dialog
        setTimeout(() => {
          navigate("/code");
        }, 2000);
      } else {
        toast.error(res?.data?.message || "Failed to update user");
      }
    } catch (error) {
      toast.error(error.response.data.message || "Server Error");
    }
  };

  return (
    <div>
      <h2>Update User: {snippet.username}</h2>
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

        <Button
          variant="contained"
          style={{ backgroundColor: "#626463" }}
          className="m-3 btn-dark text-white"
          type="submit"
        >
          Update
        </Button>
        <Button
          variant="contained"
          color="error"
          className="m-3 btn-dark text-white"
          onClick={onClose}
        >
          Cancel
        </Button>
      </Form>
    </div>
  );
};

export default UpdateFormComponent;
