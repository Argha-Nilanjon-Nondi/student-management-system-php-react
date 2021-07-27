import React, { Component, Fragment } from "react";
import LoadingBar from "../LoadingBar";
import Alert from "../Alert";
import axios from "axios";
export default class AddBreak extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reason: "",
      datetime: "",
      loadingStatus: false,
      errorContent: <></>,
    };
  }

  addBreak = (event) => {
    event.preventDefault();
    let breakDate = this.state.datetime.split("T")[0];
    let breakTime = this.state.datetime.split("T")[1];
    this.setState({
      loadingStatus: true,
      errorContent: <></>,
    });
    axios({
      method: "post",
      url: `http://${document.location.hostname}/student-management-system/student.php`,
      data: {
        token: localStorage.token,
        action: "request-break",
        data: {
            date:breakDate,
            time:breakTime,
            reason:this.state.reason
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

        if (response.data.code === "2047") {
          this.setState({
            loadingStatus: false,
            errorContent: (
              <Alert
                type="success"
                symbol="Added Break"
                text="Student Break is successfully placed"
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
        <div className="container my-4">
          {this.state.loadingStatus ? (
            <LoadingBar></LoadingBar>
          ) : (
            <Fragment>
              <h1 className="text-center">Request for break</h1>
              <form onSubmit={this.addBreak}>
                <div className="row mb-3">
                  <label
                    htmlFor="inputEmail3"
                    className="col-12 col-sm-3 col-lg-2 col-form-label"
                  >
                    Date And Time
                  </label>
                  <div className="col">
                    <input
                      type="datetime-local"
                      value={this.state.datetime}
                      className="form-control"
                      name="datetime"
                      onChange={this.handleField}
                      required
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    htmlFor="inputEmail3"
                    className="col-12 col-sm-3 col-lg-2 col-form-label"
                  >
                    Reason
                  </label>
                  <div className="col">
                    <textarea
                      value={this.state.reason}
                      className="form-control"
                      name="reason"
                      onChange={this.handleField}
                      required
                    >

                    </textarea>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary">
                  Add Break
                </button>
              </form>
            </Fragment>
          )}
        </div>
      </Fragment>
    );
  }
}
