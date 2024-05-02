import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import logo from "../assets/netflix_logo.png";
import propic from "../assets/avatar.png";
import { NavLink } from "react-router-dom";
const MyNavbar = () => {
  return (
    <div>
      <Navbar expand="lg" className="pb-0 navbar-dark custom-nav-bg">
        <Container fluid className="ms-lg-4">
          <Navbar.Brand href="#">
            <img src={logo} alt="netflix logo" width="130px" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarSupportedContent" />
          <Navbar.Collapse>
            <Nav className="me-auto mb-2 mb-lg-0">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
              <Nav.Link href="#tvshows">Tv Shows</Nav.Link>
              <Nav.Link href="#movies">Movies</Nav.Link>
              <Nav.Link href="#recent">Recently Added</Nav.Link>
              <Nav.Link href="#mylist">My List</Nav.Link>
            </Nav>
            <Nav className="mb-2 me-lg-4 mb-lg-0 align-items-center justify-content-end flex-row">
              <Nav.Link href="#" className="text-light pe-2">
                <i className="bi bi-search"></i>
              </Nav.Link>
              <Nav.Link href="#" className="text-light pe-2">
                KIDS
              </Nav.Link>
              <Nav.Link href="#" className="text-light pe-2">
                <i className="bi bi-bell-fill"></i>
              </Nav.Link>
              <NavDropdown title={<img src={propic} alt="profile pic" width="35px" />} align="end" data-bs-theme="dark">
                <NavLink to="/profile" className="dropdown-item">
                  Profile
                </NavLink>
                <NavLink to="/settings" className="dropdown-item">
                  Settings
                </NavLink>
                <NavDropdown.Item href="#logout">Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default MyNavbar;
