/**
 * Created by nuwantha on 9/7/16.
 */
import React from "react";
import { Dropdown } from './dropdown';

export class TableRaw extends React.Component {
    constructor(props){
        super(props);
        this.state={
            selected:false,
            indexSelected: 0,
            formatters: props.raw.formatters
        };
        this.setState({
            selected:false,
            indexSelected: 0,
            formatters: props.raw.formatters
        });
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


    render() {
        var listOfFormatters=this.props.raw.formatters.map(function(formatter){
            return formatter;
        });

        var list =this.props.raw.formatters[this.state.indexSelected];
        //console.log(this.state.title);
        //console.log(list+":"+this.state.indexSelected);
        return (
            <tr ref={this.props.ref}className={this.state.selected?"active":""} key={this.props.key} onClick={this.handleSelect.bind(this)}>
                <td >{this.props.raw.keyValue}</td>
		
			 <td><Dropdown onItemSelect={this.onSelect.bind(this)} ref="keyformatter" items={this.props.raw.formatters[this.state.indexSelected]} title="select"/></td>

                <td><Dropdown onItemSelect={this.loadFormattersOnSelect.bind(this)} ref="type" items={this.props.raw.types} title="select"/></td>
                <td><Dropdown onItemSelect={this.onSelect.bind(this)} ref="formatter" items={this.props.raw.formatters[this.state.indexSelected]} title="select"/></td>
		
	

                <td >preview</td>
            </tr>
        );
    }
}
