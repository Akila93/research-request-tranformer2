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
            <button ref = {this.props.ref} type="button" className={"btn "+this.props.className} onClick={this.handleClick.bind(this)}>
                {this.props.title}
                <span className={this.props.iconClassName}></span>
            </button>
        );
    }

}