import { Navbar } from "flowbite-react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const location = useLocation();
  const path = location.pathname;
  return (
    <Navbar fluid rounded>
      <Navbar.Brand to="/" as={Link}>
        PhotoShare
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} to="/" as={Link}>
          Home
        </Navbar.Link>
        <Navbar.Link active={path === "/browse"} to="/browse" as={Link}>
          Browse
        </Navbar.Link>
        {!userInfo ? (
          <>
            <Navbar.Link active={path === "/login"} to="/login" as={Link}>
              Login
            </Navbar.Link>
            <Navbar.Link active={path === "/signup"} to="/signup" as={Link}>
              Signup
            </Navbar.Link>
          </>
        ) : (
          <>
            <Navbar.Link
              active={path === "/dashboard"}
              to="/dashboard"
              as={Link}
            >
              Dashboard
            </Navbar.Link>
            <Navbar.Link active={path === "/logout"} to="/logout" as={Link}>
              Logout
            </Navbar.Link>
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
