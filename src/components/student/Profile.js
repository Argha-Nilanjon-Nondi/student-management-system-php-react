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

                        <td className="first-row-item">{obj.reason}</td>
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
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.checkList.map((obj) => (
                      <Fragment>

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
