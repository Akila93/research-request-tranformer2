/**
 * Created by nuwantha on 9/7/16.
 */
import React from "react";
import { Dropdown } from './dropdown';
import { Badge } from './badge';
import * as TableAction from '../action/TableActions';

export class TableRaw extends React.Component {
    constructor(props){
        super(props);
        this.state={
            selected:false,
            indexSelected: 0,
            formatters: props.raw.formatters,
            firstRender:true,
            visibility:this.props.raw.rawVisibility
        };
        this.setState({
            selected:false,
            indexSelected: 0,
            formatters: props.raw.formatters,
            firstRender:true
        });
        this.handleCollapse=this.handleCollapse.bind(this);
    }
    handleSelect(){
        this.setState({
            selected:!this.state.selected
        });
    }
    loadFormattersOnSelect(indexSelected,title){

        this.setState({
            indexSelected:indexSelected
        });

    }
    onSelect(indexSelected){}
    handleRemoveRow() {
        console.log("handle remove raw in table raw");
        TableAction.deleteTableData(this.props.raw.keyValue,this.props.raw.keyValue);
    }

    handleCollapse(){

        console.log("handle collapse is clicked");
        TableAction.updateTableData(this.props.raw.keyValue);
       /* this.setState({
            visibility:'hidden'
        });*/
    }



    render() {
        var firstRaw;

        if (this.props.raw.visible) {
            console.log("Nested or not"+this.props.raw.visible);
            firstRaw = <td><Badge handleClick={this.handleCollapse}  iconClassName={"glyphicon glyphicon-plus"} className={"btn btn-info"}/></td>;

        } else {
            firstRaw =<td> </td>
        }

        var divStyle = {
            //backgroundColor: 'yellow',
            // visibility : this.props.raw.rawVisibility

            display : this.props.raw.rawVisibility
        };

        return (

            <tr colSpan="3" ref={this.props.raw.keyValue} className={this.state.selected?"active":""} key={this.props.raw.keyValue  }     style={divStyle }  /*onClick={this.handleSelect.bind(this)}              */>

                {firstRaw}
                <td >{this.props.raw.keyValue}</td>
                <td ><Dropdown onItemSelect={this.onSelect.bind(this)} ref="keyformatter" items={this.props.raw.KeyFormatter} title="select"/></td>
                <td ><Dropdown onItemSelect={this.loadFormattersOnSelect.bind(this)} ref="type" items={this.props.raw.ValueType} title="select"/></td>
                <td ><Dropdown onItemSelect={this.onSelect.bind(this)} ref="formatter" items={this.props.raw.ValueFormatters[this.state.indexSelected]} title="select"/></td>
                <td ><Badge  handleClick={this.handleRemoveRow.bind(this)} iconClassName={"glyphicon glyphicon-remove-sign"} className={"btn-danger right item-style"} title={"" }/></td>

            </tr>
        );
    }
}
