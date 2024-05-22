import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function navbar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" style={{ backgroundColor: '#132b61' }}>
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt=""
            src="https://w7.pngwing.com/pngs/754/25/png-transparent-arab-academy-for-science-technology-maritime-transport-university-arab-league-arab-furniture-egypt-logo.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
        </Navbar.Brand>
        <Navbar.Brand href="/" style={{ color: 'white' }}>AASTMT</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Login" id="basic-nav-dropdown">
              <NavDropdown.Item href="https://studentportal.aast.edu/Login">Students</NavDropdown.Item>
              <NavDropdown.Item href="https://staffportal.aast.edu/">Staff</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Our Latest" id="basic-nav-dropdown">
              <NavDropdown.Item href="https://aast.edu/en/news/index.php?unit_id=1">News</NavDropdown.Item>
              <NavDropdown.Item href="https://aast.edu/en/events/index.php?unit_id=482">Events</NavDropdown.Item>
              <NavDropdown.Item href="https://aast.edu/en/gallery/index.php">Media</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Information For" id="basic-nav-dropdown">
              <NavDropdown.Item href="https://aast.edu/en/info-for/applicants/">New Applicants</NavDropdown.Item>
              <NavDropdown.Item href="https://aast.edu/en/info-for/students/">Students</NavDropdown.Item>
              <NavDropdown.Item href="https://aast.edu/en/info-for/staff/">Faculty & Staff</NavDropdown.Item>
              <NavDropdown.Item href="https://aast.edu/en/alumni/">Alumni</NavDropdown.Item>
              <NavDropdown.Item href="https://aast.edu/en/info-for/visitors/">Visitors</NavDropdown.Item>
            </NavDropdown>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default navbar;