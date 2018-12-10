import React, { Component } from "react";
import { Link } from "react-router-dom";

export class NotFound extends Component {
  render() {
    return (
      <div className="not-found">
        <div className="container">
          <div className="row">
            <h3>404 page not found</h3>
            <p>Przykro nam, ale strona, której szukasz, nie istnieje</p>
            <Link to="/">Strona Główna</Link>
          </div>
        </div>
      </div>
    );
  }
}
