import React, { Component, Fragment } from "react";
import LoadingBar from "../LoadingBar";
import Alert from "../Alert";
import axios from "axios";
import { Link } from "react-router-dom";

export default class TeacherPannel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teacherList: [],
      loadingStatus: true,
      errorContent: <></>,
    };
  }

  deleteUser = (event) => {
    this.setState({
      errorContent: (
        <Alert
          type="warning"
          symbol="User delete wait"
          text="Wait user deletation is waiting"
        ></Alert>
      ),
    });
    axios({
      method: "post",
      url: `http://${document.location.hostname}/student-management-system/admin.php`,
      data: {
        token: localStorage.token,
        action: "user-delete",
        data: {
          userid: event.target.value,
        },
      },
    })
      .then((response) => {
        this.setState({
          errorContent: (
            <Alert
              type="success"
              symbol="User delete successs"
              text="The user is deleted successfully"
            ></Alert>
          ),
        });
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

  updateTeacherList = () => {
    this.setState({
      teacherList: [],
      loadingStatus: true,
    });
    axios({
      method: "post",
      url: `http://${document.location.hostname}/student-management-system/admin.php`,
      data: {
        token: localStorage.token,
        action: "teacher-list",
        data: {},
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
        if (response.data.code === "2053") {
          this.setState({
            teacherList: response.data.data,
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
    this.updateTeacherList();
  };

  test = () => {
    alert("Hi");
  };

  render() {
    return (
      <Fragment>
        {this.state.errorContent}
        {this.state.teacherList.map((obj) => (
          <div
            className="modal fade"
            key={`id${obj.userid}`}
            id={`cssid${obj.userid}`}
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Delete User
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={this.updateTeacherList}
                  ></button>
                </div>
                <div className="modal-body">
                  Do you want to delete {obj.userid}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={this.updateTeacherList}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    value={obj.userid}
                    onClick={this.deleteUser}
                  >
                    Delete User
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="container my-2 d-flex align-items-center flex-column table-responsive px-1">
          {this.state.loadingStatus ? (
            <LoadingBar></LoadingBar>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Teacher Name</th>
                  <th scope="col">User ID</th>
                  <th scope="col">Class</th>
                  <th scope="col">Section</th>
                  <th>Setting</th>
                </tr>
              </thead>
              <tbody>
                {this.state.teacherList.map((obj) => (
                  <tr key={obj.userid}>
                    <td className="first-row-item">{obj.username}</td>
                    <td>{obj.userid}</td>
                    <td>{obj.class}</td>
                    <td>{obj.section}</td>
                    <td>
                      <Link
                        to={`/user/admin/editTeacher/${obj.userid}`}
                        className="btn btn-dark mx-1 my-1"
                      >
                        Update
                      </Link>
                      <button
                        type="button"
                        className="btn btn-dark mx-1 my-1"
                        data-bs-toggle="modal"
                        data-bs-target={`#cssid${obj.userid}`}
                      >
                        Delete
                      </button>{" "}
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
