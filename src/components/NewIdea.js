import { useState } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Form,
  Row,
  ToggleButton,
} from "react-bootstrap";
import Header from "./Header";

const NewIdea = () => {
  const [newIdea, setNewIdea] = useState({
    logo: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    name: "",
    webSite: "",
    description: "",
    tags: [],
    access: [],
    language: [],
    star: false,
  });

  //* ========================= TAG ========================

  const tagArray = [
    "Marketing",
    "Développement",
    "Finance",
    "No-Code",
    "Automatisation",
  ];
  const [tagList, setTagList] = useState([]);

  const handleTag = (e) => {
    setTagList([...tagList, e]);
  };

  const handleRemoveTag = (e) => {
    const updateTagList = [...tagList].filter((tag) => tag !== e);
    setTagList(updateTagList);
  };

  //* ======================= ACCESS =======================

  const accessArray = ["gratuit", "gratuit 1 mois", "inscription", "payant"];
  const [accessList, setAccessList] = useState([]);

  const handleAccess = (e) => {
    setAccessList([...accessList, e]);
  };

  const handleRemoveAccess = (e) => {
    const updateAccessList = [...accessList].filter((access) => access !== e);
    setAccessList(updateAccessList);
  };

  //* ====================== LANGUAGE ======================

  const languageArray = ["français", "anglais"];
  const [languageList, setLanguageList] = useState([]);

  const handleLanguage = (e) => {
    setLanguageList([...languageList, e]);
  };

  const handleRemoveLanguage = (e) => {
    const updateLanguageList = [...languageList].filter((lang) => lang !== e);
    setLanguageList(updateLanguageList);
  };

  //* ======================================================

  const handleChange = (e) => {
    setNewIdea({ ...newIdea, [e.target.name]: e.target.value });
  };

  const handlePicture = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    console.log(e.target.files[0]);
    reader.onload = (e) => {
      setNewIdea({ ...newIdea, logo: e.target.result });
    };
  };

  const handleReset = () => {
    setNewIdea({
      logo: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
      name: "",
      webSite: "",
      description: "",
      tags: [],
      access: [],
      language: [],
      star: false,
    });
    setTagList([]);
    setAccessList([]);
    setLanguageList([]);
  };

  // console.log(newIdea);

  return (
    <>
      <Header />
      <Form className="pt-5 my-5">
        <Row>
          <Col sm={2} md={3} />
          <Col
            sm={8}
            md={6}
            className="text-secondary bg-light px-5 py-4 rounded"
          >
            <h1 className="mb-5 text-center">Ajouter une idée</h1>
            <Row>
              <Col
                xs={12}
                lg={6}
                className="d-flex flex-column justify-content-between"
              >
                {/* //* ======================== LOGO ======================== */}

                <div className="d-flex justify-content-center">
                  <img
                    src={newIdea.logo}
                    alt=""
                    height={100}
                    className="m-1 rounded"
                  />
                </div>
                <Form.Group className="my-2">
                  <Form.Label>Logo</Form.Label>
                  <Form.Control
                    type="file"
                    placeholder="Logo"
                    onChange={handlePicture}
                  />
                </Form.Group>

                {/* //* ======================== NAME ======================== */}

                <Form.Group className="mb-2">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={newIdea.name}
                    onChange={handleChange}
                    placeholder="Nom de l'idée"
                    required
                  />
                </Form.Group>

                {/* //* ==================== WEB SITE ==================== */}

                <Form.Group className="mb-2">
                  <Form.Label>Site web</Form.Label>
                  <Form.Control
                    type="text"
                    name="webSite"
                    value={newIdea.webSite}
                    onChange={handleChange}
                    placeholder="Ajouter un site"
                    required
                  />
                </Form.Group>

                {/* //* ==================== DESCRIPTION ==================== */}

                <Form.Group className="mb-2">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={newIdea.description}
                    onChange={handleChange}
                    placeholder="Ajouter une description"
                    required
                    style={{ height: "200px" }}
                  />
                </Form.Group>
              </Col>
              <Col
                xs={12}
                lg={6}
                className="d-flex flex-column justify-content-between"
              >
                {/* //* ======================== TAGS ======================== */}

                <div>
                  <div className="d-flex align-items-center">
                    <label>Tags</label>
                    <Button variant="outline-success" size="sm" className="m-2">
                      +
                    </Button>
                  </div>
                  <div>
                    <ButtonGroup className="d-flex flex-wrap" size="sm">
                      {tagArray.map((tag) => (
                        <ToggleButton
                          className="m-1 rounded"
                          key={tag}
                          value={tag}
                          type="checkbox"
                          variant="outline-success"
                          onClick={
                            tagList.includes(tag)
                              ? () => handleRemoveTag(tag)
                              : () => handleTag(tag)
                          }
                          checked={tagList.includes(tag)}
                        >
                          {tag.toUpperCase()}
                        </ToggleButton>
                      ))}
                    </ButtonGroup>
                  </div>
                </div>

                {/* //* ======================= ACCESS ======================= */}

                <div>
                  <div className="d-flex align-items-center">
                    <label>Accès</label>
                    <Button variant="outline-primary" size="sm" className="m-2">
                      +
                    </Button>
                  </div>

                  <div>
                    <ButtonGroup className="d-flex flex-wrap" size="sm">
                      {accessArray.map((access) => (
                        <ToggleButton
                          className="m-1 rounded"
                          key={access}
                          value={access}
                          type="checkbox"
                          variant="outline-primary"
                          onClick={
                            accessList.includes(access)
                              ? () => handleRemoveAccess(access)
                              : () => handleAccess(access)
                          }
                          checked={accessList.includes(access)}
                        >
                          {access.toUpperCase()}
                        </ToggleButton>
                      ))}
                    </ButtonGroup>
                  </div>
                </div>

                {/* //* ====================== LANGUAGE ====================== */}

                <div>
                  <div className="d-flex align-items-center">
                    <label>Langue</label>
                    <Button variant="outline-danger" size="sm" className="m-2">
                      +
                    </Button>
                  </div>

                  <div>
                    <ButtonGroup className="d-flex flex-wrap" size="sm">
                      {languageArray.map((lang) => (
                        <ToggleButton
                          className="m-1 rounded"
                          key={lang}
                          value={lang}
                          type="checkbox"
                          variant="outline-danger"
                          onClick={
                            languageList.includes(lang)
                              ? () => handleRemoveLanguage(lang)
                              : () => handleLanguage(lang)
                          }
                          checked={languageList.includes(lang)}
                        >
                          {lang.toUpperCase()}
                        </ToggleButton>
                      ))}
                    </ButtonGroup>
                  </div>
                </div>

                {/* //* ======================== STAR ======================== */}

                <div>
                  <label>Star</label>
                  <div>
                    <ButtonGroup>
                      <ToggleButton
                        type="radio"
                        checked={newIdea.star}
                        onClick={() =>
                          setNewIdea({ ...newIdea, star: !newIdea.star })
                        }
                        variant="outline-warning"
                        size="sm"
                      >
                        {newIdea.star ? "Oui" : "Non"}
                      </ToggleButton>
                    </ButtonGroup>
                  </div>
                </div>
              </Col>

              {/* //* ==================== SUBMIT BUTTON ==================== */}

              <Row>
                <Col xs={4} />
                <Col xs={4} className="text-center">
                  <div className="d-grid gap-2 mt-5">
                    <Button variant="outline-success" type="submit">
                      Valider
                    </Button>
                  </div>
                  <div
                    className="text-danger mt-2"
                    style={{ cursor: "pointer" }}
                  >
                    <p onClick={handleReset}>Réinitialiser</p>
                  </div>
                </Col>
                <Col xs={4} />
              </Row>
            </Row>
          </Col>
          <Col sm={2} md={3} />
        </Row>
      </Form>
    </>
  );
};

export default NewIdea;
