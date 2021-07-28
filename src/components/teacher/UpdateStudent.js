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
            userid:"",
            username:"",
            contactno:"",
            location:"",
            oldroll:"",
            newroll:"",
            loadingStatus:true,
            errorContent:(<></>),
            userRedirect:false
        }

       
    }

    componentDidMount=()=>{
        let directory=window.location.pathname.split("/");
        let rollid=directory[directory.length-1]
        this.setState({
            location:rollid
        });
        axios({
            method: 'post',
            url: `http://${document.location.hostname}/student-management-system/teacher.php`,
            data: {
              "token":localStorage.token,
               "action":"student-profile",
               "data":{
                  "roll":rollid
               }
            }
          })
          .then((response)=>{
              if(response.data.code=="3018"){
                 this.setState({
                  userRedirect:true
                 });
              }


              if(response.data.code=="2043"){
                  const studentData=response.data.data;
                  this.setState({
                      loadingStatus:false,
                      username:studentData.username,
                      userid:studentData.userid,
                      contactno:studentData.contactno,
                      oldroll:studentData.roll,
                      newroll:studentData.roll
                  })
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
          .catch((error)=>{
            this.setState({
                errorContent:(<Alert type="danger" symbol="Network Error" text="There is an error in the network"></Alert>)
              })
          });
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
              "action":"student-update",
              "data":{
                "userid":this.state.userid,
                "username":this.state.username,
                "oldroll":this.state.oldroll,
                "newroll":this.state.newroll,
                "contactno":this.state.contactno
              }
            }
          })
          .then((response)=>{


              if(response.data.code[0]=="3"){
                 this.setState({
                     loadingStatus:false,
                     errorContent:(<Alert type="warning" symbol="Incorrect" text={response.data.message}></Alert>)
                 });
              }


              if(response.data.code=="2063"){
                  this.setState({
                      loadingStatus:false,
                      oldroll:this.state.newroll,
                      errorContent:(<Alert type="success" symbol="Updated" text="Student data is successfully updated"></Alert>)
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
                    this.state.userRedirect?<Redirect to="/user/teacher/student"></Redirect>:""
                }
                {
                    this.state.loadingStatus?<LoadingBar></LoadingBar>:
              <Fragment>
              <h1 className="text-center">Update Student {this.state.location}</h1>
              <form onSubmit={this.updateData}>

                  <div className="row mb-3">
                      <label htmlFor="inputEmail3" className="col-12 col-sm-3 col-lg-1 col-form-label">Username</label>
                      <div className="col">
                          <input type="text" value={this.state.username} className="form-control" name="username" onChange={this.handleField} required/>
                       </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="inputEmail3" className="col-12 col-sm-3 col-lg-1 col-form-label">Old Roll No</label>
                      <div className="col">
                          <input type="number" value={this.state.oldroll} className="form-control" name="oldroll" disabled/>
                       </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="inputEmail3" className="col-12 col-sm-3 col-lg-1 col-form-label">New Roll No</label>
                      <div className="col">
                          <input type="number" value={this.state.newroll} className="form-control" name="newroll" onChange={this.handleField}  required/>
                       </div>
                    </div>

                  <div className="row mb-3">
                      <label htmlFor="inputEmail3" className="col-12 col-sm-3 col-lg-1 col-form-label">Contact</label>
                      <div className="col">
                          <input type="tel" value={this.state.contactno} className="form-control" name="contactno" onChange={this.handleField}  required/>
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
