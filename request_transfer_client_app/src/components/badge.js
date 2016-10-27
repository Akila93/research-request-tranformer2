import React, { Component } from 'react';

export class Badge extends Component {
    constructor(props) {
        super(props);
        if(props.handleClick){
            this.handleClick=props.handleClick;
        }

    }

    handleClick() {
        alert("button clicked");
    }

    render() {
        return (
            <button style={this.props.style} data-id={this.props.dataId} data-toggle={this.props.dataToggle} data-target={this.props.dataTarget} ref = {this.props.ref} type="button" className={"btn "+this.props.className} onClick={this.handleClick.bind(this)}>
                {this.props.title}
                <span className={this.props.iconClassName}></span>
            </button>
        );
    }

}
