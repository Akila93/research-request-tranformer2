import React, { Component } from 'react';

export class CheckBox extends Component{
    constructor(props) {
        super(props);
        if(props.handleClick){
            this.handleClick=props.handleClick;
        }

    }

    handleClick(){
        console.log("done");
    }

    render(){
        return <span className="badge">
                    <input onClick={this.handleClick.bind(this)} type="checkbox" />
                </span>
    }


}