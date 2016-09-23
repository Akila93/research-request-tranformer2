/**
 * Created by nuwantha on 9/7/16.
 */
import React from "react";

export class TextArea extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {

        return (
            <textarea className={this.props.ClassName} value ={this.props.value}  rows={this.props.rows} onChange={this.props.handleChange}  >  </textarea>
        );
    }
}


