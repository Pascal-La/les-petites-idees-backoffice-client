import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App";
import UpdateIdea from "./components/UpdateIdea";
import Login from "./pages/Login";
import NewIdea from "./components/NewIdea";

import "./index.scss";

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
