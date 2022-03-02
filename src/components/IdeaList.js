import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";

const IdeaList = () => {
  const [ideas, setIdeas] = useState([]);
  const [sortedNameAsc, setSortedNameAsc] = useState(false);
  const [sortedStar, setSortedStar] = useState(false);
  const [sortingSelect, setSortingSelect] = useState("default");

  const fetchIdeas = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/ideas/getAllIdeas"
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
        <div>
          <Form.Select onChange={(e) => handleChange(e)}>
            <option value="default">Trier...</option>
            {/* <option value="default">Défault</option> */}
            <option value="sortedNameAsc">Nom de A à Z</option>
            <option value="sortedNameDesc">Nom de Z à A</option>
            <option value="sortedStarTrue">Stars en premiers</option>
            <option value="sortedStarFalse">Stars en derniers</option>
          </Form.Select>
        </div>
        <Button>Ajouter une idée</Button>
      </div>
      <Table responsive hover className="mt-4 text-center">
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
            <th>Mes stars</th>
          </tr>
        </thead>
        {ideas.map((idea, index) => (
          <tbody key={index}>
            <tr>
              <td>{index + 1}</td>
              <img src={idea.logo} alt="" height={80} width={80} />
              <td>{idea.name}</td>
              <td>{idea.webSite}</td>
              <td>{idea.description}</td>
              <td>{idea.tags}</td>
              <td>{idea.access}</td>
              <td>{idea.language}</td>
              <td>{idea.star && "*"}</td>
              <td>
                <Button variant="outline-warning">Modifier</Button>
              </td>
            </tr>
          </tbody>
        ))}
      </Table>
    </>
  );
};

export default IdeaList;
