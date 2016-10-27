import React, { Component } from 'react';

export class Listitem extends Component{
    constructor(props){
        super(props);
    }


    render(){
        return (
            <li onClick={this.handleClick.bind(this)} className={this.props.className}><a href={this.props.link}>{this.props.item}</a></li>
        );
    }
    handleClick(){
        this.props.whenClicked(this.props.item);
        //alert(this.state.title);


    }

}