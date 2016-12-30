import React, {Component} from "react";

export class CheckBox extends Component {
    constructor(props) {
        super(props);


    }

    handleClick() {
        console.log("done");
        this.props.handleClick();
    }

    render() {
        return <input onMouseOver={this.props.onMouseOver} onClick={this.handleClick.bind(this)} type="checkbox"/>

    }


}