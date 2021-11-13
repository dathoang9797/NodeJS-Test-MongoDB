import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { BiTestTube } from "react-icons/bi";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons/lib";
import Button from "../Button/Button";
import "./Navbar.css";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 1030) {
      console.log(window.innerWidth);
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
    window.addEventListener("resize", showButton);
  }, []);

  return (
    <IconContext.Provider value={{ color: "#fff" }}>
      <nav className="navbar">
        <div className="navbar-container container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <BiTestTube className="navbar-icon" />
            TestNodeJS&MongoDB
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            {click ? <FaTimes /> : <FaBars />}
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/profiles"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Profiles
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/update"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Update
              </Link>
            </li>
            <li className="nav-btn">
              {button ? (
                <Link to="/sign-up" className="btn-link">
                  <Button buttonStyle="btn--outline">SIGN UP</Button>
                </Link>
              ) : (
                <Link to="/sign-up" className="btn-link">
                  <Button
                    buttonStyle="btn--outline"
                    buttonSize="btn--mobile"
                    onClick={closeMobileMenu}
                  >
                    SIGN UP
                  </Button>
                </Link>
              )}
            </li>
            <li className="nav-btn">
              {button ? (
                <Link to="/sign-in" className="btn-link">
                  <Button buttonStyle="btn--outline">SIGN IN</Button>
                </Link>
              ) : (
                <Link to="/sign-in" className="btn-link">
                  <Button
                    buttonStyle="btn--outline"
                    buttonSize="btn--mobile"
                    onClick={closeMobileMenu}
                  >
                    SIGN IN
                  </Button>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </IconContext.Provider>
  );
};

export default Navbar;
