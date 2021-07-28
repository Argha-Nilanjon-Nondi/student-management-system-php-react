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
        <div className="container my-2 d-flex align-items-center flex-column table-responsive">
          {this.state.loadingStatus ? (
            <LoadingBar></LoadingBar>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Roll</th>
                  <th scope="col">Reason</th>
                  <th scope="col">Date And Time</th>
                  <th scope="col">Current Status</th>
                  <th scope="col">Update Status</th>
                </tr>
              </thead>
              <tbody>
                {this.state.breakList.map((obj) => (
                  <tr key={obj.workdate}>
                    <td>{obj.roll}</td>
                    <td>{obj.reason}</td>
                    <td>
                      <input
                        type="datetime-local"
                        className="form-control"
                        value={`${obj.workdate}T${obj.timetext}`}
                        disabled
                      />
                    </td>
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
                    <td>
                      <button
                        className="btn btn-success my-1 mx-1"
                        onClick={() =>
                          this.updateBreakStatus(
                            obj.roll,
                            obj.workdate,
                            "accept"
                          )
                        }
                      >
                        Accept
                      </button>
                      <button
                        className="btn btn-danger my-1"
                        onClick={() =>
                          this.updateBreakStatus(
                            obj.roll,
                            obj.workdate,
                            "reject"
                          )
                        }
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Fragment>
    );
  }
}
