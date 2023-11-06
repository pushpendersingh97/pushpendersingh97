import React from "react";
import { Row, Col } from "react-bootstrap";
import Layout from "./Layout";

const PrivacyPolicy = () => {
  return (
    <>
      <Layout>
        <Row>
          <Col>
            <h2>Privacy Policy</h2>
            <p>
              At [Your Company Name], we take your privacy seriously. This
              Privacy Policy explains how we collect, use, and protect your
              personal information.
            </p>
            <h3>Information We Collect</h3>
            <p>
              We may collect information including but not limited to your name,
              email address, and demographic information when you use our
              services.
            </p>
            <h3>How We Use Your Information</h3>
            <p>
              We use the information we collect for various purposes, including
              providing and improving our services, sending newsletters and
              updates, and responding to your inquiries.
            </p>
          </Col>
        </Row>
      </Layout>
    </>
  );
};

export default PrivacyPolicy;
