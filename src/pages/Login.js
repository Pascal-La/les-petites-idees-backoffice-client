import { useState } from "react";
import { Button, Col, Form, Spinner } from "react-bootstrap";
import axios from "axios";

import { useAuthDispatch } from "../context/auth";

import logo from "../assets/logo.png";

const Login = () => {
  const dispatch = useAuthDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");

  const signIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/users/login",
        { email, password },
        config
      );
      dispatch({ type: "LOGIN", payload: data });
      setLoading(false);
      window.location.href = "/";
    } catch (error) {
      setLoading(false);
      setErrors(error.response.data);
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center pt-5 mt-5">
      <img
        src={logo}
        alt="Les Petites Idées"
        height={200}
        style={{
          userSelect: "none",
        }}
      />
      <p
        className="mb-4 py-1 px-2 rounded"
        style={{
          backgroundColor: "#04047c",
          color: "#f2d347",
          fontStyle: "italic",
          userSelect: "none",
        }}
      >
        Backoffice
      </p>
      <Col xs={12} sm={10} md={8} lg={4}>
        <Form onSubmit={signIn}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setErrors("")}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setErrors("")}
            />
          </Form.Group>
          {!errors && (
            <div className="d-grid gap-2">
              <Button type="submit" variant="warning" className="mt-3">
                {loading ? <Spinner animation="border" size="sm" /> : "Valider"}
              </Button>
            </div>
          )}
        </Form>
        {errors && (
          <div className="bg-danger text-center rounded mt-3 p-2">
            <p>{errors}</p>
          </div>
        )}
      </Col>
    </div>
  );
};

export default Login;
