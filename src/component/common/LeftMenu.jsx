import { Nav } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useDarkTheme } from "../../utils/DarkThemeContext";
import { useLocation, NavLink } from "react-router-dom";
import "./LeftMenu.scss";

import { ReactComponent as HomeSvg } from "./../../assets/home.svg";
import { ReactComponent as PricingSvg } from "./../../assets/pricing.svg";
import { ReactComponent as AboutSvg } from "./../../assets/about.svg";
import { ReactComponent as ContactSvg } from "./../../assets/contact.svg";
import { ReactComponent as LogoutSvg } from "./../../assets/logout.svg";

function LeftMenu({ show, handleClose }) {
  const { isDarkTheme } = useDarkTheme();
  const location = useLocation(); // Get the current location from React Router

  const MenuItems = [
    {
      label: "Home",
      linkTo: "/dashboard",
      icon: <HomeSvg />,
    },
    {
      label: "Pricing",
      linkTo: "/pricing",
      icon: <PricingSvg />,
    },
    {
      label: "Contact Us",
      linkTo: "/contact",
      icon: <ContactSvg />,
    },
    {
      label: "About Us",
      linkTo: "/about",
      icon: <AboutSvg />,
    },
    {
      label: "Log Out",
      linkTo: "/login",
      icon: <LogoutSvg />,
    },
  ];

  return (
    <>
      <Offcanvas
        show={show}
        onHide={handleClose}
        data-bs-theme={isDarkTheme ? "dark" : ""}
        className="left-menu-offcanvas"
      >
        <Offcanvas.Body>
          <Nav defaultActiveKey="/dashboard">
            {MenuItems.map((item) => (
              <NavLink
                to={item.linkTo}
                key={item.label}
                className={location.pathname === item.linkTo ? "nav-link active" : "nav-link"}
              >
                {item.icon}
                <span className="m-0">{item.label}</span>
              </NavLink>
            ))}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default LeftMenu;
