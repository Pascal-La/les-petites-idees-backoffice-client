import React from "react";
import { Button, Table } from "react-bootstrap";

const ToolList = () => {
  return (
    <Table responsive striped hover className="container mt-5" variant="dark">
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
          <th>Modifier</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Logo</td>
          <td>fr</td>
          <td>https://1.fr/</td>
          <td>
            Outil d'optimisation des textes pour optimiser le classement dans
            les moteurs de recherche.
          </td>
          <td>Marketing</td>
          <td>Gratuit</td>
          <td>Français</td>
          <td>false</td>
          <td>
            <Button variant="outline-warning">Modifier</Button>
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default ToolList;
