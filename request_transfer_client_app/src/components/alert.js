/**
 * Created by nuwantha on 9/7/16.
 */
import React from "react";

export class Alert extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let styleForAlert = {backgroundColor: 'black', color: 'white'}
        return (<div style={styleForAlert} className={"alert fade " + this.props.fade}>
            <a style={styleForAlert} href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
            <strong style={{color: ''}}>Info!</strong> Your App Id is
            <ins style={{color: ''}}>{this.props.msg} </ins>
        </div>);
    }
}
