import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuthDispatch, useAuthState } from "../context/auth";

const Header = () => {
  const { user } = useAuthState();
  const dispatch = useAuthDispatch();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    window.location.href = "/login";
  };

  console.log(user);

  return (
    <>
      <Navbar bg="warning fixed-top">
        <Container>
          <Link to="/">
            <img src={logo} alt="" height={70} />
          </Link>
          {user && (
            <div
              onClick={logout}
              className="d-flex rounded justify-content-center align-items-center"
              style={{
                border: "3px solid #04047c",
                color: "#04047c",
                height: "2em",
                width: "2em",
                fontSize: "1.5em",
                fontWeight: "bold",
                fontStyle: "italic",
                cursor: "pointer",
              }}
            >
              {/* {user?.email} */}
              {user.firstname[0]}
              {user.lastname[0]}
            </div>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
