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
            <div className="row my-2 gap-2 justify-content-center">
              {this.state.breakList.map((obj) => (
                <div
                  className="col-lg-4 col-11 border border-dark rounded px-1 py-1"
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
                  <div className="my-1 d-flex justify-content-center">
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
