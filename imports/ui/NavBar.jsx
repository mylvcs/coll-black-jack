import React, { Component } from "react";

import { Link } from "react-router-dom";

import AccountsUIWrapper from "./AccountsUIWrapper.js";

export default class NavBar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          
          
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link to="/">Home <span className="nav-link sr-only">(current)</span></Link>
              </li>
              <li className="nav-item">
                <Link to="/about">About</Link>
              </li>
            </ul>
            <AccountsUIWrapper />
          </div>
        </nav>
      </div>
    );
  }
}