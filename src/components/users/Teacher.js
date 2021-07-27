import React, { Component, Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import Profile from "../teacher/Profile";
import StudentProfile from "../teacher/StudentProfile";
import StudentPannel from "../teacher/StudentPannel";
import UpdateStudent from "../teacher/UpdateStudent";
import AddStudent from "../teacher/AddStudent";
import Logout from "../Logout";
import Checkin from "../teacher/Checkin";
import Checkout from "../teacher/Checkout";
import UpdateCheck from "../teacher/UpdateCheck";
import BreakList from "../teacher/BreakList";
import ChangePassword from "../ChangePassword";
export default function Teacher(props) {
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
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                  role="button"
                  href="#"
                  aria-expanded="false"
                >
                  Student
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={`${path}/student`}>
                      Student Pannel
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={`${path}/addstudent`}>
                      Add Student
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={`${path}/checkin`}>
                      Checkin Student
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={`${path}/checkout`}>
                      Checkout Student
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={`${path}/updatecheck`}>
                      Update Check
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={`${path}/breaklist`}>
                      Break List
                    </Link>
                  </li>
                </ul>
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
        <Route exact path={`${path}/student`}>
          <StudentPannel></StudentPannel>
        </Route>
        <Route exact path={`${path}/editStudent/:userid`}>
          <UpdateStudent></UpdateStudent>
        </Route>
        <Route exact path={`${path}/updatecheck`}>
          <UpdateCheck></UpdateCheck>
        </Route>
        <Route exact path={`${path}/profileStudent/:userid`}>
          <StudentProfile></StudentProfile>
        </Route>
        <Route exact path={`${path}/addStudent`}>
          <AddStudent></AddStudent>
        </Route>
        <Route exact path={`${path}/breaklist`}>
          <BreakList></BreakList>
        </Route>
        <Route exact path={`${path}/checkin`}>
          <Checkin></Checkin>
        </Route>
        <Route exact path={`${path}/checkout`}>
          <Checkout></Checkout>
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
