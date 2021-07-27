import React, { Component,Fragment } from 'react'
import "./css/loading.css"

export default class LoadingBar extends Component {
    render() {
        return (
            <Fragment>
                <div className="lds-dual-ring"></div>
            </Fragment>
        )
    }
}
