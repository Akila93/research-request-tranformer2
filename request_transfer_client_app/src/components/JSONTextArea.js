/**
 * Created by nuwantha on 9/7/16.
 */
import JSONPretty from "react-json-pretty";
import React, {Component} from "react";
//require('react-json-pretty/JSONPretty.monikai.styl');

export class JSONTextArea extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {

        return (
            <JSONPretty style={{background: 'transparent'}} dataToggle="tooltip" dataPlacement="bottom"
                        title={this.props.toolTip} id="json-pretty" json={this.props.value}></JSONPretty>

        );
    }
}


