import React, { Component, Fragment } from 'react'
import LoadingBar from '../LoadingBar'
import Alert from '../Alert'
import {
  Redirect
} from "react-router-dom"
import axios from 'axios'
export default class UpdateTeacher extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            username:"",
            contactno:"",
            class:"",
            section:"",
            location:"",
            userid:"",
            loadingStatus:true,
            errorContent:(<></>),
            userRedirect:false
        }

       
    }

    componentDidMount=()=>{
        let directory=window.location.pathname.split("/");
        let userid=directory[directory.length-1]
        this.setState({
            location:userid
        });
        axios({
            method: 'post',
            url: `http://${document.location.hostname}/student-management-system/admin.php`,
            data: {
              "token":localStorage.token,
               "action":"teacher-profile",
               "data":{
                  "teacherid":userid
               }
            }
          })
          .then((response)=>{


              if(response.data.code=="3051"){
                 this.setState({
                  userRedirect:true
                 });
              }


              if(response.data.code=="2047"){
                  const teacherData=response.data.data;
                  this.setState({
                      loadingStatus:false,
                      username:teacherData.username,
                      contactno:teacherData.contactno,
                      class:teacherData.class,
                      section:teacherData.section
                  })
              }


          })
          .catch((error)=>{
            this.setState({
                errorContent:(<Alert type="danger" symbol="Network Error" text="There is an error in the network"></Alert>)
              })
          });
    }

    updateData=(event)=>{
        this.setState({
            loadingStatus:true,
            errorContent:(<></>)
        })
        axios({
            method: 'post',
            url: `http://${document.location.hostname}/student-management-system/admin.php`,
            data: {
              "token":localStorage.token,
              "action":"teacher-update",
              "data":{
                "userid":this.state.location,
                "username":this.state.username,
                "section":this.state.section,
                "class":this.state.class,
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


              if(response.data.code=="2073"){
                  const teacherData=response.data.data;
                  this.setState({
                      loadingStatus:false,
                      errorContent:(<Alert type="success" symbol="Updated" text="Teacher data is successfully updated"></Alert>)
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
                    this.state.userRedirect?<Redirect to="/user/admin/teacher"></Redirect>:""
                }
                {
                    this.state.loadingStatus?<LoadingBar></LoadingBar>:
              <Fragment>
              <h1 className="text-center">Update teacher {this.state.location}</h1>
              <form onSubmit={this.updateData}>
                  <div className="row mb-3">
                      <label htmlFor="inputEmail3" className="col-12 col-sm-3 col-lg-1 col-form-label">Username</label>
                      <div className="col">
                          <input type="text" value={this.state.username} className="form-control" name="username" onChange={this.handleField} required/>
                       </div>
                    </div>
                  <div className="row mb-3">
                      <label htmlFor="inputEmail3" className="col-12 col-sm-3 col-lg-1 col-form-label">Contact</label>
                      <div className="col">
                          <input type="tel" value={this.state.contactno} className="form-control" name="contactno" onChange={this.handleField}  required/>
                       </div>
                    </div>
                    <div className="row mb-3">
                      <label htmlFor="inputEmail3" className="col-12 col-sm-3 col-lg-1 col-form-label">Class</label>
                      <div className="col">
                          <select value={this.state.class} className="form-select" name="class" onChange={this.handleField}>
                             <option value="1">1</option>
                             <option value="2">2</option>
                             <option value="3">3</option>
                             <option value="4">4</option>
                             <option value="5">5</option>
                             <option value="6">6</option>
                             <option value="7">7</option>
                             <option value="8">8</option>
                             <option value="9">9</option>
                             <option value="10">10</option>
                           </select>
                       </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-12 col-sm-3 col-lg-1 col-form-label">Section</label>
                      <div className="col">
                         <select className="form-select" value={this.state.section} name="section" onChange={this.handleField}>
                            <option value="A">A</option>
                            <option value="B">B</option>
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
