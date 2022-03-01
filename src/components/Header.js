import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <Navbar bg="warning">
      <Container>
        <Link className="mx-2" to="/">
          <img src={logo} alt="" height={60} />
        </Link>
      </Container>
    </Navbar>
  );
};

export default Header;
