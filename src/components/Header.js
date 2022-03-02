import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <Navbar bg="warning fixed-top">
      <Link to="/" className="mx-5">
        <img src={logo} alt="" height={70} />
      </Link>
    </Navbar>
  );
};

export default Header;
