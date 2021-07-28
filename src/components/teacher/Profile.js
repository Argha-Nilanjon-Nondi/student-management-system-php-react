import React, { Component, Fragment } from "react";
import LoadingBar from "../LoadingBar";
import Alert from "../Alert";
import axios from "axios";
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
      loadingStatus: true,
      errorContent: <></>,
    };
  }

  getProfileData = () => {
    axios({
      method: "post",
      url: `http://${document.location.hostname}/student-management-system/teacher.php`,
      data: {
        token: localStorage.token,
        action: "own-profile",
        data: {},
      },
    })
      .then((response) => {
        if (response.data.code == "2047") {
          const teacherData = response.data.data;
          this.setState({
            loadingStatus: false,
            username: teacherData.username,
            userid: teacherData.userid,
            email: teacherData.email,
            class: teacherData.class,
            section: teacherData.section,
            contactno: teacherData.contactno,
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

  render() {
    this.getProfileData();
    return (
      <Fragment>
        {this.state.errorContent}
        <div className="container mt-4">
          {this.state.loadingStatus ? (
            <LoadingBar></LoadingBar>
          ) : (
            <Fragment>
              <h1 className="text-center">Teacher Profile</h1>
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
                    Class
                  </label>
                  <div className="col">
                    <input
                      type="text"
                      value={this.state.class}
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
                    Section
                  </label>
                  <div className="col">
                    <input
                      type="text"
                      value={this.state.section}
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
        </div>
      </Fragment>
    );
  }
}
