import React, { Component ,Fragment} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useRouteMatch
} from "react-router-dom";
import TeacherPannel from '../admin/TeacherPannel';
import UpdateTeacher from '../admin/UpdateTeacher';
import AddTeacher from '../admin/AddTeacher';
import ChangePassword from '../ChangePassword';
import Logout from '../Logout';
import TeacherProfile from '../admin/TeacherProfile';
export default function Admin(props){
  const {path}=useRouteMatch();
        return (
          <Router>
            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow bg-white">
              <div className="container-fluid">
                <Link className="navbar-brand" to="/user/admin/">
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
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        data-bs-toggle="dropdown"
                        role="button"
                        href="#"
                        aria-expanded="false"
                      >
                        Teacher
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <Link
                            className="dropdown-item"
                            to={`${path}/teacher`}
                          >
                            Teacher Pannel
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            to={`${path}/addTeacher`}
                          >
                            Add teacher
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
              <Route exact path={[`${path}/teacher`, `${path}/`]}>
                <TeacherPannel></TeacherPannel>
              </Route>
              <Route exact path={`${path}/editTeacher/:userid`}>
                <UpdateTeacher></UpdateTeacher>
              </Route>
              <Route exact path={`${path}/teacherProfile/:userid`}>
                <TeacherProfile></TeacherProfile>
              </Route>
              <Route exact path={`${path}/addTeacher`}>
                <AddTeacher></AddTeacher>
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

