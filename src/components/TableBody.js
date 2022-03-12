import React from "react";
import { Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const TableBody = ({value, index, onClick}) => {
  return (
    <tbody key={index}>
      <tr>
        <td>
          {value.star ? (
            // <Badge bg="warning">&#9733;</Badge>
            <p>{"\u2728"}</p>
          ) : (
            index + 1
          )}
        </td>
        <img
          className="rounded img-thumbnail"
          src={value.logo}
          alt={value.name}
          height={80}
          width={80}
        />
        <td>{value.name}</td>
        <td>{value.webSite}</td>
        <td>{value.description}</td>
        <td>
          {value.tags.map((tag) => (
            <Badge key={tag} pill bg="success">
              {tag.toUpperCase()}
            </Badge>
          ))}
        </td>
        <td>
          {value.access.map((access) => (
            <Badge key={access} pill>
              {access.toUpperCase()}
            </Badge>
          ))}
        </td>
        <td>
          {value.language.map((lang) => (
            <Badge key={lang} pill bg="danger">
              {lang.toUpperCase()}
            </Badge>
          ))}
        </td>
        <td>
          <Link
            to={`/update/${value._id}`}
            // pass the idea's id as string to <App />
            onClick={onClick}
            className="text-black"
          >
            <Button variant="warning">&#9998;</Button>
          </Link>
        </td>
      </tr>
    </tbody>
  );
};

export default TableBody;
