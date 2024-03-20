import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home.js";
import Error from "./pages/Error.js";
import CodeDisplay from "./pages/CodeDisplay.js";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/code" element={<CodeDisplay />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default App;
