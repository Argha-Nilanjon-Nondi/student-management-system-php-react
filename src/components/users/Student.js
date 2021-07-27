import React, { Component, Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import Profile from "../student/Profile";
import AddBreaks from "../student/AddBreak"
import SeeBreaks from "../student/SeeBreaks"
import Logout from "../Logout";
import ChangePassword from "../ChangePassword";
export default function Student(props) {
  const { path } = useRouteMatch();
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow bg-white">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/user/teacher/">
            <i className="fas fa-school"></i>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to={`${path}/`}
                >
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to={`${path}/addBreak`}
                >
                  Add Break
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to={`${path}/seeBreaksList`}
                >
                  Break List
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to={`${path}/setting`}
                >
                  Setting
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to={`${path}/logout`}
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Switch>
        <Route exact path={`${path}/`}>
          <Profile></Profile>
        </Route>
        <Route exact path={`${path}/seeBreaksList`}>
          <SeeBreaks></SeeBreaks>
        </Route>
        <Route exact path={`${path}/addBreak`}>
          <AddBreaks></AddBreaks>
        </Route>
        <Route exact path={`${path}/setting`}>
          <ChangePassword></ChangePassword>
        </Route>
        <Route exact path={`${path}/logout`}>
          <Logout></Logout>
        </Route>
      </Switch>
    </Router>
  );
}
