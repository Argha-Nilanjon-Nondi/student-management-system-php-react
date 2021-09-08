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
                      defaultValue={this.state.username}
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
                      defaultValue={this.state.userid}
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
                      defaultValue={this.state.email}
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
                      defaultValue={this.state.roll}
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
                      defaultValue={this.state.contactno}
                      className="form-control"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </Fragment>
          )}

          <div className="container">
            {this.state.loadingStatus2 ? (
              <LoadingBar></LoadingBar>
            ) : (
              <Fragment>
                <h1 className="mt-2 fs-4 text-center">Breaks List</h1>
                <div className="row my-2 gap-2 justify-content-center">
                  {this.state.breakList.map((obj) => (
                    <div
                      className="col-lg-3 col-11 border border-dark rounded px-1 py-1"
                      key={Math.random()}
                    >
                      <div>
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
                      </div>

                      <textarea className="form-control my-1" defaultValue={obj.reason}>
                      </textarea>

                      <input
                        type="datetime-local"
                        className="form-control my-1"
                        defaultValue={`${obj.workdate}T${obj.timetext}`}
                        disabled
                      />
                    </div>
                  ))}
                </div>
              </Fragment>
            )}
          </div>
          <div className="container">
            {this.state.loadingStatus3 ? (
              <LoadingBar></LoadingBar>
            ) : (
              <Fragment>
                <h1 className="mt-4 fs-4 text-center">Checks List</h1>
                <div className="row my-2 gap-2 justify-content-center">
                  {this.state.checkList.map((obj) => (
                    <Fragment>
                      <div
                        className="modal fade"
                        key={`id${obj["workdate"]}999`}
                        id={`cssid${obj["workdate"]}`}
                        tabIndex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                        key={Math.random()}
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
                      <div
                        className="col-lg-3 col-11 border border-dark rounded px-1 py-1"
                        key={Math.random()}
                      >
                        <div className="my-1 d-flex">
                          <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Checkin date"
                          >
                            <i className="far fa-clock"></i>
                          </button>
                          <input
                            className="mx-1 form-control"
                            type="date"
                            defaultValue={obj["workdate"]}
                            disabled
                          />
                        </div>

                        <div className="my-1 d-flex">
                          <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Checkin time"
                          >
                            <i className="fas fa-user-clock"></i>
                          </button>
                          <input
                            className="mx-1 form-control"
                            type="time"
                            defaultValue={obj["checkin"]}
                            disabled
                          />
                        </div>

                        <div className="my-1 d-flex">
                          <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Checkout time"
                          >
                            <i className="fas fa-user-clock"></i>
                          </button>
                          {obj["checkout"] === "00:00:20" ? (
                            <input
                              className="mx-1 form-control"
                              type="text"
                              defaultValue="Never Checkout"
                              disabled
                            />
                          ) : (
                            <input
                              className="mx-1 form-control"
                              type="time"
                              defaultValue={obj["checkout"]}
                              disabled
                            />
                          )}
                        </div>

                        <div className="my-1 d-flex">
                          <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Attend"
                          >
                            <i className="fas fa-concierge-bell"></i>
                          </button>
                          <select
                            className="form-select mx-1"
                            defaultValue={obj["presenttype"]}
                            disabled
                          >
                            <option defaultValue="PR">Present</option>
                            <option defaultValue="AB">Absent</option>
                          </select>
                        </div>

                        <div className="my-1 d-flex justify-content-center">
                          <button
                            type="button"
                            className="btn btn-dark mx-1 my-1"
                            data-bs-toggle="modal"
                            data-bs-target={`#cssid${obj["workdate"]}`}
                          >
                            Delete Check
                          </button>
                        </div>
                      </div>
                    </Fragment>
                  ))}
                </div>
              </Fragment>
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}
