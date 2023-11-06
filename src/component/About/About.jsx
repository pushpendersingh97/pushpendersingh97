import React from "react";
import Layout from "../common/Layout";
import { Image, Button, Row, Col } from "react-bootstrap";

import AboutUs from "./../../assets/aboutUs.png";
import "./About.scss";
import { useDarkTheme } from "../../utils/DarkThemeContext";

const About = () => {

  const { isDarkTheme } = useDarkTheme();

  return (
    <Layout>
      <div className="about-outer-wrapper">
        <div className="about-wrapper">
          <div className="about-container">
            <h3 className="section-heading">About Us</h3>
            <h1>
              <strong>
                We are proud to be the World's Leading{" "}
                <span className="blue">Trading Platform</span>
              </strong>
            </h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
              vulputate imperdiet vestibulum. Duis non bibendum elit. Etiam eu
              nibh ullamcorper, sollicitudin tortor id, aliquam nibh. Quisque
              convallis a dolor non blandit. Nullam ut odio feugiat, ultrices
              odio a, finibus purus. Mauris fermentum id urna vel sollicitudin.
              Donec pulvinar non felis eu tincidunt.
            </p>
            <p>
              <Button variant={isDarkTheme ? "outline-light" : "outline-dark"}>Explore More</Button>
            </p>
          </div>
          <div className="about-image">
            <Image src={AboutUs} fluid />
          </div>
        </div>
        <section className="mt-3">
          <div className="section-heading">
            <h3>Why Choose Us</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              in nulla eros.
            </p>
          </div>
          <div className="card-section">
            <Row>
              <Col xs={12} md={6} lg={4}>
                <div className="card-outer-wrapper bg-pink">
                  <div className="card-inner-wrapper">
                    <p className="heading">Heading</p>
                    <p className="card-content">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Ut vulputate imperdiet vestibulum. Duis non bibendum elit.{" "}
                    </p>
                  </div>
                  <div className="text-uppercase pt-3 fw-bolder">Our Mission</div>
                </div>
              </Col>
              <Col xs={12} md={6} lg={4}>
                <div className="card-outer-wrapper bg-green">
                  <div className="card-inner-wrapper">
                    <p className="heading">Heading</p>
                    <p className="card-content">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Ut vulputate imperdiet vestibulum. Duis non bibendum elit.{" "}
                    </p>
                  </div>
                  <div className="text-uppercase pt-3 fw-bolder">Our Vision</div>
                </div>
              </Col>
              <Col xs={12} md={6} lg={4}>
                <div className="card-outer-wrapper bg-blue">
                  <div className="card-inner-wrapper">
                    <p className="heading">Heading</p>
                    <p className="card-content">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Ut vulputate imperdiet vestibulum. Duis non bibendum elit.{" "}
                    </p>
                  </div>
                  <div className="text-uppercase pt-3 fw-bolder">Our Values</div>
                </div>
              </Col>
            </Row>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;
