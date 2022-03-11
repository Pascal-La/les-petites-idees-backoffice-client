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

  return (
    <>
      <Navbar bg="warning fixed-top">
        <Container>
          <a href="/">
            <img src={logo} alt="" height={70} />
          </a>
          {user && (
            <div
              onClick={logout}
              className="d-flex flex-column align-items-center"
              style={{ cursor: "pointer", color: "#04047c" }}
            >
              <div
                className="d-flex rounded justify-content-center align-items-center"
                style={{
                  border: "3px solid #04047c",
                  height: "2em",
                  width: "3em",
                  fontSize: "1.5em",
                  fontWeight: "bold",
                  fontStyle: "italic",
                }}
              >
                {/* {user?.email} */}
                {user.firstname[0]}
                {user.lastname[0]}
              </div>
              <div>Se déconnecter</div>
            </div>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
