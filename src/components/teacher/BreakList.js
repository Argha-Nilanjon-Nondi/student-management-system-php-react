import React, { Component, Fragment } from "react";
import LoadingBar from "../LoadingBar";
import Alert from "../Alert";
import axios from "axios";
import { Link } from "react-router-dom";

export default class BreakList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      breakList: [],
      loadingStatus: true,
      errorContent: <></>,
    };
  }

  updateBreakStatus = (roll, date, status) => {
    this.setState({
      errorContent: (
        <Alert
          type="warning"
          symbol="Updating wait"
          text="Wait updating break status"
        ></Alert>
      ),
    });
    axios({
      method: "post",
      url: `http://${document.location.hostname}/student-management-system/teacher.php`,
      data: {
        token: localStorage.token,
        action: "update-break",
        data: {
          roll: roll,
          date: date,
          status: status,
        },
      },
    })
      .then((response) => {
        this.updateBreakList();
        if (response.data.code === "2026") {
          this.setState({
            errorContent: (
              <Alert
                type="success"
                symbol="Update successs"
                text="The break is updated successfully"
              ></Alert>
            ),
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

  updateBreakList = () => {
    this.setState({
      breakList: [],
      loadingStatus: true,
    });
    axios({
      method: "post",
      url: `http://${document.location.hostname}/student-management-system/teacher.php`,
      data: {
        token: localStorage.token,
        action: "student-breaklist",
        data: {},
      },
    })
      .then((response) => {
        if (response.data.code === "2022") {
          this.setState({
            breakList: response.data.data,
            loadingStatus: false,
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
    this.updateBreakList();
  };

  render() {
    return (
      <Fragment>
        {this.state.errorContent}
        <div className="container my-2">
          {this.state.loadingStatus ? (
            <LoadingBar></LoadingBar>
          ) : (
            <div className="row my-2 gap-2 justify-content-center">
              {this.state.breakList.map((obj) => (
                <div
                  className="col-lg-4 col-11 border border-dark rounded px-1 py-1"
                  key={obj.workdate}
                >
                  <div>
                    <button className="btn btn-primary mx-1">{obj.roll}</button>
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
                  <div className="my-1 d-flex justify-content-center">
                    <button
                      className="btn btn-success my-1 mx-1"
                      onClick={() =>
                        this.updateBreakStatus(obj.roll, obj.workdate, "accept")
                      }
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-danger my-1"
                      onClick={() =>
                        this.updateBreakStatus(obj.roll, obj.workdate, "reject")
                      }
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Fragment>
    );
  }
}
