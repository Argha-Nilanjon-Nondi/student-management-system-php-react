import React, { Component, Fragment } from "react";
import LoadingBar from "../LoadingBar";
import Alert from "../Alert";
import axios from "axios";
import { Redirect } from "react-router-dom";
export default class StudentProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      userid: "",
      username: "",
      class: "",
      section: "",
      contactno: "",
      roll: "",
      checkList: [],
      breakList: [],
      loadingStatus1: true,
      loadingStatus2: true,
      loadingStatus3: true,
      errorContent: <></>,
      userRedirect: false,
    };
  }

  getProfileData = () => {
    let directory = window.location.pathname.split("/");
    let rollid = directory[directory.length - 1];

    axios({
      method: "post",
      url: `http://${document.location.hostname}/student-management-system/teacher.php`,
      data: {
        token: localStorage.token,
        action: "student-profile",
        data: {
          roll: rollid,
        },
      },
    })
      .then((response) => {
        if (response.data.code == "2043") {
          const StudentData = response.data.data;
          this.setState({
            loadingStatus1: false,
            username: StudentData.username,
            userid: StudentData.userid,
            email: StudentData.email,
            roll: StudentData.roll,
            contactno: StudentData.contactno,
          });
        }

        if (response.data.code == "3018") {
          this.setState({
            userRedirect: true,
          });
        }
      })
      .catch((error) => {
        this.setState({
          errorContent: (
            <Alert
              type="danger"
              symbol="Network Error"
              text="There is an error in the network"
            ></Alert>
          ),
        });
      });
  };

  getCheckAndBreakData = () => {
    let directory = window.location.pathname.split("/");
    let rollid = directory[directory.length - 1];
    if (this.state.loadingStatus3 === false) {
      this.setState({ loadingStatus3: true });
    }
    axios({
      method: "post",
      url: `http://${document.location.hostname}/student-management-system/teacher.php`,
      data: {
        token: localStorage.token,
        action: "student-checklist",
        data: {
          roll: rollid,
        },
      },
    })
      .then((response) => {
        if (response.data.code == "2043") {
          const StudentData = response.data.data;
          this.setState({
            loadingStatus2: false,
            loadingStatus3: false,
            breakList: StudentData.breaks,
            checkList: StudentData.checks,
          });
        }

        if (response.data.code[0] === "3") {
          this.setState({
            loadingStatus: false,
            errorContent: (
              <Alert
                type="warning"
                symbol="Incorrect"
                text={response.data.message}
              ></Alert>
            ),
          });
        }

        if (response.data.code == "3018") {
          this.setState({
            userRedirect: true,
          });
        }
      })
      .catch((error) => {
        this.setState({
          errorContent: (
            <Alert
              type="danger"
              symbol="Network Error"
              text="There is an error in the network"
            ></Alert>
          ),
        });
      });
  };

  deleteCheck = (studentRoll, checkDate) => {
    this.setState({
      errorContent: (
        <Alert
          type="warning"
          symbol="Check delete wait"
          text="Wait Check deletation is waiting"
        ></Alert>
      ),
    });
    axios({
      method: "post",
      url: `http://${document.location.hostname}/student-management-system/teacher.php`,
      data: {
        token: localStorage.token,
        action: "delete-check",
        data: {
          roll: studentRoll,
          date: checkDate,
        },
      },
    })
      .then((response) => {
        this.setState({
          errorContent: (
            <Alert
              type="success"
              symbol="Delete Check successs"
              text="The Check is deleted successfully"
            ></Alert>
          ),
        });
        this.getCheckAndBreakData();
      })
      .catch((err) => {
        this.setState({
          errorContent: (
            <Alert
              type="danger"
              symbol="Network Error"
              text="There is an error in the network"
            ></Alert>
          ),
        });
      });
  };

  componentDidMount = () => {
    let directory = window.location.pathname.split("/");
    let rollid = directory[directory.length - 1];
    this.setState({
      roll: rollid,
    });
    this.getProfileData();
    this.getCheckAndBreakData();
  };

  render() {
    let rollid = this.state.roll;
    return (
      <Fragment>
        {this.state.errorContent}
        <div className="container mt-4">
          {this.state.userRedirect ? (
            <Redirect to="/user/teacher/student"></Redirect>
          ) : (
            ""
          )}
          {this.state.loadingStatus1 ? (
            <LoadingBar></LoadingBar>
          ) : (
            <Fragment>
              <h1 className="text-center">Student Profile</h1>
              <div>
                <div className="row mb-3">
                  <label
                    htmlFor="inputEmail3"
                    className="col-12 col-sm-3 col-lg-1 col-form-label"
                  >
                    Username
                  </label>
                  <div className="col">
                    <input
                      type="text"
                      value={this.state.username}
                      className="form-control"
                      disabled
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    htmlFor="inputEmail3"
                    className="col-12 col-sm-3 col-lg-1 col-form-label"
                  >
                    Userid
                  </label>
                  <div className="col">
                    <input
                      type="text"
                      value={this.state.userid}
                      className="form-control"
                      disabled
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    htmlFor="inputEmail3"
                    className="col-12 col-sm-3 col-lg-1 col-form-label"
                  >
                    Email
                  </label>
                  <div className="col">
                    <input
                      type="text"
                      value={this.state.email}
                      className="form-control"
                      disabled
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    htmlFor="inputEmail3"
                    className="col-12 col-sm-3 col-lg-1 col-form-label"
                  >
                    Roll No
                  </label>
                  <div className="col">
                    <input
                      type="text"
                      value={this.state.roll}
                      className="form-control"
                      disabled
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    htmlFor="inputEmail3"
                    className="col-12 col-sm-3 col-lg-1 col-form-label"
                  >
                    Contact No
                  </label>
                  <div className="col">
                    <input
                      type="text"
                      value={this.state.contactno}
                      className="form-control"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </Fragment>
          )}

          <div className="container mt-1">
            {this.state.loadingStatus2 ? (
              <LoadingBar></LoadingBar>
            ) : (
              <div className="table-responsive">
                <table className="table my-2">
                  <thead>
                    <tr>
                      <th scope="col">Date And Time</th>
                      <th scope="col">Reason</th>
                      <th scope="col">Current Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.breakList.map((obj) => (
                      <tr key={obj.workdate}>
                        <td>
                          <input
                            type="datetime-local"
                            className="form-control"
                            value={`${obj.workdate}T${obj.timetext}`}
                            disabled
                          />
                        </td>

                        <td>{obj.reason}</td>
                        <td>
                          {obj.status === "pending" ? (
                            <button className="btn btn-primary">Pending</button>
                          ) : (
                            ""
                          )}
                          {obj.status === "accept" ? (
                            <button className="btn btn-success">Accept</button>
                          ) : (
                            ""
                          )}
                          {obj.status === "reject" ? (
                            <button className="btn btn-danger">Reject</button>
                          ) : (
                            ""
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="container mt-2">
            {this.state.loadingStatus3 ? (
              <LoadingBar></LoadingBar>
            ) : (
              <div className="table-responsive">
                <table className="table my-2">
                  <thead>
                    <tr>
                      <th scope="col">Date</th>
                      <th scope="col">Checkin Time</th>
                      <th scope="col">Checkout Time</th>
                      <th scope="col">Attend</th>
                      <th className="col" scope="col">
                        Setting
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.checkList.map((obj) => (
                      <Fragment>
                        <div
                          className="modal fade"
                          key={`id${obj["workdate"]}999`}
                          id={`cssid${obj["workdate"]}`}
                          tabIndex="-1"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5
                                  className="modal-title"
                                  id="exampleModalLabel"
                                >
                                  Delete Check
                                </h5>
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                  onClick={this.getCheckAndBreakData}
                                ></button>
                              </div>
                              <div className="modal-body">
                                Do you want to delete the check on{" "}
                                {obj["workdate"]} of roll {rollid} ?
                              </div>
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  data-bs-dismiss="modal"
                                  onClick={this.getCheckAndBreakData}
                                >
                                  Close
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                  onClick={() =>
                                    this.deleteCheck(rollid, obj["workdate"])
                                  }
                                >
                                  Delete Check
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <tr key={`${obj["workdate"]}09099`}>
                          <td>
                            <input
                              type="date"
                              className="form-control"
                              value={obj["workdate"]}
                              disabled
                            />
                          </td>
                          <td>
                            <input
                              type="time"
                              className="form-control"
                              value={obj["checkin"]}
                              disabled
                            />
                          </td>
                          <td>
                            <input
                              type="time"
                              className="form-control"
                              value={obj["checkout"]}
                              disabled
                            />
                          </td>
                          <td>
                            <select
                              className="form-select"
                              value={obj["presenttype"]}
                              disabled
                            >
                              <option value="PR">Present</option>
                              <option value="AB">Absent</option>
                            </select>
                          </td>
                          <td>
                            {" "}
                            <button
                              type="button"
                              className="btn btn-dark mx-1 my-1"
                              data-bs-toggle="modal"
                              data-bs-target={`#cssid${obj["workdate"]}`}
                            >
                              Delete Check
                            </button>
                          </td>
                        </tr>
                      </Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}
