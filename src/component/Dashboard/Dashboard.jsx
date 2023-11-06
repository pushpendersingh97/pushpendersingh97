import { Col, Row } from "react-bootstrap";

import News from "./News";
import SocialMediaCards from "./SocialMediaCards";
import IndicesTable from "./IndicesTable";
import StockAction from "./StockAction";
import Layout from "../common/Layout";

export default function Dashboard() {
  return (
    <>
      <Layout>
        <Row>
          <Col>
            <div className="section-intro">
              <h4>
                Welcome Trader,{" "}
                <span style={{ color: "#0CC500" }}>Abhinav</span>👋
              </h4>
              <p className="m-0">
                You made a great choice by joining out platform. Install our app
                & get special promo!
              </p>
            </div>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <StockAction />
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            <IndicesTable />
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            <News />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <SocialMediaCards />
          </Col>
        </Row>
      </Layout>
    </>
  );
}
