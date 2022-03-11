import { useEffect, useRef, useState } from "react";
import { ButtonGroup, Col, Form, Row, ToggleButton } from "react-bootstrap";
import axios from "axios";

import { useAuthState } from "../context/auth";
import useBadge from "../hooks/useBadge";

import {
  BadgePill,
  ButtonInput,
  ButtonInputLabel,
  LogoInput,
  SubmitButton,
  TextInput,
} from "../components/FormInput";

const defaultLogo =
  "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";

const NewIdea = () => {
  const { token } = useAuthState();

  const [newIdea, setNewIdea] = useState({
    logo: defaultLogo,
    name: "",
    webSite: "",
    description: "",
    tags: [],
    access: [],
    language: [],
    star: false,
  });
  const [loading, setLoading] = useState(false);
  const [fetchData, setFetchData] = useState([]);

  // onChange tags, access & languages
  const [newBadge, setNewBadge] = useState({
    tags: "",
    access: "",
    lang: "",
  });

  // Custom Hook to select and remove tags, access & language badges on click
  const [SelectBadge, RemoveBadge] = useBadge();

  // Aim the file input by clicking <img>
  const logoRef = useRef();
  const handleLogoRef = () => {
    logoRef.current.click();
  };

  //* ====================== FETCH IDEAS ======================

  const fetchIdeas = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        "http://localhost:5000/api/ideas/idealist/",
        config
      );
      setFetchData(data);
    } catch (error) {
      console.log(error);
    }
  };

  //* ====================== SUBMIT FORM ======================

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.post(
        "http://localhost:5000/api/ideas/newidea/",
        {
          logo: newIdea.logo,
          name: newIdea.name,
          webSite: newIdea.webSite,
          description: newIdea.description,
          tags: tagList.toUpperCase(),
          access: accessList.toUpperCase(),
          language: langList.toUpperCase(),
          star: newIdea.star,
        },
        config
      );
      setLoading(false);
      window.location.href = "/";
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //* ====================== RESET FORM ======================

  const handleReset = () => {
    setNewIdea({
      logo: defaultLogo,
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
    setLangList([]);
  };

  //* ======================== TAGS ========================

  const [tagList, setTagList] = useState([]);
  let fetchTags = []; // Pushing the tags from fetchData
  fetchData.map((data) => fetchTags.push(...data.tags));
  const tagArray = Array.from(new Set(fetchTags)); // Removing doubles

  const addNewTag = () => {
    if (tagList.includes(newBadge.tags)) return;
    tagList.push(newBadge.tags);
    setNewBadge({ ...newBadge, tags: "" }); // Clearing the input
  };

  //* ======================= ACCESS =======================

  const [accessList, setAccessList] = useState([]);
  let fetchAccess = []; // Pushing the access from fetchData
  fetchData.map((data) => fetchAccess.push(...data.access));
  const accessArray = Array.from(new Set(fetchAccess)); // Removing doubles

  const addNewAccess = () => {
    if (accessList.includes(newBadge.access)) return;
    accessList.push(newBadge.access);
    setNewBadge({ ...newBadge, access: "" }); // Clearing the input
  };

  //* ====================== LANGUAGE ======================

  const [langList, setLangList] = useState([]);
  let fetchLang = []; // Pushing the language from fetchData
  fetchData.map((data) => fetchLang.push(...data.language));
  const langArray = Array.from(new Set(fetchLang)); // Removing doubles

  const addNewLang = () => {
    if (langList.includes(newBadge.lang)) return;
    langList.push(newBadge.lang);
    setNewBadge({ ...newBadge, lang: "" }); // Clearing the input
  };

  //* ======================================================

  const handleChange = (e) => {
    setNewIdea({ ...newIdea, [e.target.name]: e.target.value });
  };

  const handleNewBadge = (e) => {
    setNewBadge({ ...newBadge, [e.target.name]: e.target.value });
  };

  const handlePicture = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    console.log(e.target.files[0]);
    reader.onload = (e) => {
      setNewIdea({ ...newIdea, logo: e.target.result });
    };
  };

  useEffect(() => fetchIdeas(), []);

  return (
    <>
      <Form className="pt-5 my-5" onSubmit={handleSubmit}>
        <Row>
          <Col />
          <Col
            xs={10}
            sm={8}
            md={6}
            className="text-secondary px-5 py-4 rounded"
            style={{ backgroundColor: "#ffffff80" }}
          >
            <h1 className="mb-5 mt-3 text-center">Ajouter une idée</h1>
            <Row>
              <Col
                xs={12}
                lg={6}
                className="d-flex flex-column justify-content-between"
              >
                {/* //* ======================== LOGO ======================== */}

                <div className="d-flex flex-column justify-content-center mb-3">
                  <LogoInput
                    src={newIdea.logo}
                    alt={newIdea.name}
                    height={200}
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
                  value={newIdea.name}
                  onChange={handleChange}
                  placeholder="Nom de l'idée"
                  required
                />

                {/* //* ==================== WEB SITE ==================== */}

                <TextInput
                  label="Site web"
                  type="text"
                  name="webSite"
                  value={newIdea.webSite}
                  onChange={handleChange}
                  placeholder="Ajouter un site"
                  required
                />

                {/* //* ==================== DESCRIPTION ==================== */}

                <TextInput
                  label="Description"
                  as="textarea"
                  name="description"
                  value={newIdea.description}
                  onChange={handleChange}
                  placeholder="Ajouter une description"
                  required
                  style={{ height: "150px" }}
                />
              </Col>
              <Col
                xs={12}
                lg={6}
                className="d-flex flex-column justify-content-between"
              >
                {/* //* ======================== TAGS ======================== */}

                <div className="mb-3 p-3">
                  <ButtonInputLabel
                    label="tags"
                    name="tags"
                    value={newBadge.tags}
                    onChange={handleNewBadge}
                    onClick={addNewTag}
                    variant="outline-success"
                  >
                    <div>
                      {tagArray.map(
                        (tag, index) =>
                          tag !== "" && (
                            <ButtonInput
                              key={index}
                              value={tag}
                              variant="outline-success"
                              onClick={
                                tagList.includes(tag)
                                  ? () => RemoveBadge(tag, tagList, setTagList)
                                  : () => SelectBadge(tag, tagList, setTagList)
                              }
                              checked={tagList.includes(tag)}
                            />
                          )
                      )}
                    </div>
                    <div style={{ width: "100%", marginLeft: "1.5em" }}>
                      {tagList.length > 0 && (
                        <div className="my-2">
                          <i>Tags sélectionnés:</i>
                        </div>
                      )}
                      {tagList.map((tag, index) => (
                        <BadgePill
                          key={index}
                          value={tag}
                          bg="success"
                          onClick={() => RemoveBadge(tag, tagList, setTagList)}
                        />
                      ))}
                    </div>
                  </ButtonInputLabel>
                </div>

                {/* //* ======================= ACCESS ======================= */}

                <div className="mb-3 p-3">
                  <ButtonInputLabel
                    label="accès"
                    name="access"
                    value={newBadge.access}
                    onChange={handleNewBadge}
                    onClick={addNewAccess}
                    variant="outline-primary"
                  >
                    <div>
                      {accessArray.map(
                        (access, index) =>
                          access !== "" && (
                            <ButtonInput
                              key={index}
                              value={access}
                              variant="outline-primary"
                              onClick={
                                accessList.includes(access)
                                  ? () =>
                                      RemoveBadge(
                                        access,
                                        accessList,
                                        setAccessList
                                      )
                                  : () =>
                                      SelectBadge(
                                        access,
                                        accessList,
                                        setAccessList
                                      )
                              }
                              checked={accessList.includes(access)}
                            />
                          )
                      )}
                    </div>
                    <div style={{ width: "100%", marginLeft: "1.5em" }}>
                      {accessList.length > 0 && (
                        <div className="my-2">
                          <i>Accès sélectionnés:</i>
                        </div>
                      )}
                      {accessList.map((access, index) => (
                        <BadgePill
                          key={index}
                          value={access}
                          onClick={() =>
                            RemoveBadge(access, accessList, setAccessList)
                          }
                        />
                      ))}
                    </div>
                  </ButtonInputLabel>
                </div>

                {/* //* ====================== LANGUAGE ====================== */}

                <div className="mb-3 p-3">
                  <ButtonInputLabel
                    label="langues"
                    name="lang"
                    value={newBadge.lang}
                    onChange={handleNewBadge}
                    onClick={addNewLang}
                    variant="outline-danger"
                  >
                    <div>
                      {langArray.map(
                        (lang, index) =>
                          lang !== "" && (
                            <ButtonInput
                              key={index}
                              value={lang}
                              variant="outline-danger"
                              onClick={
                                langList.includes(lang)
                                  ? () =>
                                      RemoveBadge(lang, langList, setLangList)
                                  : () =>
                                      SelectBadge(lang, langList, setLangList)
                              }
                              checked={langList.includes(lang)}
                            />
                          )
                      )}
                    </div>
                    <div style={{ width: "100%", marginLeft: "1.5em" }}>
                      {langList.length > 0 && (
                        <div className="my-2">
                          <i>Langues sélectionnées:</i>
                        </div>
                      )}
                      {langList.map((lang, index) => (
                        <BadgePill
                          key={index}
                          value={lang}
                          bg="danger"
                          onClick={() =>
                            RemoveBadge(lang, langList, setLangList)
                          }
                        />
                      ))}
                    </div>
                  </ButtonInputLabel>
                </div>

                {/* //* ======================== STAR ======================== */}

                <div className="mb-3 p-3">
                  <label>STAR</label>
                  <div>
                    <ButtonGroup>
                      <ToggleButton
                        className="m-1 rounded"
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
                <Col />
                <Col xs={8} sm={4} lg={3} className="text-center">
                  <SubmitButton loading={loading} onClick={handleReset} />
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

export default NewIdea;
