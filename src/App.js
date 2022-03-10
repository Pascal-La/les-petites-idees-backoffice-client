import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.scss";

import Header from "./components/Header";
import IdeaList from "./components/IdeaList";
import Login from "./pages/Login";
import NewIdea from "./pages/NewIdea";
import UpdateIdea from "./pages/UpdateIdea";

const App = () => {
  const [ideaId, setIdeaId] = useState("");
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          exact
          path="/"
          element={<IdeaList ideaId={(id) => setIdeaId(id)} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/update/:id" element={<UpdateIdea ideaId={ideaId} />} />
        <Route path="/newIdea" element={<NewIdea />} />
      </Routes>
    </Router>
  );
};

export default App;
