import { Container, Dropdown, Nav, Navbar } from 'react-bootstrap';
import { Link, NavLink } from 'react-router';
//my css
import './index.css';
const Index = () => {
  return (
    <Navbar sticky="top" expand="lg" className="my-nav-bg">
      <Container>
        <Navbar.Brand className="text-light " as={Link} to={'/'}>
          My Principle's
        </Navbar.Brand>
        <Navbar.Toggle className="bg-light " aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <NavLink
              className="m-auto pe-4 text-decoration-none fw-bold"
              to={'/'}
            >
              Home
            </NavLink>
            <NavLink
              className="m-auto pe-4 text-decoration-none fw-bold"
              to={'/Intro'}
            >
              Intro
            </NavLink>
            <NavLink
              className="m-auto pe-4 text-decoration-none fw-bold"
              to={'/Principles'}
            >
              Main-Principle's
            </NavLink>
            <NavLink
              className="m-auto pe-4 text-decoration-none fw-bold"
              to={'/generalRules'}
            >
              General-rules
            </NavLink>
            <Dropdown className="m-auto pe-4 text-decoration-none fw-bold">
              <Dropdown.Toggle
                variant="my-margin text-primary"
                id="dropdown-basic"
              >
                Life Changing Formula's
              </Dropdown.Toggle>
              <Dropdown.Menu className="bg-dark p-1 text-primary ">
                <NavLink className="custom-text" to="/moneySavingFormula">
                  Money Saving Formula
                </NavLink>
                <br />
                <NavLink className="custom-text" to="/reduceSpeakingFormula">
                  Reduce Speaking Formula
                </NavLink>
                <br />
                <NavLink className="custom-text" to="/timeSavingFormula">
                  Time Saving Formula
                </NavLink>
                <br />
                <NavLink className="custom-text" to="/tourPlanFormula">
                  Tour Plan Formula
                </NavLink>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Index;
