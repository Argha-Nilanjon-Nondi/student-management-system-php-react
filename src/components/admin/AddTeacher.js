import React, { Component, Fragment } from 'react'
import LoadingBar from '../LoadingBar'
import Alert from '../Alert'
import {
  Redirect
} from "react-router-dom"
import axios from 'axios'
export default class AdddTeacher extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            email:"",
            password:"",
            username:"",
            contactno:"",
            class:"1",
            section:"A",
            loadingStatus:false,
            showPassword:false,
            errorContent:(<></>)
        }

       
    }


    handlePassword=()=>{
        if(this.state.showPassword===true){
            this.setState({
                showPassword:false
            })
        }

        if(this.state.showPassword===false){
            this.setState({
                showPassword:true
            })
        }
    }


    addteacher=(event)=>{
        this.setState({
            loadingStatus:true,
            errorContent:(<></>)
        })
        axios({
            method: 'post',
            url: `http://${document.location.hostname}/student-management-system/admin.php`,
            data: {
              "token":localStorage.token,
              "action":"add-teacher",
              "data":{
                "email":this.state.email,
                "password":this.state.password,
                "username":this.state.username,
                "section":this.state.section,
                "class":this.state.class,
                "contactno":this.state.contactno
              }
            }
          })
          .then((response)=>{
              if(response.data.code[0]==="3"){
                 this.setState({
                     loadingStatus:false,
                     errorContent:(<Alert type="warning" symbol="Incorrect" text={response.data.message}></Alert>)
                 });
              }


              if(response.data.code==="2005"){
                  this.setState({
                      loadingStatus:false,
                      errorContent:(<Alert type="success" symbol="Added Teacher" text="Teacher data is successfully added"></Alert>)
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
            <div className="container my-4">
                {
                    this.state.loadingStatus?<LoadingBar></LoadingBar>:
              <Fragment>
              <h1 className="text-center">Add teacher</h1>
              <form onSubmit={this.addteacher}>
                    <div className="row mb-3">
                      <label htmlFor="inputEmail3" className="col-12 col-sm-3 col-lg-1 col-form-label">Email</label>
                      <div className="col">
                          <input type="email" value={this.state.email} className="form-control" name="email" onChange={this.handleField} required/>
                       </div>
                    </div>
                    <div className="row mb-3">
                      <label htmlFor="inputEmail3" className="col-12 col-sm-3 col-lg-1 col-form-label">Password</label>
                      <div className="col d-flex flex-row">
                          <div className="col-12 col-lg-11">
                             <input type={this.state.showPassword?"text":"password"} value={this.state.password} className="form-control" name="password" onChange={this.handleField} required/>
                          </div>
                          <div className="custom-field-logo-right col" id="password-show-hide">
                              <i className="fas fa-eye fs-4" onClick={this.handlePassword}></i>
                           </div>
                       </div>
                    </div>
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
                    <button type="submit" className="btn btn-primary" >Add</button>
                </form>
                </Fragment>
                }
            </div>
            </Fragment>
        )
    }
}
