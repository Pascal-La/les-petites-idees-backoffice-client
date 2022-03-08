import { useRef, useState } from "react";
import { ButtonGroup, Col, Form, Row, ToggleButton } from "react-bootstrap";
import {
  ButtonInput,
  ButtonInputLabel,
  LogoInput,
  SubmitButton,
  TextInput,
} from "../components/FormInput";
import Header from "../components/Header";

const UpdateIdea = () => {
  const [updateIdea, setUpdateIdea] = useState({
    logo: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    name: "",
    webSite: "",
    description: "",
    tags: [],
    access: [],
    language: [],
    star: false,
  });

  const logoRef = useRef();

  const handleLogoRef = () => {
    logoRef.current.click();
  };

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
    setUpdateIdea({ ...updateIdea, [e.target.name]: e.target.value });
  };

  const handlePicture = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    console.log(e.target.files[0]);
    reader.onload = (e) => {
      setUpdateIdea({ ...updateIdea, logo: e.target.result });
    };
  };

  const handleReset = () => {
    setUpdateIdea({
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

  // console.log(updateIdea);

  return (
    <>
      <Header />
      <Form className="pt-5 my-5">
        <Row>
          <Col />
          <Col
            xs={10}
            sm={8}
            md={6}
            className="text-secondary bg-light px-5 py-4 rounded"
          >
            <h1 className="mb-5 text-center">Modifier une idée</h1>
            <Row>
              <Col
                xs={12}
                lg={6}
                className="d-flex flex-column justify-content-between"
              >
                {/* //* ======================== LOGO ======================== */}

                <div className="d-flex flex-column justify-content-center mb-2">
                  <LogoInput
                    src={updateIdea.logo}
                    alt={updateIdea.name}
                    height={100}
                    className="m-1 rounded"
                    onClick={handleLogoRef}
                  />
                  <Form.Control
                    ref={logoRef}
                    type="file"
                    placeholder="Logo"
                    onChange={handlePicture}
                    hidden
                  />
                </div>

                {/* //* ======================== NAME ======================== */}

                <TextInput
                  label="Nom"
                  type="text"
                  name="name"
                  value={updateIdea.name}
                  onChange={handleChange}
                  placeholder="Nom de l'idée"
                  required
                />

                {/* //* ==================== WEB SITE ==================== */}

                <TextInput
                  label="Site web"
                  type="text"
                  name="webSite"
                  value={updateIdea.webSite}
                  onChange={handleChange}
                  placeholder="Ajouter un site"
                  required
                />

                {/* //* ==================== DESCRIPTION ==================== */}

                <TextInput
                  label="Description"
                  as="textarea"
                  name="description"
                  value={updateIdea.description}
                  onChange={handleChange}
                  placeholder="Ajouter une description"
                  required
                  style={{ height: "200px" }}
                />
              </Col>
              <Col
                xs={12}
                lg={6}
                className="d-flex flex-column justify-content-between"
              >
                {/* //* ======================== TAGS ======================== */}

                <div>
                  <ButtonInputLabel label="Tags" variant="outline-success">
                    {tagArray.map((tag) => (
                      <ButtonInput
                        key={tag}
                        tag={tag}
                        value={tag}
                        variant="outline-success"
                        onClick={
                          tagList.includes(tag)
                            ? () => handleRemoveTag(tag)
                            : () => handleTag(tag)
                        }
                        checked={tagList.includes(tag)}
                      />
                    ))}
                  </ButtonInputLabel>
                </div>

                {/* //* ======================= ACCESS ======================= */}

                <div>
                  <ButtonInputLabel label="Accès" variant="outline-primary">
                    {accessArray.map((access) => (
                      <ButtonInput
                        key={access}
                        tag={access}
                        value={access}
                        variant="outline-primary"
                        onClick={
                          accessList.includes(access)
                            ? () => handleRemoveAccess(access)
                            : () => handleAccess(access)
                        }
                        checked={accessList.includes(access)}
                      />
                    ))}
                  </ButtonInputLabel>
                </div>

                {/* //* ====================== LANGUAGE ====================== */}

                <div>
                  <ButtonInputLabel label="Langue" variant="outline-danger">
                    {languageArray.map((lang) => (
                      <ButtonInput
                        key={lang}
                        tag={lang}
                        value={lang}
                        variant="outline-danger"
                        onClick={
                          languageList.includes(lang)
                            ? () => handleRemoveLanguage(lang)
                            : () => handleLanguage(lang)
                        }
                        checked={languageList.includes(lang)}
                      />
                    ))}
                  </ButtonInputLabel>
                </div>

                {/* //* ======================== STAR ======================== */}

                <div>
                  <label>Star</label>
                  <div>
                    <ButtonGroup>
                      <ToggleButton
                        className="m-1 rounded"
                        type="radio"
                        checked={updateIdea.star}
                        onClick={() =>
                          setUpdateIdea({
                            ...updateIdea,
                            star: !updateIdea.star,
                          })
                        }
                        variant="outline-warning"
                        size="sm"
                      >
                        {updateIdea.star ? "Oui" : "Non"}
                      </ToggleButton>
                    </ButtonGroup>
                  </div>
                </div>
              </Col>

              {/* //* ==================== SUBMIT BUTTON ==================== */}

              <Row>
                <Col />
                <Col xs={8} sm={4} lg={3} className="text-center">
                  <SubmitButton onClick={handleReset} />
                </Col>
                <Col />
              </Row>
            </Row>
          </Col>
          <Col />
        </Row>
      </Form>
    </>
  );
};

export default UpdateIdea;
