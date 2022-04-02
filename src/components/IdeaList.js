import axios from "axios";
import { shuffle } from "lodash";
import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import logo from "../assets/logo.png";

import { useAuthState } from "../context/auth";
import useSort from "../hooks/useSort";

import { BadgePill } from "./FormInput";
import TableBody from "./TableBody";

const randomGreetings = [
  "Bonjour",
  "Hello",
  "Ciao",
  "Hola",
  "Olà ",
  "Aloha",
  "Kaliméra",
  "សួស្តី",
  "你好",
  "नमस्कार ",
  "こんにちは",
  "안녕하세요",
];

const randomEmoji = [
  <>&#9757;</>,
  <>&#9995;</>,
  <>&#9994;</>,
  <>&#9996;</>,
  <>&#127940;</>,
  <>&#128075;</>,
  <>&#128406;</>,
  <>&#128400;</>,
  <>&#128405;</>,
  <>&#128716;</>,
  <>&#129311;</>,
];

const IdeaList = ({ ideaId }) => {
  const { user, token } = useAuthState();

  const [ideas, setIdeas] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [sortedNameAsc, setSortedNameAsc] = useState(false);
  const [sortedStar, setSortedStar] = useState(false);
  const [sortingSelect, setSortingSelect] = useState("default");

  const [greeting, setGreeting] = useState(null);
  const [emoji, setEmoji] = useState(null);

  useEffect(() => {
    setGreeting(shuffle(randomGreetings).pop());
    setEmoji(shuffle(randomEmoji).pop());
  }, []);

  //* ======================== FETCH ALL THE IDEAS ========================

  const fetchIdeas = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      setSearchLoading(true);
      const { data } = await axios.get(
        "http://localhost:5000/api/ideas/idealist",
        config
      );
      setSearchLoading(false);
      setIdeas(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

  //* ======================== QUERY IDEAS ========================

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) return;

    try {
      setSearchLoading(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `http://localhost:5000/api/ideas/searchideas?search=${search}`,
        config
      );
      setSearchLoading(false);
      setSearchResult(data);
    } catch (error) {
      console.log(error);
    }
  };

  //* ============================== SELECT ORDER ==============================

  const handleChange = (e) => {
    setSortingSelect(e.target.value);
  };

  const [SortNameAsc, SortNameDesc, SortStar, UndoSortStar] = useSort();

  useEffect(() => {
    const selectValue = () => {
      if (sortingSelect === "default") fetchIdeas();
      else if (sortingSelect === "sortedNameAsc") {
        SortNameAsc(ideas);
        setSortedNameAsc(!sortedNameAsc);
      } else if (sortingSelect === "sortedNameDesc") {
        SortNameDesc(ideas);
        setSortedNameAsc(!sortedNameAsc);
      } else if (sortingSelect === "sortedStarTrue") {
        setSortedStar(!sortedStar);
        SortStar(ideas);
      } else if (sortingSelect === "sortedStarFalse") {
        setSortedStar(!sortedStar);
        UndoSortStar(ideas);
      }
    };
    selectValue();
  }, [sortingSelect]);

  //* ============================== SEARCH BY BADGE ==============================

  let fetchTags = []; // Pushing the tags from ideas
  ideas.map((data) => fetchTags.push(...data.tags));
  const tagArray = Array.from(new Set(fetchTags)); // Removing doubles

  let fetchAccess = []; // Pushing the access from ideas
  ideas.map((data) => fetchAccess.push(...data.access));
  const accessArray = Array.from(new Set(fetchAccess)); // Removing doubles

  let fetchLang = []; // Pushing the language from ideas
  ideas.map((data) => fetchLang.push(...data.language));
  const langArray = Array.from(new Set(fetchLang)); // Removing doubles

  return (
    <>
      <Container>
        <Col>
          {/* //* =================== HEADER PART =================== */}
          <Col
            className="d-flex flex-column align-items-center py-4 rounded"
            style={{
              backgroundColor: "#4749f450",
              marginTop: "6em",
              userSelect: "none",
            }}
          >
            <img src={logo} alt="" width={150} />
            <h3
              className="py-2 px-3 rounded"
              style={{
                backgroundColor: "#04047cdd",
                color: "#f2d347",
                fontStyle: "italic",
                userSelect: "none",
              }}
            >
              {user && `${greeting}, ${user.firstname}`} {emoji}
            </h3>
          </Col>
          {/* //* =================== SEARCH PART =================== */}
          <Row
            className="mt-1 p-4 text-center"
            style={{ backgroundColor: "#4749f440" }}
          >
            <Col xs={1} />
            <Col xs={12} md={3}>
              <InputGroup>
                <FormControl
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Recherche par mot-clé..."
                />
              </InputGroup>
            </Col>
            <Col xs={12} md={3}>
              <Form.Select onChange={(e) => handleChange(e)}>
                <option value="default">Trier par...</option>
                <option value="sortedNameAsc">Nom de A à Z</option>
                <option value="sortedNameDesc">Nom de Z à A</option>
                <option value="sortedStarTrue">Stars en premiers</option>
                <option value="sortedStarFalse">Stars en derniers</option>
              </Form.Select>
            </Col>
            <Col xs={12} md={2}>
              <a href="/">
                <Button>Réinitialiser</Button>
              </a>
            </Col>
            <Col xs={12} md={2}>
              <Link to="/newIdea">
                <Button variant="danger">+ Nouvelle idée</Button>
              </Link>
            </Col>
            <Col xs={1} />
          </Row>

          {/* //* =================== BADGES PART =================== */}

          <Row
            className="mt-1 mb-1 p-4 text-center"
            style={{ backgroundColor: "#4749f430", userSelect: "none" }}
          >
            <Col />
            <Col xs={12} md={6} className="text-start">
              {tagArray.map((tag, index) => (
                <BadgePill
                  key={index}
                  value={tag}
                  bg="success"
                  onClick={() => handleSearch(tag)}
                />
              ))}
            </Col>
            <Col xs={12} md={2}>
              {accessArray.map((access, index) => (
                <BadgePill
                  key={index}
                  value={access}
                  onClick={() => handleSearch(access)}
                />
              ))}
            </Col>
            <Col xs={12} md={2}>
              {langArray.map((lang, index) => (
                <BadgePill
                  key={index}
                  value={lang}
                  bg="danger"
                  onClick={() => handleSearch(lang)}
                />
              ))}
            </Col>
            <Col />
          </Row>
        </Col>
      </Container>

      {/* //* ================ SEARCH: NO RESULT ================ */}

      {searchResult.length === 0 && search.length > 0 && !searchLoading ? (
        <div className="d-flex justify-content-center mt-5 pt-5 text-warning">
          <h1>Aucun résultat</h1>
        </div>
      ) : (
        //* ================ LOADING WHILE SEARCHING ================ */

        <Container className="mb-5">
          {searchLoading ? (
            <div className="d-flex justify-content-center mt-5 pt-5 text-warning">
              <Spinner animation="border" style={{ fontSize: "10em" }} />
            </div>
          ) : (
            <Table responsive style={{ backgroundColor: "#4749f420" }}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Logo</th>
                  <th>Nom</th>
                  <th>Site web</th>
                  <th>Description</th>
                  <th>Tags</th>
                  <th>Accès</th>
                  <th>Langue</th>
                  {/* <th>&#9733;</th> */}
                </tr>
              </thead>
              {/* //* ================ SEARCH RESULT ================ */}
              {search.length >= 1 &&
                searchResult.map((result, index) => (
                  <TableBody
                    key={index}
                    value={result}
                    index={index}
                    onClick={() => ideaId(result._id)}
                  />
                ))}
              {/* //* ================ INITIAL RESULT ================ */}
              {!search.length > 0 &&
                ideas.map((idea, index) => (
                  <TableBody
                    key={index}
                    value={idea}
                    index={index}
                    onClick={() => ideaId(idea._id)}
                  />
                ))}
            </Table>
          )}
        </Container>
      )}
    </>
  );
};

export default IdeaList;
