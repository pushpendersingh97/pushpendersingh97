import PricingCard from "./PricingCard";
import { Row, Col } from "react-bootstrap";
import { priceCardData } from "../dummyData";
import Layout from "../common/Layout";
function PricePage() {
  return (
    <Layout>
      <Row>
        <Col>
          <h4 className="section-heading text-uppercase">Plans And Pricing</h4>
        </Col>
        <Col xs={12} className="mb-4">
          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in
            nulla eros.
          </span>
        </Col>
      </Row>
      <Row>
        {priceCardData.map((plan, index) => (
          <PricingCard key={index} plan={plan} isFirst={index === 0} />
        ))}
      </Row>
    </Layout>
  );
}
export default PricePage;
