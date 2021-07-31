import React, { Component } from 'react'
import "./css/alert.css"
export default class Alert extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            display:"block"
        }
    }

    componentDidMount=()=>{
        setTimeout(()=>{
         this.setState({display:"none"})
        },3000);
    }
    
    render() {
        return (
          <div
            className={`alert alert-${this.props.type} alert-dismissible custom-alert`}
            role="alert"
            style={{display:this.state.display}}
          >
            <strong>{this.props.symbol}</strong> {this.props.text}
          </div>
        );
    }
}
