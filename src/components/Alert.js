import React, { Component } from 'react'
import "./css/alert.css"
export default class Alert extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             showStatus:true
        }
    }


    changeStatus=()=>{
        this.setState({
            showStatus:false
        })
    }
    
    render() {
        return (
        <div className={`alert alert-${this.props.type} alert-dismissible fade ${this.state.showStatus?"show":"hide-alert"}` } role="alert">
          <strong>{this.props.symbol}</strong> {this.props.text}
          <button type="button" className="btn-close" aria-label="Close" onClick={this.changeStatus}></button>
        </div>
        )
    }
}
