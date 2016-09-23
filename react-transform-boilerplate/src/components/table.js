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
        return (
            <table className="table" ref={this.props.tableData}>
                <thead>
                <tr>
                    <th></th>
                    <th>Key/Value</th>
                    <th>KeyFormatter</th>
                    <th>ValueType</th>
                    <th>ValueFormatter</th>
                    <th>Close</th>
                </tr>
                </thead>


                <tbody>
                    {this.props.raws.map(function(raw,i){
                        return <TableRaw key={i} ref={raw.keyValue} raw={raw}/>
                    })}
                </tbody>
            </table>
        );
    }
}

