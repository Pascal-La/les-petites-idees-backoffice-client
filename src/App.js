import { useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import "./App.scss";

import { useAuthState } from "./context/auth";

import Header from "./components/Header";
import IdeaList from "./components/IdeaList";
import Login from "./pages/Login";
import NewIdea from "./pages/NewIdea";
import UpdateIdea from "./pages/UpdateIdea";

const App = () => {
  const { user } = useAuthState();
  const [ideaId, setIdeaId] = useState("");

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          exact
          path="/"
          element={
            !user ? (
              <Navigate replace to="/login" />
            ) : (
              <IdeaList ideaId={(id) => setIdeaId(id)} />
            )
          }
        />
        <Route
          exact
          path="/update/:id"
          element={
            !user ? (
              <Navigate replace to="/login" />
            ) : (
              <UpdateIdea ideaId={ideaId} />
            )
          }
        />
        <Route
          exact
          path="/newIdea"
          element={!user ? <Navigate replace to="/login" /> : <NewIdea />}
        />
        <Route
          exact
          path="*"
          element={!user && <Navigate replace to="/login" />}
        />
        <Route
          exact
          path="/login"
          element={user ? <Navigate replace to="/" /> : <Login />}
        />
      </Routes>
    </Router>
  );
};

export default App;
