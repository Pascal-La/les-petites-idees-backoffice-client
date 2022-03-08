import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { ButtonGroup, Col, Form, Row, ToggleButton } from "react-bootstrap";
import {
  ButtonInput,
  ButtonInputLabel,
  LogoInput,
  SubmitButton,
  TextInput,
} from "../components/FormInput";
import Header from "../components/Header";
import useBadge from "../hooks/useBadge";

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
  const [loading, setLoading] = useState(false);
  const [fetchData, setFetchData] = useState([]);

  // Custom Hook to select and remove
  // tags, access & language badges on click
  const [SelectBadge, RemoveBadge] = useBadge();

  // Aim the file input clicking <img>
  const logoRef = useRef();
  const handleLogoRef = () => {
    logoRef.current.click();
  };

  //* ========================= TAG ========================

  const [tagList, setTagList] = useState([]);
  let fetchTags = [];
  // Pushing the tags into fetchTags from fetchData
  fetchData.map((data) => fetchTags.push(...data.tags));
  // Sanitize the array: removing doubles
  const tagArray = Array.from(new Set(fetchTags));

  const addNewTag = () => {};

  //* ======================= ACCESS =======================

  const [accessList, setAccessList] = useState([]);
  let fetchAccess = [];
  // Pushing the access into fetchAccess from fetchData
  fetchData.map((data) => fetchAccess.push(...data.access));
  // Sanitize the array: removing doubles
  const accessArray = Array.from(new Set(fetchAccess));

  const addNewAccess = () => {};

  //* ====================== LANGUAGE ======================

  const [langList, setLangList] = useState([]);
  let fetchLang = [];
  // Pushing the language into fetchLang from fetchData
  fetchData.map((data) => fetchLang.push(...data.language));
  // Sanitize the array: removing doubles
  const langArray = Array.from(new Set(fetchLang));

  const addNewLang = () => {};

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

  //* ====================== RESET FORM ======================

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
    setLangList([]);
  };

  //* ====================== SUBMIT FORM ======================

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/ideas/addNewIdea/", {
        logo: newIdea.logo,
        name: newIdea.name,
        webSite: newIdea.webSite,
        description: newIdea.description,
        tags: tagList,
        access: accessList,
        language: langList,
        star: newIdea.star,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //* ====================== FETCH IDEAS ======================

  const fetchIdea = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/ideas/getAllIdeas/"
      );
      setFetchData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => fetchIdea(), []);

  console.log(tagList);

  return (
    <>
      <Header />
      <Form className="pt-5 my-5" onSubmit={handleSubmit}>
        <Row>
          <Col />
          <Col
            xs={10}
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

                <div className="d-flex flex-column justify-content-center mb-2">
                  <LogoInput
                    src={newIdea.logo}
                    alt={newIdea.name}
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
                  <ButtonInputLabel
                    label="Tags"
                    onClick={addNewTag}
                    variant="outline-success"
                  >
                    {tagArray.map((tag, index) => (
                      <ButtonInput
                        key={index}
                        tag={tag}
                        value={tag}
                        variant="outline-success"
                        onClick={
                          tagList.includes(tag)
                            ? () => RemoveBadge(tag, tagList, setTagList)
                            : () => SelectBadge(tag, tagList, setTagList)
                        }
                        checked={tagList.includes(tag)}
                      />
                    ))}
                  </ButtonInputLabel>
                </div>

                {/* //* ======================= ACCESS ======================= */}

                <div>
                  <ButtonInputLabel
                    label="Accès"
                    onClick={addNewAccess}
                    variant="outline-primary"
                  >
                    {accessArray.map((access, index) => (
                      <ButtonInput
                        key={index}
                        tag={access}
                        value={access}
                        variant="outline-primary"
                        onClick={
                          accessList.includes(access)
                            ? () =>
                                RemoveBadge(access, accessList, setAccessList)
                            : () =>
                                SelectBadge(access, accessList, setAccessList)
                        }
                        checked={accessList.includes(access)}
                      />
                    ))}
                  </ButtonInputLabel>
                </div>

                {/* //* ====================== LANGUAGE ====================== */}

                <div>
                  <ButtonInputLabel
                    label="Langue"
                    onClick={addNewLang}
                    variant="outline-danger"
                  >
                    {langArray.map((lang, index) => (
                      <ButtonInput
                        key={index}
                        tag={lang}
                        value={lang}
                        variant="outline-danger"
                        onClick={
                          langList.includes(lang)
                            ? () => RemoveBadge(lang, langList, setLangList)
                            : () => SelectBadge(lang, langList, setLangList)
                        }
                        checked={langList.includes(lang)}
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
