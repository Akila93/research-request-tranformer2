/**
 * Created by nuwantha on 9/7/16.
 */
import React, {Component} from "react";

export class TextArea extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {

        return (

            <textarea data-toggle="tooltip" data-placement="bottom" title={this.props.toolTip}
                      className={this.props.ClassName} value={this.props.value} rows={this.props.rows}
                      onChange={this.props.handleChange}>  </textarea>
        );
    }
}


