import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Navigation extends Component {
  render() {
    return (
      <div className="main-page">
        <Link to="/">Strona Główna</Link>
      </div>
    );
  }
}

export class ChooseChart extends Component {
  render() {
    return (
      <div className="choose-chart-main">
        <div className="container">
          <Navigation />
          <div className="choose-chart">
            <div className="choose-chart-text">Wybierz wykres</div>
            <div className="choose-chart-links">
              <Link to="/sector">Sektor</Link>
              <Link to="/region">Region</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
