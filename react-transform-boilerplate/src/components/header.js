import React, { Component } from 'react';
import {Listitem} from "./listItem";

export class Header extends Component{
    constructor(props){
        super(props);
    }
    render() {

        let divStyle = {

            backgroundColor :"black",
            color:"white"

        };
        return (
            <nav className="navbar navbar-default" style={divStyle}>
                <div className="container-fluid">

                    <center>
                        <h2>Research Request Transformer</h2>
                    </center>

                </div>
            </nav>
        );
    }
}