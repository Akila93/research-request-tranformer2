/**
 * Created by nuwantha on 10/6/16.
 */
import React, {Component} from "react";

export class Jumbotron extends Component {
    constructor(props) {
        super(props);
        this.state = {enter: false};
        this.setState({enter: false});

    }

    handleMouseOver() {
        this.setState({enter: !this.state.enter});
    }

    render() {
        console.log(this.props.visible);
        if (this.props.visible) {
            let divStyle = {
                backgroundColor: "black",
                color: 'white',
                width: '100%',
                height: '60%'
            }
            let divStyleOnOver = {
                backgroundColor: "white",
                color: 'black',
                width: '100%',
                height: '60%'
            }
            let jStyle = {
                marginTop: '10px',
                backgroundColor: "white",
                color: 'black'
            }
            let jStyleOnOver = {
                marginTop: '10px',
                backgroundColor: "black",
                color: 'white'
            }
            if (false) {//this.state.enter){
                return (
                    <div className="container" style={divStyleOnOver} onMouseOver={this.handleMouseOver.bind(this)}
                         onMouseOut={this.handleMouseOver.bind(this)}>
                        <div className="jumbotron" style={jStyleOnOver}>
                            <h1 >User Guide For Request Sending</h1>
                            <h3 ><strong>URL :</strong> http://localhost:8080/request</h3>
                            <h3 ><strong>Header Parameter : </strong> [
                                appId:{this.props.appId}
                                ]
                            </h3>
                            <h3 >
                                <strong>Post Request Body
                                    :</strong> {JSON.stringify(JSON.parse(this.props.request), null, 6)}
                            </h3>
                        </div>
                    </div>

                );
            } else {
                return (
                    <div className="container" style={divStyle} onMouseOver={this.handleMouseOver.bind(this)}
                         onMouseOut={this.handleMouseOver.bind(this)}>
                        <div className="jumbotron" style={jStyle}>
                            <div><h1 >User Guide For Request Sending</h1></div>

                            <div><h3 ><strong>URL :</strong> <a
                                style={{color: 'black'}}>http://localhost:8080/request</a></h3></div>

                            <div>
                                <h3 ><strong>Header Parameter : </strong><br/>
                                    appId:
                                    <div >{this.props.appId}</div>
                                </h3>
                            </div>
                            <div><strong><h3 >
                                Post Request Body
                                :</h3>
                                <code
                                    style={{color: 'black'}}>{JSON.stringify(JSON.parse(this.props.request), null, 6)}</code></strong>
                            </div>

                        </div>
                    </div>

                );
            }
        } else {
            return (<div></div>);
        }
    }

}