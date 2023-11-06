import zerodha from "./../../assets/Zerodha.svg";
import Angel_Breaking from "./../../assets/Angel-Breaking.svg";
import upstox from "./../../assets/upstox.svg";
import whatsapp from "./../../assets/whatsapp-white.svg";
import telegram from "./../../assets/telegram-white.svg";
import youtube from "./../../assets/youtube-white.svg";
import { Link } from "react-router-dom";

import "./Footer.scss";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-heading ms-auto me-auto">
        OPEN TRADING ACCOUNT USING OUR LINK AND GET NIFTY BANK NIFTY PREMIUM
        SUBSCRIPTION FREE FOR LIFETIME
      </div>

      <div className="footer-icons">
        <div
          className="footer-icon"
          onClick={() => {
            window.open("https://kite.zerodha.com/");
          }}
        >
          <img src={zerodha} alt="Zerodha" />
          <span className="icon-desc">Zerodha</span>
        </div>
        <div
          className="footer-icon"
          onClick={() => {
            window.open("https://www.angelone.in/login/");
          }}
        >
          <img src={Angel_Breaking} alt="Angel Breaking" />
          <span className="icon-desc">Angel Breaking</span>
        </div>
        <div
          className="footer-icon"
          onClick={() => {
            window.open(" https://login.upstox.com/");
          }}
        >
          <img src={upstox} alt="UpStox" />
          <span className="icon-desc">Upstox</span>
        </div>
      </div>
      <div className="footer-heading ms-auto me-auto">
        WhatsApp Your Details After Successful Account Opening On Below No
      </div>
      <div className="whatsapp-link">
        <a className="whatsApp" href="https://wa.me/+917357275999">
          https://wa.me/+917357275999
        </a>
      </div>
      <hr />
      <div className="footer-end">
        <div className="footer-end-item">
          <img
            className="footer-social-icons me-4"
            src={telegram}
            alt="telegram"
            onClick={() => {
              window.open("https://t.me/tradersarah222");
            }}
          />
          <img
            className="footer-social-icons me-4"
            src={youtube}
            alt="youtube"
            onClick={() => {
              window.open("https://www.youtube.com/@tradersarah");
            }}
          />
          <img
            className="footer-social-icons"
            src={whatsapp}
            alt="whatsapp"
            onClick={() => {
              window.open("https://wa.me/+917357275999");
            }}
          />
        </div>
        <div className="footer-end-item">
          <Link to="/privacy-policy" className="footer-end-item-content mt-auto mb-auto me-4">
            Privacy Policy
          </Link>
          <Link to="/terms-conditions" className="footer-end-item-content mt-auto mb-auto ">
            Terms & Conditions
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
