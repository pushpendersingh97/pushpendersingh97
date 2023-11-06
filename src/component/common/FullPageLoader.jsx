// FullPageLoader.js
import React from "react";
import "./FullPageLoader.scss";

const FullPageLoader = (props) => {

  const { isDarkTheme } = props;

  return (
    <div className={`full-page-loader ${isDarkTheme ? "dark-theme" : ""}`}>
      <div id="cube">
        <div id="front"></div>
        <div id="back"></div>
        <div id="bottom"></div>
        <div id="top"></div>
        <div id="left"></div>
        <div id="right"></div>
      </div>
      <p>
        Loading <span id="d1">.</span>
        <span id="d2">.</span>
        <span id="d3">.</span>
      </p>
    </div>
  );
};

export default FullPageLoader;
