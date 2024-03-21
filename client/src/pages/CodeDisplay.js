import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Table, Modal } from "react-bootstrap";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import Button from "@mui/material/Button";
import Layout from "../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import UpdateFormComponent from "../components/Layout/UpdateFormComponent";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const CodeDisplay = () => {
  const [codeSnippets, setCodeSnippets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(10);
  const [updateSnippet, setUpdateSnippet] = useState(null);
  const [expandedCodeId, setExpandedCodeId] = useState(null);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);

  const navigate = useNavigate();

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
      const { data } = await axios.get(`http://localhost:4000/api/v1/users`);
      // console.log("data: ", data);
      if (data?.success) {
        setCodeSnippets(data?.data);
      }
    } catch (error) {
      console.log("Error fetching Users:", error);
      toast.error("something went wrong in getting users");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  // handle delete
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/api/v1/users/delete/${id}`
      );
      if (res && res?.data && res?.data?.success) {
        toast.success("User deleted successfully");
        getAllUsers();
      } else {
        toast.error(res?.data?.message || "Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    }
  };

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to toggle expanded code
  const toggleExpandedCode = (id) => {
    if (expandedCodeId === id) {
      setExpandedCodeId(null);
    } else {
      setExpandedCodeId(id);
    }
  };

  // Function to open the update dialog
  const handleOpenUpdateDialog = (snippet) => {
    setUpdateSnippet(snippet);
    setShowUpdateDialog(true);
  };

  // Function to close the update dialog
  const handleCloseUpdateDialog = () => {
    setShowUpdateDialog(false);
  };

  return (
    <Layout>
      <div className="container-fluid">
        <Button
          variant="contained"
          color="success"
          onClick={() => navigate("/")}
          startIcon={<FaArrowAltCircleLeft />}
        >
          <span>Home</span>
        </Button>
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
                <td>
                  {snippet.source_code.length > 100 && !expandedCodeId ? (
                    <>
                      {snippet.source_code.substring(0, 100)}
                      <a
                        className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                        onClick={() => toggleExpandedCode(snippet.id)}
                      >
                        <ExpandMoreIcon style={{ cursor: "pointer" }} />
                      </a>
                    </>
                  ) : (
                    <>
                      {snippet.source_code}
                      {snippet.source_code.length > 100 && (
                        <a
                          className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                          onClick={() => toggleExpandedCode(snippet.id)}
                        >
                          <ExpandLessIcon style={{ cursor: "pointer" }} />
                        </a>
                      )}
                    </>
                  )}
                </td>
                <td>{snippet.timestamp}</td>
                <td className="d-flex justify-content-center align-items-center flex-md-fill ">
                  <div className="d-grid gap-2">
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#626463" }}
                      className="btn btn-warning btn-block mb-3 text-white"
                      onClick={() => handleOpenUpdateDialog(snippet)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      className="btn btn-danger btn-block "
                      onClick={() => handleDelete(snippet.id)}
                    >
                      Delete
                    </Button>
                  </div>
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
      </div>
      {/* Update form dialog */}
      <Modal show={showUpdateDialog} onHide={handleCloseUpdateDialog}>
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UpdateFormComponent
            snippet={updateSnippet}
            getAllUsers={getAllUsers}
            onClose={handleCloseUpdateDialog}
          />
        </Modal.Body>
      </Modal>
    </Layout>
  );
};

export default CodeDisplay;
