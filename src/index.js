import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./index.scss";

import App from "./App";
import Login from "./pages/Login";
import NewIdea from "./pages/NewIdea";
import UpdateIdea from "./pages/UpdateIdea";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/update/:id" element={<UpdateIdea />} />
        <Route path="/newIdea" element={<NewIdea />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
