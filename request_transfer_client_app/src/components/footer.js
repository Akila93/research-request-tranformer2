import React, {Component} from "react";

export class Footer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <footer className="footstyle pull-down">
                <div className="leftmag"><font color="yellow">
                    kjgsdzkljghkdrg,<br/>
                    kjdfghdjg road,<br/>
                    somewhere.</font>
                </div>
                <div className="row  pull-right rightmag links">
                    <a>Request</a> /<a>About</a> /<a>Profile</a>
                </div>
            </footer>
        );
    }
}