import React, { Component, Fragment } from 'react'
import LoadingBar from './LoadingBar'
import {
  Redirect
} from "react-router-dom"
export default class Logout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loginRedirect:false
        }
    }

    componentDidMount=()=>{
        localStorage.clear();
    }
    
    render() {


        setTimeout(()=>{
           this.setState({
               loginRedirect:true
           })
        },2000);

        return(<Fragment>
            <LoadingBar className="mt-4" style={{margin:"0 auto"}}></LoadingBar>
            {
              this.state.loginRedirect?<Redirect to="/login"></Redirect>:""
            }
        </Fragment>)
    }
}
