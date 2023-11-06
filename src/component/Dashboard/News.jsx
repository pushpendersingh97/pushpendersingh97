import { useState } from "react";
import { Col, Row } from "react-bootstrap";

import { newsData } from "../dummyData";
import calender from "../../assets/calender.svg";
import clock from "../../assets/clock.svg";
import calenderDark from "../../assets/Dark Theme/calendar_dark.svg";
import clockDark from "../../assets/Dark Theme/clock_dark.svg";
import { useDarkTheme } from "../../utils/DarkThemeContext";
import { Link } from "react-router-dom";

export default function News() {
  const [newsDataArr] = useState(newsData);
  const isDarkTheme = useDarkTheme();

  // To render News
  const renderNews = () => {
    return newsDataArr.length > 0 ? (
      newsDataArr.map((news) => (
        <div className="dashboard-card news-card" key={news.id}>
          <div className="news-card-heading">{news.heading}</div>
          <div className="news-card-desc">{news.summary}</div>
          <div className="news-card-date-time">
            <div className="news-card-date pt-2 rounded-pill">
              {isDarkTheme ? (
                <img className="me-2" src={calenderDark} alt="" />
              ) : (
                <img className="me-2" src={calender} alt="" />
              )}
              {news.date}
            </div>
            <div className="news-card-time pt-2 rounded-pill">
              {isDarkTheme ? (
                <img className="me-2" src={clockDark} alt="" />
              ) : (
                <img className="me-2" src={clock} alt="" />
              )}
              {news.time}
            </div>
          </div>
          <Link className="mt-2">Read More...</Link>
        </div>
      ))
    ) : (
      <div>No News Found</div>
    );
  };
  return (
    <>
      <Row>
        <Col>
          <h4 className="section-heading mb-4">NEWS AT GLANCE</h4>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <div className="news-outer-container">{renderNews()}</div>
        </Col>
      </Row>
    </>
  );
}
