import React from "react";
import { Row, Col } from "react-bootstrap";
import Layout from "./Layout";

const TermsConditions = () => {
  return (
    <>
      <Layout>
        <Row>
          <Col>
            <h2>Terms and Conditions</h2>
            <p>
              By accessing or using our services, you agree to be bound by these
              Terms and Conditions. Please read them carefully.
            </p>
            <h3>Use of Our Services</h3>
            <p>
              You agree not to misuse our services, including but not limited to
              not engaging in any unlawful or prohibited activities.
            </p>
            <h3>Termination</h3>
            <p>
              We reserve the right to terminate or suspend your access to our
              services at any time for any reason without notice.
            </p>
          </Col>
        </Row>
      </Layout>
    </>
  );
};

export default TermsConditions;
