import React, { Component, Fragment } from "react";
import LoadingBar from "../LoadingBar";
import Alert from "../Alert";
import axios from "axios";
export default class TeacherProfile extends Component {
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

  componentDidMount = () => {
    let directory = window.location.pathname.split("/");
    let userid = directory[directory.length - 1];
    this.setState({
      location: userid,
    });
    axios({
      method: "post",
      url: `http://${document.location.hostname}/student-management-system/admin.php`,
      data: {
        token: localStorage.token,
        action: "teacher-profile",
        data: {
          teacherid: userid,
        },
      },
    })
      .then((response) => {
        if (response.data.code == "3051") {
          this.setState({
            userRedirect: true,
          });
        }

        if (response.data.code == "2047") {
          const teacherData = response.data.data;
          this.setState({
            loadingStatus: false,
            email:teacherData.email,
            userid:userid,
            username: teacherData.username,
            contactno: teacherData.contactno,
            class: teacherData.class,
            section: teacherData.section
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
