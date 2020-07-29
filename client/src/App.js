import React from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import "./App.css";
import Subscription from "./Subscription";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-5">
      <div>
        <NavLink className="navbar-brand" to="/">
          Home
        </NavLink>
      </div>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <NavLink className="" to="/subscription">
              Subscription
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Route path="/" exact>
        <p className="display-3 text-center">Go to subscription page</p>
      </Route>
      <div className="container mt-5">
        <Route path="/subscription" exact>
          <Subscription />
        </Route>
      </div>
    </Router>
  );
}

export default App;
