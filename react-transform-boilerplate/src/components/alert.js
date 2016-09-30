/**
 * Created by nuwantha on 9/7/16.
 */
import React from "react";

export class Alert extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div className={"alert alert-info fade "+this.props.fade}>
            <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
        <strong>Info!</strong> Your App Id is {this.props.msg}
        </div>);
    }
}
