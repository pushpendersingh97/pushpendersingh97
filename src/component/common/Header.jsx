import React from "react";
import { Navbar, Button } from "react-bootstrap";
import Notification from "./Notification";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import logo from "./../../assets/logo.svg";
import profile from "./../../assets/profile.svg";
import hamburger from "./../../assets/hamburger.svg";
import hamburger_white from "./../../assets/Dark Theme/Hamburger_white.svg";
import MaterialUISwitch from "./MaterialUISwitch";
import { useDarkTheme } from "../../utils/DarkThemeContext";

function Header({ onHamburgerClick }) {
  const { isDarkTheme, toggleDarkTheme } = useDarkTheme();

  const handleShow = () => {
    onHamburgerClick(true);
  };

  return (
    <>
      <Navbar
        className={`navbarHeader ${isDarkTheme ? "dark-theme" : ""}`}
        bg={isDarkTheme ? "dark" : "light"}
        variant={isDarkTheme ? "dark" : "light"}
      >
        <div className="w-100 header-container">
          <div className="leftPart">
            <Button
              className="hamburgerBtn p-0"
              variant="none"
              onClick={handleShow}
            >
              {!isDarkTheme ? <img src={hamburger} alt="" className="hamburger-icon" /> : <img src={hamburger_white} alt="" className="hamburger-icon" /> }
            </Button>
            <img className="header-logo" src={logo} alt="logo" />
            <div className="navbar-title">Trader Vakeel Stock Market</div>
          </div>
          <div className="rightPart">
            <FormGroup>
              <FormControlLabel
                control={<MaterialUISwitch sx={{ m: 1 }} checked={isDarkTheme} />}
                onClick={toggleDarkTheme}
              />
            </FormGroup>

            <div className="headerNotification">
              <Notification />
            </div>
            <img src={profile} className="headerProfile" alt="profile" />
          </div>
        </div>
      </Navbar>
    </>
  );
}

export default Header;
