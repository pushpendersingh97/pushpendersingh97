import { Button, Col } from "react-bootstrap";
import tick from "./../../assets/tick.svg";

function PricingCard({ plan, isFirst }) {
  return (
    <>
      <Col lg={3} md={6} sm={12} className="card-hover">
        <div className="plan-card">
          <h5 className="card-title">{plan.planName}</h5>
          <p className="card-text">{plan.text}</p>
          <div className="card-price">
            <div>{plan.price}</div>
            <p className="card-text">{plan.duration}</p>
          </div>
          {isFirst ? (
            <Button variant="outline-dark" className="rounded-pill card-btn">
              Current Plan
            </Button>
          ) : (
            <Button variant="outline-dark" className="rounded-pill card-btn">
              Choose this Plan
            </Button>
          )}
          <ul>
            {plan.benefits.map((benefit, index) => (
              <div>
                <img className="tick-img" src={tick} alt="tick" />
                <span className="my p-2" key={index}>
                  {benefit}
                </span>
              </div>
            ))}
          </ul>
        </div>
      </Col>
    </>
  );
}
export default PricingCard;
