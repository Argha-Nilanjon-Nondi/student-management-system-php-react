import React, { Component ,Fragment} from 'react'
import axios from "axios"
import "./css/login.css"
import LoadingBar from './LoadingBar'
import {Redirect} from "react-router-dom"
export default class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            networkProblem:false,
             homeRedirect:false,
             passwordIncorrect:false,
             showPassword:false,
             creditSend:false,
             email:"",
             password:""
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

    getValues=(event)=>{
        this.setState({
            networkProblem:false,
            passwordIncorrect:false,
            [event.target.name]:event.target.value
        });
    }

    login=(event)=>{
        event.preventDefault()
        this.setState({
            creditSend:true
        });
        axios({
            method: 'post',
            url: `http://${document.location.hostname}/student-management-system/login.php`,
            data: {
                "email":this.state.email,
                "password":this.state.password
              }
          })
          .then((response)=>{
              if(response.data.code==="3003"){
                this.setState({
                    creditSend:false,
                    passwordIncorrect:true
                })
              }

              if(response.data.code==="2000"){
                localStorage.setItem("usertype",response.data.data.usertype);
                localStorage.setItem("token",response.data.data.token);
                this.setState({
                    creditSend:false,
                    passwordIncorrect:true,
                    homeRedirect:true
                })
              }

              
          })
          .catch((err)=>{
              this.setState({
                creditSend:false,
                networkProblem:true
              })
          });
        console.log(`${this.state.email} ${this.state.password}`);
    }
    
    render() {
        return (
            <Fragment>
                {
                    this.state.homeRedirect?<Redirect to={`/user/${localStorage.usertype}`}></Redirect>:""
                }
    <div className="row justify-content-center custom-login justify-content-center">
        <div className="col-12 col-xl-5 custom-login-shadow row py-4 justify-content-center">
            <div className="logo col-12">
                <h1 className="text-center fs-3"><i className="fas fa-school"></i> Student Management System</h1>
            </div>
            <div className="custom-user-form-logo mt-1 col-12">
                <i className="fas fa-user-circle"></i>
            </div>
            
            {
                this.state.passwordIncorrect?<p className="fs-5 text-center text-danger incorrect-password">Password is incorrect</p>:""
            }
            {
                this.state.networkProblem?<p className="fs-5 text-center text-danger incorrect-password">Problem in the netwok</p>:""
            }
            
            <div className="custom-form-name mt-1 col-12">
                <h4 className="text-center fs-3">Login</h4>
            </div>
            <form onSubmit={this.login}>
            {
                this.state.creditSend?<LoadingBar className="col-2"></LoadingBar>:<div className="custom-form-fileds-collection row col-12 justify-content-center" id="field-box-one">
                <div className="custom-2d-field mt-3 col-12 row justify-content-center">
                    <div className="custom-field-logo-left col-2">
                        <i className="fas fa-envelope fs-4"></i>
                    </div>
                    <input type="email" name="email" className="col-10" placeholder="Email" value={this.state.vaue} onChange={this.getValues}/>
                </div>
                <div className="custom-3d-field mt-3 col-12 row justify-content-center">
                    <div className="custom-field-logo-left col-2">
                        <i className="fas fa-lock fs-4"></i>
                    </div>
                    <input type={this.state.showPassword?"text":"password"} name="password" placeholder="Password" className="col-8" value={this.state.password} onChange={this.getValues}/>
                    <div className="custom-field-logo-right col-2" id="password-show-hide">
                        <i className="fas fa-eye fs-4" onClick={this.handlePassword}></i>
                    </div>
                </div>
            </div>
            }
            
            
            <div className="custom-form-fileds-collection row col-12 justify-content-center" id="field-box-two" style={{"display":"none !important"}}>
                
            </div><div className="form-submit-btn mt-3">
                <button className="btn btn-primary fs-3" type="submit"><i className="fas fa-sign-in-alt"></i></button>
            </div>
            </form>
        </div>
        
    </div>
            </Fragment>
        )
    }
}
