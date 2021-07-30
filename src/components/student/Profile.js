import React, { Component, Fragment } from "react";
import LoadingBar from "../LoadingBar";
import Alert from "../Alert";
import axios from "axios";
import { Redirect } from "react-router-dom";
export default class Profile extends Component {
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

    axios({
      method: "post",
      url: `http://${document.location.hostname}/student-management-system/student.php`,
      data: {
        token: localStorage.token,
        action: "student-info",
        data: {
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
    if (this.state.loadingStatus3 === false) {
      this.setState({ loadingStatus3: true });
    }
    axios({
      method: "post",
      url: `http://${document.location.hostname}/student-management-system/student.php`,
      data: {
        token: localStorage.token,
        action: "student-checkbreaklist",
        data: {
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

  componentDidMount = () => {
    this.getProfileData();
    this.getCheckAndBreakData();
  };

  render() {
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
                      key={obj.workdate}
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

                      <textarea className="form-control my-1">
                        {obj.reason}
                      </textarea>

                      <input
                        type="datetime-local"
                        className="form-control my-1"
                        value={`${obj.workdate}T${obj.timetext}`}
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
                        className="col-lg-3 col-11 border border-dark rounded px-1 py-1"
                        key={""}
                      >
                        <div className="my-1 d-flex">
                          <button
                            type="button"
                            class="btn btn-primary"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Checkin date"
                          >
                            <i class="far fa-clock"></i>
                          </button>
                          <input
                            className="mx-1 form-control"
                            type="date"
                            value={obj["workdate"]}
                            disabled
                          />
                        </div>

                        <div className="my-1 d-flex">
                          <button
                            type="button"
                            class="btn btn-primary"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Checkin time"
                          >
                            <i class="fas fa-user-clock"></i>
                          </button>
                          <input
                            className="mx-1 form-control"
                            type="time"
                            value={obj["checkin"]}
                            disabled
                          />
                        </div>

                        <div className="my-1 d-flex">
                          <button
                            type="button"
                            class="btn btn-primary"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Checkout time"
                          >
                            <i class="fas fa-user-clock"></i>
                          </button>
                          <input
                            className="mx-1 form-control"
                            type="time"
                            value={obj["checkout"]}
                            disabled
                          />
                        </div>

                        <div className="my-1 d-flex">
                          <button
                            type="button"
                            class="btn btn-primary"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Attend"
                          >
                            <i class="fas fa-concierge-bell"></i>
                          </button>
                          <select
                            className="form-select mx-1"
                            value={obj["presenttype"]}
                            disabled
                          >
                            <option value="PR">Present</option>
                            <option value="AB">Absent</option>
                          </select>
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
