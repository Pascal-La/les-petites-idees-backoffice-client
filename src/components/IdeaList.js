import axios from "axios";
import { shuffle } from "lodash";
import { useEffect, useState } from "react";
import {
  Badge,
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
import { BadgePill } from "./FormInput";

const randomGreetings = [
  "Coucou",
  "Bonjour",
  "Salut",
  "Aloha",
  "Hello",
  "Sayonara",
  "Holà",
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

  useEffect(() => {
    setGreeting(shuffle(randomGreetings).pop());
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

  useEffect(() => {
    const selectValue = () => {
      if (sortingSelect === "default") fetchIdeas();
      else if (sortingSelect === "sortedNameAsc") {
        sortNameAsc();
        setSortedNameAsc(!sortedNameAsc);
      } else if (sortingSelect === "sortedNameDesc") {
        sortNameDesc();
        setSortedNameAsc(!sortedNameAsc);
      } else if (sortingSelect === "sortedStarTrue") {
        setSortedStar(!sortedStar);
        sortStar();
      } else if (sortingSelect === "sortedStarFalse") {
        setSortedStar(!sortedStar);
        sortUndoStar();
      }
    };
    selectValue();
  }, [sortingSelect]);

  //* ============================== SORT BY NAME ==============================

  const useSortNameAsc = (arr) => {
    return () => arr.sort((a, b) => a.name.localeCompare(b.name));
  };

  const useSortNameDesc = (arr) => {
    return () => arr.sort((a, b) => b.name.localeCompare(a.name));
  };

  const sortNameAsc = useSortNameAsc(ideas);
  const sortNameDesc = useSortNameDesc(ideas);

  //* ============================== SORT BY STAR ==============================

  const useSortStar = (arr) => {
    return () => arr.sort((a, b) => (a.star === b.star ? 0 : a.star ? -1 : 1));
  };

  const useUndoSortStar = (arr) => {
    return () => arr.sort((a, b) => (a.star === b.star ? 0 : b.star ? -1 : 1));
  };

  const sortStar = useSortStar(ideas);
  const sortUndoStar = useUndoSortStar(ideas);

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
          <Col
            className="d-flex flex-column align-items-center py-5 mt-5 rounded"
            style={{ backgroundColor: "#4749f450" }}
          >
            <img src={logo} alt="" width={150} />
            <h3
              className="py-2 px-3 rounded"
              style={{
                backgroundColor: "#04047cdd",
                color: "#f2d347",
                fontStyle: "italic",
              }}
            >
              {user && `${greeting}, ${user.firstname}`}
            </h3>
          </Col>
          <Row
            className="mt-1 p-5 text-center"
            style={{ backgroundColor: "#4749f440" }}
          >
            <Col xs={1} />
            <Col xs={3}>
              <InputGroup>
                <FormControl
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Recherche par mot-clé..."
                />
              </InputGroup>
            </Col>
            <Col xs={3}>
              <Form.Select onChange={(e) => handleChange(e)}>
                <option value="default">Trier par...</option>
                <option value="sortedNameAsc">Nom de A à Z</option>
                <option value="sortedNameDesc">Nom de Z à A</option>
                <option value="sortedStarTrue">Stars en premiers</option>
                <option value="sortedStarFalse">Stars en derniers</option>
              </Form.Select>
            </Col>
            <Col>
              <a href="/">
                <Button>Réinitialiser</Button>
              </a>
            </Col>
            <Col>
              <Link to="/newIdea">
                <Button variant="danger">+ Nouvelle idée</Button>
              </Link>
            </Col>
            <Col xs={1} />
          </Row>
          <Row
            className="mt-1 mb-1 p-5 text-center text-center"
            style={{ backgroundColor: "#4749f430" }}
          >
            <Col />
            <Col xs={6} className="text-start">
              {tagArray.map((tag, index) => (
                <BadgePill
                  key={index}
                  value={tag}
                  bg="success"
                  onClick={() => handleSearch(tag)}
                />
              ))}
            </Col>
            <Col xs={2}>
              {accessArray.map((access, index) => (
                <BadgePill
                  key={index}
                  value={access}
                  onClick={() => handleSearch(access)}
                />
              ))}
            </Col>
            <Col xs={2}>
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
        <div
          className="d-flex justify-content-center mt-5 pt-5 text-warning"
          style={{ height: "20vh" }}
        >
          <h1>Aucun résultat</h1>
        </div>
      ) : (
        //* ================ LOADING WHILE SEARCHING ================ */

        <Container className="mb-5">
          {searchLoading ? (
            <div
              className="d-flex justify-content-center mt-5 pt-5 text-warning"
              style={{ height: "100vh" }}
            >
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
                  <tbody key={index}>
                    <tr>
                      <td>
                        {result.star ? (
                          <Badge bg="warning">&#9733;</Badge>
                        ) : (
                          index + 1
                        )}
                      </td>
                      <img
                        className="rounded img-thumbnail"
                        src={result.logo}
                        alt={result.name}
                        height={80}
                        width={80}
                      />
                      <td>{result.name}</td>
                      <td>{result.webSite}</td>
                      <td>{result.description}</td>
                      <td>
                        {result.tags.map((tag) => (
                          <Badge key={tag} pill bg="success">
                            {tag.toUpperCase()}
                          </Badge>
                        ))}
                      </td>
                      <td>
                        {result.access.map((access) => (
                          <Badge key={access} pill>
                            {access.toUpperCase()}
                          </Badge>
                        ))}
                      </td>
                      <td>
                        {result.language.map((lang) => (
                          <Badge key={lang} pill bg="danger">
                            {lang.toUpperCase()}
                          </Badge>
                        ))}
                      </td>
                      <td>
                        <Link
                          to={`/update/${result._id}`}
                          // pass the idea's id as string to <App />
                          onClick={() => ideaId(result._id)}
                          className="text-black"
                        >
                          <Button variant="warning">&#9998;</Button>
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                ))}

              {/* //* ================ INITIAL RESULT ================ */}

              {!search.length > 0 &&
                ideas.map((idea, index) => (
                  <tbody key={index}>
                    <tr>
                      <td>
                        {idea.star ? (
                          <Badge bg="warning">&#9733;</Badge>
                        ) : (
                          index + 1
                        )}
                      </td>
                      <img
                        className="rounded img-thumbnail"
                        src={idea.logo}
                        alt={idea.name}
                        height={80}
                        width={80}
                      />
                      <td>{idea.name}</td>
                      <td>{idea.webSite}</td>
                      <td>{idea.description}</td>
                      <td>
                        {idea.tags.map((tag) => (
                          <Badge key={tag} pill bg="success">
                            {tag.toUpperCase()}
                          </Badge>
                        ))}
                      </td>
                      <td>
                        {idea.access.map((access) => (
                          <Badge key={access} pill>
                            {access.toUpperCase()}
                          </Badge>
                        ))}
                      </td>
                      <td>
                        {idea.language.map((lang) => (
                          <Badge key={lang} pill bg="danger">
                            {lang.toUpperCase()}
                          </Badge>
                        ))}
                      </td>
                      <td>
                        <Link
                          to={`/update/${idea._id}`}
                          // pass the idea's id as string to <App />
                          onClick={() => ideaId(idea._id)}
                          className="text-black"
                        >
                          <Button variant="warning">&#9998;</Button>
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                ))}
            </Table>
          )}
        </Container>
      )}
    </>
  );
};

export default IdeaList;
