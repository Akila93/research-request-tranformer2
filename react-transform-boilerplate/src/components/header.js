import React, { Component } from 'react';
import {Listitem} from "./listItem";

export class Header extends Component{
    constructor(props){
        super(props);
    }
    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">
                            <img alt="Brand" src="/images/1.png" height="30px"/>
                        </a>

                    </div>
                    <div className="row">
                        <ul className="nav nav-pills navbar-right rightmag topmag">
                            <Listitem  className="active" item={"Request"} link={"#"}></Listitem>
                            <Listitem className=""item={"About"} link={"#"}></Listitem>
                            <Listitem className="" item={"Profile"} link={"#"}></Listitem>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}