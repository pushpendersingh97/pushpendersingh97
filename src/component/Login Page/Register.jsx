import { useState } from "react"; // Import useState
import { Col, Button, Row, Form, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "./../../assets/logo.svg";
import login_rect_1 from "./../../assets/login-rect-1.svg";
import login_rect_2 from "./../../assets/login-rect-2.svg";

import youtube from "./../../assets/youtube.svg";
import whatsup from "./../../assets/whatsup.svg";
import telegram from "./../../assets/telegram.svg";
import zerodha from "./../../assets/Zerodha.svg";
import Angel_Breaking from "./../../assets/Angel-Breaking.svg";
import upstox from "./../../assets/upstox.svg";

import { Image } from "react-bootstrap";

export default function Register() {
  // State to capture user input
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNo: "",
    password: "",
    city: "",
    amountPaid: "",
  });

  const navigation = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can access formData and send it to your backend for user registration
    console.log("Form Data:", formData);
    // Reset the form or perform any necessary actions after submission
    // Example: clear form fields
    setFormData({
      name: "",
      email: "",
      phoneNo: "",
      password: "",
      city: "",
      amountPaid: "",
    });

    navigation("/dashboard");
  };

  // Handle input field changes and update the state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <Container fluid className="vh-100">
        <Row className="login-container">
          <Col xs={12} lg={5} className="login-left-container">
            <div className="logo-container">
              <Image src={logo} fluid className="logo" />
              <Image src={logo} fluid className="logo mx-3" />
            </div>
            <div>
              <p className="mt-5">
                <Image src={login_rect_1} fluid className="login-rect" />
              </p>
              <p className="mt-5 text-end">
                <Image src={login_rect_2} fluid className="login-rect" />
              </p>
            </div>

            <div className="social">
              <Image
                src={telegram}
                fluid
                className="social-icon me-4"
                onClick={() => {
                  window.open("https://t.me/tradersarah222");
                }}
              />
              <Image
                src={youtube}
                fluid
                className="social-icon me-4"
                onClick={() => {
                  window.open("https://www.youtube.com/@tradersarah");
                }}
              />
              <Image
                src={whatsup}
                fluid
                className="social-icon"
                onClick={() => {
                  window.open("https://wa.me/+917357275999");
                }}
              />
            </div>
          </Col>
          <Col xs={12} lg={7} className="bg-image">
            <div className="login-inner-container">
              <div className="login-right-container">
                <h1 className="fw-bold mb-2">Hi there!</h1>
                <h4 className="mb-4">Welcome to Trader Vakeel.</h4>

                <div className="mb-3">
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="name">
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="email">
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="phoneNo">
                      <Form.Control
                        type="text"
                        name="phoneNo"
                        placeholder="Phone Number"
                        value={formData.phoneNo}
                        onChange={handleInputChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                    </Form.Group>

                    <div className="row">
                      <div className="col">
                        <Form.Group className="mb-3" controlId="city">
                          <Form.Control
                            type="text"
                            name="city"
                            placeholder="City"
                            value={formData.city}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </div>
                      <div className="col">
                        <Form.Group className="mb-3" controlId="amountPaid">
                          <Form.Control
                            type="text"
                            name="amountPaid"
                            placeholder="Amount Paid"
                            value={formData.amountPaid}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </div>
                    </div>

                    <div className="d-grid">
                      <Button
                        variant="dark"
                        type="submit"
                        className="rounded-pill"
                      >
                        Sign Up
                      </Button>
                    </div>
                  </Form>
                  <div className="mt-3">
                    <p className="mb-0 weight-500 text-center">
                      Already have an account?{" "}
                      <Link
                        to="/"
                        className="text-primary weight-500 border-none"
                      >
                        Sign In
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
              <div className="footer-container ps-0 pe-0">
                <div className="hr-line weight-500">
                  Open trading account with our link
                </div>
                <div className="login-footer">
                  <div
                    className="footer-icon"
                    onClick={() => {
                      window.open("https://kite.zerodha.com/");
                    }}
                  >
                    <img src={zerodha} alt="Zerodha" />
                    <span className="icon-desc weight-500">Zerodha</span>
                  </div>
                  <div
                    className="footer-icon"
                    onClick={() => {
                      window.open("https://www.angelone.in/login/");
                    }}
                  >
                    <img src={Angel_Breaking} alt="Angel Breaking" />
                    <span className="icon-desc weight-500">Angel Breaking</span>
                  </div>
                  <div
                    className="footer-icon"
                    onClick={() => {
                      window.open(" https://login.upstox.com/");
                    }}
                  >
                    <img src={upstox} alt="UpStox" />
                    <span className="icon-desc weight-500">Upstox</span>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
