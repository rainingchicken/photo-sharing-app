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
        <Navbar.Link active={path === "/dashboard"} to="/dashboard" as={Link}>
          Dashboard
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
