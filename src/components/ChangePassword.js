import React, { Component, Fragment } from "react";
import LoadingBar from "./LoadingBar";
import Alert from "./Alert";
import { Redirect } from "react-router-dom";
import axios from "axios";
export default class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      new_password: "",
      loadingStatus: false,
      showPassword1: false,
      showPassword2: false,
      errorContent: <></>,
      userRediect: false,
    };
  }

  handlePassword1 = () => {
    if (this.state.showPassword1 === true) {
      this.setState({ showPassword1: false });
    }

    if (this.state.showPassword1 === false) {
      this.setState({ showPassword1: true });
    }
  };

  handlePassword2 = () => {
    if (this.state.showPassword2 === true) {
      this.setState({ showPassword2: false });
    }

    if (this.state.showPassword2 == false) {
      this.setState({ showPassword2: true });
    }
  };

  changepass = (event) => {
    event.preventDefault();
    this.setState({
      loadingStatus: true,
      errorContent: <></>,
    });
    axios({
      method: "post",
      url: `http://${document.location.hostname}/student-management-system/common.php`,
      data: {
        action: "change-password",
        data: {
          token: localStorage.token,
          "old-password": this.state.password,
          "new-password": this.state.new_password,
        },
      },
    })
      .then((response) => {
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

        if (response.data.code === "2099") {
          this.setState({
            loadingStatus: false,
            userRediect:true,
            errorContent: (
              <Alert
                type="success"
                symbol="Changed"
                text="Password is successfully changed"
              ></Alert>
            ),
          });
        }
      })
      .catch((error) => {
        this.setState({
          loadingStatus: false,
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

  handleField = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <Fragment>
        {this.state.errorContent}
        {this.state.userRediect ? <Redirect to="/login/"></Redirect> : ""}
        {this.state.loadingStatus ? (
          <LoadingBar></LoadingBar>
        ) : (
          <div
            className="container mt-4 row justify-content-center"
            style={{ margin: "0 auto" }}
          >
            <form onSubmit={this.changepass} className="col-lg-11">
              <h1 className="text-center">Change Password</h1>

              <div className="row mb-3">
                <label
                  htmlFor="inputEmail3"
                  className="col-12 col-sm-3 col-lg-2 col-form-label"
                >
                  Old Password
                </label>
                <div className="col row">
                  <input
                    type={this.state.showPassword1 ? "text" : "password"}
                    value={this.state.password}
                    className="form-control col col-lg"
                    name="password"
                    onChange={this.handleField}
                    required
                  />
                  <div
                    className="custom-field-logo-right col-2 col-lg-1"
                    id="password-show-hide"
                  >
                    <i
                      className="fas fa-eye fs-4"
                      onClick={this.handlePassword1}
                    ></i>
                  </div>
                </div>
              </div>

              <div className="row mb-3">
                <label
                  htmlFor="inputEmail3"
                  className="col-12 col-sm-3 col-lg-2 col-form-label"
                >
                  NeW Password
                </label>
                <div className="col row">
                  <input
                    type={this.state.showPassword2 ? "text" : "password"}
                    value={this.state.new_password}
                    className="form-control col"
                    name="new_password"
                    onChange={this.handleField}
                    required
                  />
                  <div
                    className="custom-field-logo-right col-2 col-lg-1"
                    id="password-show-hide"
                  >
                    <i
                      className="fas fa-eye fs-4"
                      onClick={this.handlePassword2}
                    ></i>
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-primary">
                Change
              </button>
            </form>
          </div>
        )}
      </Fragment>
    );
  }
}
