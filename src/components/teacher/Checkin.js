import React, { Component, Fragment } from "react";
import LoadingBar from "../LoadingBar";
import Alert from "../Alert";
import axios from "axios";

export default class Checkin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      roll: 0,
      datetime: "",
      attend: "PR",
      checkinList: [],
      loadingStatus: true,
      errorContent: <></>,
    };
  }

  checkin = (roll, date, attend, checkintime) => {};

  handleField = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  addCheckinInState = (event) => {
    event.preventDefault();
    let singleData = [
      {
        roll: this.state.roll,
        datetime: this.state.datetime,
        attend: this.state.attend
      }
    ];
    if (
      this.state.roll != 0 ||
      this.state.datetime != "" ||
      this.state.attend != ""
    ) {
      if (this.state.checkinList.length == 0) {
        this.setState({
          checkinList: this.state.checkinList.concat(singleData)
        });
      }
      this.state.checkinList.map((obj) => {
        if (obj["roll"] != this.state.roll) {
          this.setState({
            checkinList:this.state.checkinList.concat(singleData)
          });
        }
      });
    }
    console.log(this.state.checkinList)
  };

  addCheckinInDB = (roll, datetime, attend) => {
    let studentRoll = `"${roll}"`;
    let studentAttend = attend;
    let checkinDate = datetime.split("T")[0];
    let checkinTime = datetime.split("T")[1];

    this.setState({
      errorContent: (
        <Alert
          type="warning"
          symbol="Wait"
          text={`Roll:${roll} Student operation is on the way .`}
        ></Alert>
      ),
    });

    axios({
      method: "post",
      url: `http://${document.location.hostname}/student-management-system/teacher.php`,
      data: {
        token: localStorage.token,
        action: "create-checkin",
        data: {
          roll: studentRoll,
          date: checkinDate,
          checkin: checkinTime,
          presenttype: studentAttend,
        },
      },
    })
      .then((response) => {
        if (response.data.code == "2035") {
          this.setState({
            errorContent: (
              <Alert
                type="success"
                symbol="Checkin Success"
                text="Student is successfully checkedin"
              ></Alert>
            ),
          });
        }

        if (response.data.code[0] == "3") {
          this.setState({
            errorContent: (
              <Alert
                type="warning"
                symbol="Warning"
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

  deleteCheckinFromState = (obj) => {
    let removeItem = obj;
    let studentCheckinList = this.state.checkinList;
    let UpdatedCheckinList = studentCheckinList.filter(
      (item) => item != removeItem
    );
    this.setState({ checkinList: UpdatedCheckinList });
  };

  render() {
    return (
      <Fragment>
        {this.state.errorContent}

        <div className="container my-2">
          <h1 className="text-center">Add Checkin</h1>
          <form onSubmit={this.addCheckinInState}>
            <div className="row mb-3">
              <label
                htmlFor="inputEmail3"
                className="col-12 col-sm-3 col-lg-1 col-form-label"
              >
                Roll
              </label>
              <div className="col">
                <input
                  className="form-control"
                  name="roll"
                  type="number"
                  value={this.state.roll}
                  onChange={this.handleField}
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <label
                htmlFor="inputEmail3"
                className="col-12 col-sm-3 col-lg-1 col-form-label"
              >
                Date And Time
              </label>
              <div className="col">
                <input
                  className="form-control"
                  name="datetime"
                  type="datetime-local"
                  value={this.state.datetime}
                  onChange={this.handleField}
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <label
                htmlFor="inputEmail3"
                className="col-12 col-sm-3 col-lg-1 col-form-label"
              >
                Attend
              </label>
              <div className="col">
                <select
                  className="form-select"
                  name="attend"
                  value={this.state.attend}
                  onChange={this.handleField}
                >
                  <option value="PR">Present</option>
                  <option value="AB">Absent</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </form>
          <div className="table-responsive">
            <table className="table my-2">
              <thead>
                <tr>
                  <th scope="col">Roll</th>
                  <th scope="col">Date and Time</th>
                  <th scope="col">Attend</th>
                  <th scope="col">Setting</th>
                </tr>
              </thead>
              <tbody>
                {this.state.checkinList.map((obj) => (
                  <tr key={obj["roll"]}>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        value={obj["roll"]}
                        disabled
                      />
                    </td>
                    <td>
                      <input
                        type="datetime-local"
                        className="form-control"
                        value={obj["datetime"]}
                        disabled
                      />
                    </td>
                    <td>
                      <select
                        className="form-select"
                        value={obj["attend"]}
                        disabled
                      >
                        <option value="PR">Present</option>
                        <option value="AB">Absent</option>
                      </select>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-dark mx-1 my-1"
                        onClick={() =>
                          this.addCheckinInDB(
                            obj["roll"],
                            obj["datetime"],
                            obj["attend"]
                          )
                        }
                      >
                        Checkin
                      </button>
                      <button
                        type="button"
                        className="btn btn-dark mx-1 my-1"
                        onClick={() => this.deleteCheckinFromState(obj)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Fragment>
    );
  }
}
