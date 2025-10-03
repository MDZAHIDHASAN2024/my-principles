import { Container, Dropdown, Nav, Navbar } from 'react-bootstrap';
import { Link, NavLink } from 'react-router';

// react icon

//my css
import './index.css';
import { FaBalanceScale } from 'react-icons/fa';
import { useState } from 'react';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleClick = () => {
    setIsLoggedIn(!isLoggedIn);
  };
  return (
    <Navbar sticky="top" expand="lg" className="my-nav-bg">
      <Container>
        <Navbar.Brand className="text-light " as={Link} to={'/'}>
          <div className="text-primary ">
            <button className="bg-dark rounded-5" onClick={handleClick}>
              {isLoggedIn ? (
                <div className="text-info ">
                  Log Out
                  <FaBalanceScale className="ms-1 text-info" />
                </div>
              ) : (
                <div className="text-danger">
                  Log In
                  <FaBalanceScale className="ms-1 text-danger" />
                </div>
              )}
            </button>
          </div>
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
            {isLoggedIn && (
              <NavLink
                className="m-auto pe-4 text-decoration-none fw-bold"
                to={'/Intro'}
              >
                Intro
              </NavLink>
            )}
            {isLoggedIn && (
              <NavLink
                className="m-auto pe-4 text-decoration-none fw-bold"
                to={'/FoodControl'}
              >
                Food Controls
              </NavLink>
            )}
            {isLoggedIn && (
              <NavLink
                className="m-auto pe-4 text-decoration-none fw-bold"
                to={'/Works'}
              >
                Work Plans
              </NavLink>
            )}
            <NavLink
              className="m-auto pe-4 text-decoration-none fw-bold"
              to={'/Principles'}
            >
              Main-Principle's
            </NavLink>
            {isLoggedIn && (
              <NavLink
                className="m-auto pe-4 text-decoration-none fw-bold"
                to={'/generalRules'}
              >
                General-rules
              </NavLink>
            )}
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
            {/* <NavLink
              className="m-auto pe-4 text-decoration-none fw-bold"
              to={'/myContract'}
            >
              My-Contract-List
            </NavLink> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Index;
