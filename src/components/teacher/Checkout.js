import React, { Component, Fragment } from "react";
import Alert from "../Alert";
import axios from "axios";
export default class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      roll: 0,
      datetime: "",
      checkoutList: [],
      loadingStatus: true,
      errorContent: <></>,
    };
  }

  handleField = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  addCheckoutInState = (event) => {
    event.preventDefault();
    let singleData = [
      {
        roll: this.state.roll,
        datetime: this.state.datetime,
      },
    ];
    if (this.state.roll != 0 || this.state.datetime != "") {
      if (this.state.checkoutList.length == 0) {
        this.setState({
          checkoutList: this.state.checkoutList.concat(singleData),
        });
      }
      this.state.checkoutList.map((obj) => {
        if (obj["roll"] != this.state.roll) {
          this.setState({
            checkoutList: this.state.checkoutList.concat(singleData),
          });
        }
      });
    }
  };

  addCheckoutInDB = (roll, datetime, attend) => {
    let studentRoll = `"${roll}"`;
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
        action: "create-checkout",
        data: {
          roll: studentRoll,
          date: checkinDate,
          checkout: checkinTime,
        },
      },
    })
      .then((response) => {
        if (response.data.code == "2036") {
          this.setState({
            errorContent: (
              <Alert
                type="success"
                symbol="Checkout Success"
                text="Student is successfully checkedout"
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

  deleteCheckoutFromState = (obj) => {
    let removeItem = obj;
    let studentcheckoutList = this.state.checkoutList;
    let UpdatedcheckoutList = studentcheckoutList.filter(
      (item) => item != removeItem
    );
    this.setState({ checkoutList: UpdatedcheckoutList });
  };

  render() {
    return (
      <Fragment>
        {this.state.errorContent}

        <div className="container my-2">
          <h1 className="text-center">Add Checkout</h1>
          <form onSubmit={this.addCheckoutInState}>
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

            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </form>
          <div className="row my-2 gap-2 justify-content-center">
            {this.state.checkoutList.map((obj) => (
              <div
                className="col-lg-4 col-11 border border-dark rounded px-1 py-1"
                key={obj["roll"]}
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
                    title="Checkout date and time"
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
                <div className="my-1 d-flex justify-content-center">
                  <button
                    type="button"
                    className="btn btn-dark mx-1 my-1"
                    onClick={() =>
                      this.addCheckoutInDB(
                        obj["roll"],
                        obj["datetime"],
                        obj["attend"]
                      )
                    }
                  >
                    Checkout
                  </button>
                  <button
                    type="button"
                    className="btn btn-dark mx-1 my-1"
                    onClick={() => this.deleteCheckoutFromState(obj)}
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
