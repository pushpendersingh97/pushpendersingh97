// Layout.jsx
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Footer from "./Footer";
import Header from "./Header";
import LeftMenu from "./LeftMenu";
import { useDarkTheme } from "../../utils/DarkThemeContext";

const Layout = ({ children }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClick = (menuShow) => {
    setShow(menuShow);
  };

  const { isDarkTheme } = useDarkTheme();

  return (
    <div className={`content-container ${isDarkTheme ? "dark-theme" : ""}`}>
      <div className="header">
        <Header onHamburgerClick={handleClick} />
      </div>

      {show ? (
        <LeftMenu
          show={show}
          handleClose={handleClose}
          handleShow={handleShow}
        />
      ) : (
        <></>
      )}
      <Container fluid>{children}</Container>
      <Footer />
    </div>
  );
};

export default Layout;
