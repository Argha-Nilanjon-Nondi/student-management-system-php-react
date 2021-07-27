import React, { Component, Fragment } from 'react'
import LoadingBar from '../LoadingBar'
import Alert from '../Alert'
import axios from 'axios'
export default class AddStudent extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            email:"",
            password:"",
            username:"",
            contactno:"",
            roll:"",
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


    addstudent=(event)=>{
        console.log(this.state)
        this.setState({
            loadingStatus:true,
            errorContent:(<></>)
        })
        axios({
            method: 'post',
            url: `http://${document.location.hostname}/student-management-system/teacher.php`,
            data: {
              "token":localStorage.token,
              "action":"add-student",
              "data":{
                "email":this.state.email,
                "password":this.state.password,
                "username":this.state.username,
                "contactno":this.state.contactno,
                "roll":`"${this.state.roll}"`
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


              if(response.data.code==="2003"){
                  this.setState({
                      loadingStatus:false,
                      errorContent:(<Alert type="success" symbol="Added Student" text="Student data is successfully added"></Alert>)
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
              <h1 className="text-center">Add student</h1>
              <form onSubmit={this.addstudent}>
                    <div className="row mb-3">
                      <label htmlFor="inputEmail3" className="col-12 col-sm-3 col-lg-1 col-form-label">Email</label>
                      <div className="col">
                          <input type="email" value={this.state.email} className="form-control" name="email" onChange={this.handleField} required/>
                       </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="inputEmail3" className="col-12 col-sm-3 col-lg-2 col-form-label">Password</label>
                      <div className="col d-flex">
                             <input type={this.state.showPassword?"text":"password"} value={this.state.password} className="form-control col" name="password" onChange={this.handleField} required/>
                          <div className="custom-field-logo-right col-2 col-lg-1" id="password-show-hide">
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
                      <label htmlFor="inputEmail3" className="col-12 col-sm-3 col-lg-1 col-form-label">Roll No</label>
                      <div className="col">
                          <input type="number" value={this.state.roll} className="form-control" name="roll" onChange={this.handleField}  required/>
                       </div>
                    </div>
                  <div className="row mb-3">
                      <label htmlFor="inputEmail3" className="col-12 col-sm-3 col-lg-1 col-form-label">Contact</label>
                      <div className="col">
                          <input type="tel" value={this.state.contactno} className="form-control" name="contactno" onChange={this.handleField}  required/>
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
