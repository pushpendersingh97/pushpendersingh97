import React from "react";
import { Row, Col } from "react-bootstrap";
import "./SkeletonLoader.scss";

const SkeletonLoader = ({ numColumns }) => {
  const getColumnSize = (numColumns) => {
    switch (numColumns) {
      case 1:
        return { xs: 12 };
      case 2:
        return { xs: 12, md: 6 };
      case 3:
        return { xs: 12, md: 4 };
      case 4:
        return { xs: 12, md: 6, lg: 4 };
      default:
        return { xs: 12, md: 6, lg: 4 };
    }
  };

  return (
    <Row>
      {Array.from({ length: numColumns }).map((_, index) => (
        <Col key={index} {...getColumnSize(numColumns)}>
          <div className="card skeleton-loader-wrapper">
            <div className="d-flex justify-content-between">
              <div className="skeleton-loader w-25"></div>
              <div className="skeleton-loader w-25"></div>
            </div>
            <div className="d-flex justify-content-between">
              <div className="skeleton-loader w-50"></div>
              <div className="skeleton-loader w-25"></div>
            </div>
            <div className="skeleton-loader"></div>
            <div className="skeleton-loader"></div>
            <div className="skeleton-loader"></div>
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default SkeletonLoader;
