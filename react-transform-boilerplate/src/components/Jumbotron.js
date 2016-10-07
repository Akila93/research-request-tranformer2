/**
 * Created by nuwantha on 10/6/16.
 */
import React, { Component } from 'react';

export class Jumbotron extends Component{

    render() {
        console.log(this.props.visible);
        if(this.props.visible) {
            let divStyle={
                backgroundColor:"black"
            }
            return (
                <div class="container" style={divStyle}>
                    <div class="jumbotron">
                        <h1 style={{color:'white'}}>User Guide For Request Sending</h1>
                        <h3 style={{color:'white'}}> <strong>URL :</strong> http://localhost:8080/request</h3>
                        <h3 style={{color:'white'}}> <strong>Header Parameter : </strong> [
                            appId:{this.props.appId}
                        ]
                        </h3>
                        <h3 style={{color:'white'}}>
                            <strong>Post Request Body :</strong> {JSON.stringify(JSON.parse(this.props.request),null,6)}
                        </h3>
                    </div>
                </div>

            );
        }else{
            return (<div></div>);
        }
    }

}