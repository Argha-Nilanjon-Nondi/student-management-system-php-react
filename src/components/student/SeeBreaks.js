import React, { Component, Fragment } from "react";
import LoadingBar from "../LoadingBar";
import Alert from "../Alert";
import axios from "axios";

export default class SeeBreaks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      breakList: [],
      loadingStatus: true,
      errorContent: <></>,
    };
  }

  breakDelete = (workdate, time) => {
    this.setState({
      loadingStatus: true,
    });
    axios({
      method: "post",
      url: `http://${document.location.hostname}/student-management-system/student.php`,
      data: {
        token: localStorage.token,
        action: "delete-break",
        data: {
          date: workdate,
          time: time,
        },
      },
    })
      .then((response) => {
        if (response.data.code === "2097") {
          this.setState({
            errorContent: (
              <Alert
                type="success"
                symbol="Delete Break"
                text="Student Break is successfully deleted"
              ></Alert>
            ),
            loadingStatus: false,
          });
          this.updateBreakList();
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
        this.updateBreakList();
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
      url: `http://${document.location.hostname}/student-management-system/student.php`,
      data: {
        token: localStorage.token,
        action: "student-breaklist",
        data: {},
      },
    })
      .then((response) => {
        if (response.data.code === "2043") {
          this.setState({
            breakList: response.data.data.breaks,
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
        <div className="container my-2 table-responsive">
          {this.state.loadingStatus ? (
            <LoadingBar></LoadingBar>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Reason</th>
                  <th scope="col">Date And Time</th>
                  <th scope="col">Current Status</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {this.state.breakList.map((obj) => (
                  <tr key={obj.workdate}>
                    <td className="first-row-item">{obj.reason}</td>
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
                      {obj.status === "pending" ? (
                        <button
                          className="btn btn-dark"
                          onClick={() =>
                            this.breakDelete(obj.workdate, obj.timetext)
                          }
                        >
                          Delete
                        </button>
                      ) : (
                        ""
                      )}
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
