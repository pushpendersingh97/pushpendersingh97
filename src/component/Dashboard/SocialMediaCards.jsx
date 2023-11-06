import { Row, Col, Image, Button } from "react-bootstrap";
import whatsup from "./../../assets/whatsup_media.svg";
import telegram from "./../../assets/telegram_media.svg";
import instagram from "./../../assets/instagram_media 1.svg";

const SocialMediaCards = () => {
  return (
    <Row>
      <Col xs={12}>
        <h4 className="section-heading text-uppercase mb-4">Social Media</h4>
      </Col>
      <Col xs={12} md={6} xl={4} className="mb-4">
        <div className="dashboard-card">
          <div className="dashboard-heading">
            <Image src={telegram} fluid></Image>
            <span>TV - Skills & Methodology</span>
          </div>
          <div className="dashboard-body">
            <label className="count">
              1,25,352 <p>members</p>
            </label>
            <Button
              variant="outline-dark"
              className="rounded-pill"
              onClick={() => {
                window.open("https://t.me/tradersarah222");
              }}
            >
              Follow
            </Button>
          </div>
        </div>
      </Col>

      <Col xs={12} md={6} xl={4} className="mb-4">
        <div className="dashboard-card">
          <div className="dashboard-heading">
            <Image src={instagram} fluid></Image>
            <span>trader.vakeel_</span>
          </div>
          <div className="dashboard-body">
            <label className="count">
              1,25,352 <p>followers</p>
            </label>
            <Button
              variant="outline-dark"
              className="rounded-pill"
              onClick={() => {
                window.open("https://www.instagram.com/stories/tradersarah222");
              }}
            >
              Join Now
            </Button>
          </div>
        </div>
      </Col>

      <Col xs={12} md={6} xl={4} className="mb-4">
        <div className="dashboard-card">
          <div className="dashboard-heading">
            <Image src={whatsup} fluid></Image>
            <span>Trader Vakeel Community</span>
          </div>
          <div className="dashboard-body">
            <label className="count">
              1,25,352 <p>members</p>
            </label>
            <Button
              variant="outline-dark"
              className="rounded-pill"
              onClick={() => {
                window.open("https://wa.me/+917357275999");
              }}
            >
              Join Now
            </Button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default SocialMediaCards;
