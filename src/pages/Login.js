import { Button, Col, Form } from "react-bootstrap";
import logo from "../assets/logo.png";

const Login = () => {
  return (
    <div className="container d-flex flex-column align-items-center pt-5 mt-5">
      <img src={logo} alt="Les Petites Idées" height={200} />
      <Col xs={12} sm={10} md={8} lg={4}>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Adresse email" />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control type="password" placeholder="Mot de passe" />
          </Form.Group>
          <div className="d-grid gap-2">
            <Button type="submit" variant="warning" className="mt-3">
              Envoyer
            </Button>
          </div>
        </Form>
      </Col>
    </div>
  );
};

export default Login;
