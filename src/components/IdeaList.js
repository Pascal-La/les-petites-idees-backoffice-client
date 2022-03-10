import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Badge, Button, Container, Form, Table } from "react-bootstrap";
import axios from "axios";

import { useAuthState } from "../context/auth";

const IdeaList = ({ ideaId }) => {
  const { user, token } = useAuthState();

  // console.log({user});

  const [ideas, setIdeas] = useState([]);
  const [sortedNameAsc, setSortedNameAsc] = useState(false);
  const [sortedStar, setSortedStar] = useState(false);
  const [sortingSelect, setSortingSelect] = useState("default");

  const fetchIdeas = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/ideas/idealist",
        config
      );
      setIdeas(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

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
    const [state, setState] = useState([]);
    return () => setState(arr.sort((a, b) => a.name.localeCompare(b.name)));
  };

  const useSortNameDesc = (arr) => {
    const [state, setState] = useState([]);
    return () => setState(arr.sort((a, b) => b.name.localeCompare(a.name)));
  };

  const sortNameAsc = useSortNameAsc(ideas);
  const sortNameDesc = useSortNameDesc(ideas);

  //* ============================== SORT BY STAR ==============================

  const useSortStar = (arr) => {
    const [state, setState] = useState([]);
    return () =>
      setState(arr.sort((a, b) => (a.star === b.star ? 0 : a.star ? -1 : 1)));
  };

  const useUndoSortStar = (arr) => {
    const [state, setState] = useState([]);
    return () =>
      setState(arr.sort((a, b) => (a.star === b.star ? 0 : b.star ? -1 : 1)));
  };

  const sortStar = useSortStar(ideas);
  const sortUndoStar = useUndoSortStar(ideas);

  return (
    <>
      <div className="d-flex pt-5 mt-5 justify-content-center">
        <h1 style={{ color: "#4749f4" }}>
          {user && `Bienvenue, ${user.firstname}`}
        </h1>
      </div>
      <div className="d-flex mt-4 justify-content-center">
        <div>
          <Form.Select onChange={(e) => handleChange(e)}>
            <option value="default">Trier par...</option>
            {/* <option value="default">Défault</option> */}
            <option value="sortedNameAsc">Nom de A à Z</option>
            <option value="sortedNameDesc">Nom de Z à A</option>
            <option value="sortedStarTrue">Stars en premiers</option>
            <option value="sortedStarFalse">Stars en derniers</option>
          </Form.Select>
        </div>
        <Link to="/newIdea">
          <Button>Ajouter une idée</Button>
        </Link>
      </div>
      <Container>
        <Table responsive size="sm" hover className="mt-4">
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
              <th>&#9733;</th>
            </tr>
          </thead>
          {ideas.map((idea, index) => (
            <tbody key={index}>
              <tr>
                <td>{index + 1}</td>
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
                {idea.star ? (
                  <td className="text-warning">&#9733;</td>
                ) : (
                  <td></td>
                )}
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
      </Container>
    </>
  );
};

export default IdeaList;
