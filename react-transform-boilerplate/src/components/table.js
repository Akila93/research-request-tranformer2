/**
 * Created by nuwantha on 9/7/16.
 */
import React from "react";
import {TableRaw} from "./tableRaw"

export class Table extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        let stylesForTh={backgroundColor:'black',color:'white'};
        let app=this.props.app;
        return (
            <table className="table" ref={this.props.tableData}>
                <thead>
                <tr>
                    <th style={stylesForTh}></th>
                    <th style={stylesForTh}>Key/Value</th>
                    <th style={stylesForTh}>KeyFormatter</th>
                    <th style={stylesForTh}>ValueType</th>
                    <th style={stylesForTh}>ValueFormatter</th>
                    <th style={stylesForTh}>Skip</th>
                </tr>
                </thead>

                <tbody>
                    {this.props.raws.map(function(raw){
                        //console.log("the ref Value is : ",raw.keyValue);
                        return <TableRaw app={app} key={raw.keyValue} ref={raw.keyValue} raw={raw}/>
                    }.bind(app))}
                </tbody>
            </table>
        );
    }
}

