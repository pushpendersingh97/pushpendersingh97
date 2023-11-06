/* eslint-disable react/no-unescaped-entities */
import { Col, Button, Row, Form, Image, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import googleImg from "./../../assets/google-logo.svg";
import logo from "./../../assets/logo.svg";
import login_rect_1 from "./../../assets/login-rect-1.svg";
import login_rect_2 from "./../../assets/login-rect-2.svg";
import youtube from "./../../assets/youtube.svg";
import whatsup from "./../../assets/whatsup.svg";
import telegram from "./../../assets/telegram.svg";
import zerodha from "./../../assets/Zerodha.svg";
import Angel_Breaking from "./../../assets/Angel-Breaking.svg";
import upstox from "./../../assets/upstox.svg";
import FullPageLoader from "../common/FullPageLoader";

export default function Login() {
  // State for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigate();

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    // Simulate a login process (replace with your actual login logic)
    setTimeout(() => {
      setIsLoading(false); // Stop loading
      console.log("Email:", email);
      console.log("Password:", password);
      navigation("/dashboard");
    }, 2000);
  };

  // To login through google
  const handleGoogleLogin = () => {
    // To handle google login
  };

  return (
    <>
      {isLoading && <FullPageLoader isDarkTheme={true} />}
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
                <Button
                  variant="outline-dark"
                  className="google-btn rounded-pill"
                  onClick={handleGoogleLogin}
                >
                  <Image src={googleImg} rounded />
                  <span>Sign in with Google</span>
                </Button>

                <p className="hr-lines">or</p>

                <div className="mb-3">
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="email">
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Update email state on change
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Update password state on change
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="forgetPassword">
                      <p className="d-flex justify-content-end">
                        <a
                          className="text-primary border-none weight-500"
                          href="#!"
                        >
                          Forgot Password?
                        </a>
                      </p>
                    </Form.Group>
                    <div className="d-grid">
                      <Button
                        variant="dark"
                        type="submit"
                        className="rounded-pill"
                      >
                        Sign In
                      </Button>
                    </div>
                  </Form>
                  <div className="mt-3">
                    <p className="mb-0 weight-500 text-center">
                      Don't have an account?{" "}
                      <Link
                        to="/register"
                        className="text-primary border-none weight-500"
                      >
                        Sign Up
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
