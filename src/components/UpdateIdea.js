import { Button, Container, Form } from "react-bootstrap";
import Header from "./Header";

const UpdateIdea = () => {
  //! AXIOS PUT

  const handleChange = (e) => {};

  return (
    <>
      <Header />
      <Form className="pt-5 mt-5">
        <Container>
          <h1 className="mb-4">Modifier une idée</h1>
          {/* //! FILE */}
          <Form.Group className="mb-2" controlId="formBasicEmail">
            <Form.Label>Logo</Form.Label>
            <Form.Control type="text" placeholder="Logo" />
          </Form.Group>

          <Form.Group className="mb-2" controlId="formBasicName">
            <Form.Label>Nom</Form.Label>
            <Form.Control type="text" placeholder="Nom" />
          </Form.Group>

          <Form.Group className="mb-2" controlId="formBasicWebSite">
            <Form.Label>Site web</Form.Label>
            <Form.Control type="text" placeholder="Site web" />
          </Form.Group>

          <Form.Group className="mb-2" controlId="formBasicDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Description"
              style={{ height: "100px" }}
            />
          </Form.Group>

          <Form.Group className="mb-2" controlId="formBasicTags">
            <Form.Label>Tags</Form.Label>
            <Form.Control type="text" placeholder="Tags" />
          </Form.Group>

          <Form.Group className="mb-2" controlId="formBasicAccess">
            <Form.Label>Accès</Form.Label>
            <Form.Select onChange={(e) => handleChange(e)}>
              <option value="free">Gratuit</option>
              <option value="notFree">Payant</option>
              <option value="both">Gratuit/Payant</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-2" controlId="formBasicLanguage">
            <Form.Label>Langue</Form.Label>
            <Form.Select onChange={(e) => handleChange(e)}>
              <option value="french">Français</option>
              <option value="english">Anglais</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-4" controlId="formBasicStar">
            <Form.Label>Mes stars</Form.Label>
            <Form.Select onChange={(e) => handleChange(e)}>
              <option value="starFalse">Non</option>
              <option value="starTrue">Oui</option>
            </Form.Select>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Container>
      </Form>
    </>
  );
};

export default UpdateIdea;
