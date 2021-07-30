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
        attend: this.state.attend,
      },
    ];
    if (
      this.state.roll != 0 ||
      this.state.datetime != "" ||
      this.state.attend != ""
    ) {
      if (this.state.checkinList.length == 0) {
        this.setState({
          checkinList: this.state.checkinList.concat(singleData),
        });
      }
      this.state.checkinList.map((obj) => {
        if (obj["roll"] != this.state.roll) {
          this.setState({
            checkinList: this.state.checkinList.concat(singleData),
          });
        }
      });
    }
    console.log(this.state.checkinList);
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
          <div className="row my-2 gap-2 justify-content-center">
            {this.state.checkinList.map((obj) => (
              <div
                className="col-lg-3 col-11 border border-dark rounded px-1 py-1"
                key={""}
              >
                <div>
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Roll"
                  >
                    {obj["roll"]}
                  </button>
                </div>
                <div className="my-1 d-flex">
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Checkin date and time"
                  >
                    <i class="far fa-clock"></i>
                  </button>
                  <input
                    className="mx-1 form-control"
                    type="datetime-local"
                    value={obj["datetime"]}
                    disabled
                  />
                </div>
                <div className="my-1 d-flex">
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Attend"
                  >
                    <i class="fas fa-concierge-bell"></i>
                  </button>
                  <select
                    className="form-select mx-1"
                    value={obj["attend"]}
                    disabled
                  >
                    <option value="PR">Present</option>
                    <option value="AB">Absent</option>
                  </select>
                </div>
                <div className="my-1 d-flex justify-content-center">
                  <button
                    type="button"
                    class="btn btn-dark"
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
                    class="btn btn-dark mx-1"
                    onClick={() => this.deleteCheckinFromState(obj)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Fragment>
    );
  }
}
