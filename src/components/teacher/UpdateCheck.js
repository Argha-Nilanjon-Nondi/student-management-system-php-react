import React, { Component, Fragment } from 'react'
import LoadingBar from '../LoadingBar'
import Alert from '../Alert'
import {
  Redirect
} from "react-router-dom"
import axios from 'axios'
export default class UpdateStudent extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            roll:0,
            checkdate:"",
            attend:"PR",
            checkin:"",
            checkout:"",
            loadingStatus:false,
            errorContent:(<></>)
        }

       
    }

    updateData=(event)=>{
        event.preventDefault();
        this.setState({
            loadingStatus:true,
            errorContent:(<></>)
        })

        axios({
            method: 'post',
            url: `http://${document.location.hostname}/student-management-system/teacher.php`,
            data: {
              "token":localStorage.token,
              "action":"update-check",
              "data":{
                  "roll":this.state.roll,
                  "date":this.state.checkdate,
                  "checkin":this.state.checkin,
                  "checkout":this.state.checkout,
                  "presenttype":this.state.attend
              }
            }
          })
          .then((response)=>{
              
              console.log(response)
              if(response.data.code[0]=="3"){
                 this.setState({
                     loadingStatus:false,
                     errorContent:(<Alert type="warning" symbol="Incorrect" text={response.data.message}></Alert>)
                 });
              }


              if(response.data.code=="2066"){
                  this.setState({
                      loadingStatus:false,
                      errorContent:(<Alert type="success" symbol="Updated" text="Student check is successfully updated"></Alert>)
                  })
              }


          })
          .catch((error)=>{
            this.setState({
                loadingStatus:false,
                errorContent:(<Alert type="danger" symbol="Network Error" text="There is an error in the network"></Alert>)
              })
          });
    }

    handleField=(event)=>{
        this.setState({
          [event.target.name]:event.target.value
        });
    }
    
    render() {
        return (
            <Fragment>
            {
                this.state.errorContent
            }
            <div className="container mt-4">
                {
                    this.state.loadingStatus?<LoadingBar></LoadingBar>:
              <Fragment>
              <h1 className="text-center">Update Check</h1>
              <form onSubmit={this.updateData}>

                   <div className="row mb-3">
                      <label htmlFor="inputEmail3" className="col-12 col-sm-3 col-lg-1 col-form-label">Roll</label>
                      <div className="col">
                          <input className="form-control" name="roll" type="number" value={this.state.roll} onChange={this.handleField} required/>
                       </div>
                    </div>

                  <div className="row mb-3">
                      <label htmlFor="inputEmail3" className="col-12 col-sm-3 col-lg-1 col-form-label">Check Date</label>
                      <div className="col">
                          <input type="date" value={this.state.checkdate} className="form-control" name="checkdate" onChange={this.handleField} required/>
                       </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="inputEmail3" className="col-12 col-sm-3 col-lg-1 col-form-label">Checkin</label>
                      <div className="col">
                          <input type="time" value={this.state.checkin} className="form-control" name="checkin" onChange={this.handleField} required/>
                       </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="inputEmail3" className="col-12 col-sm-3 col-lg-1 col-form-label">Checkout</label>
                      <div className="col">
                          <input type="time" value={this.state.checkout} className="form-control" name="checkout" onChange={this.handleField} required/>
                       </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="inputEmail3" className="col-12 col-sm-3 col-lg-1 col-form-label">Attend</label>
                      <div className="col">
                         <select className="form-select" name="attend" value={this.state.attend} onChange={this.handleField}>
                            <option value="PR">Present</option>
                            <option value="AB">Absent</option>
                          </select>
                       </div>
                    </div>

                    <button type="submit" className="btn btn-primary" >Update</button>
                </form>
                </Fragment>
                }
            </div>
            </Fragment>
        )
    }
}
