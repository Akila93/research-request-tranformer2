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
            <div style={divStyle}>
                <div className="container-fluid">

                    <center className="header">
                        <h2>Research Request Transformer</h2>
                    </center>
                    <div className="hed2" id="grad4"></div>
                    <div className="hed1" id="grad2"></div>

                </div>
            </div>
        );
    }
}