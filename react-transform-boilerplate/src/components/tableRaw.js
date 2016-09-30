/**
 * Created by nuwantha on 9/7/16.
 */
import React from "react";
import { Dropdown } from './dropdown';
import { Badge } from './badge';
import { CheckBox } from './checkBox';
import * as TableAction from '../action/TableActions';

export class TableRaw extends React.Component {
    constructor(props){
        super(props);
        this.state={
            selected:false,
            indexSelected: -1,
            formatters: props.raw.formatters,
            visibility:this.props.raw.rawVisibility,
            triggerNoInitial:false,
            checked:false,
            keyValue:this.props.raw.keyValue,
            icon:"icon-minus"
        };
        this.setState({
            selected:false,
            indexSelected: -1,
            formatters: props.raw.formatters,
            triggerNoInitial:true,
            checked:false,
            keyValue:this.props.raw.keyValue
        });
        this.handleCollapse=this.handleCollapse.bind(this);
        this.updateStateValue=this.updateStateValue.bind(this);
    }


    loadFormattersOnSelect(indexSelected,title){

        this.setState({
            indexSelected:indexSelected,
            triggerNoInitial:false,
            typeTriggered: true
        });
    }



    onSelect(indexSelected,title){

        let condition = this.refs.formatter ? this.refs.formatter.state.title!="select":(this.refs.inputFormatter.state.title!="select" && this.refs.outputFormatter.state.title!="select");

        //console.log("condition is"+condition);
        if(this.refs.keyformatter.state.title!="select" && condition) {
            //console.log(this.refs.type.state.title);
            this.props.raw.onPreview(title,this.refs.type.state.title);
        }
    }


    handleRemoveRow() {
        TableAction.deleteTableData(this.props.raw.keyValue,this.props.raw.keyValue);


        //this.props.raw.onPreview();


    }

    handleCollapse(){
        TableAction.updateTableData(this.props.raw.keyValue);
    }

    updateStateValue(key,obj){
        let newObj={};
        for(const objKey in obj){
            console.log("key is",key);
            console.log("obj is",obj);
            if(objKey!=key){
                if(typeof obj[objKey] === 'string') {//need to change
                    newObj[objKey]=obj[objKey];
                }else{
                    newObj[objKey]=this.updateStateValue(key,obj[objKey]);
                }
            }else{
                newObj[this.state.keyValue] = obj[objKey];
            }
        }

        return newObj;
    }

    handleCheck(){
        this.setState({
            checked:!this.state.checked
        },function(){

            //update the store
            //update the value from text
            let obj = JSON.parse(this.props.app.state.inputTextAreaValue);
            //let newObj={};
            //for(const v in obj){
            //    if(v!=this.props.raw.keyValue){
            //        newObj[v]=obj[v];
            //    }else{
            //        newObj[this.state.keyValue]=obj[v];
            //    }
            //}
            let newObj=this.updateStateValue(this.props.raw.keyValue,obj);
            //console.log("app state: ",obj,newObj);
            this.props.app.setState({
                inputTextAreaValue:JSON.stringify(newObj)
            },function(){
                TableAction.updateTableDataOnEdit(this.props.raw.keyValue,this.state.keyValue);
            }.bind(this));


        }.bind(this));
    }

    handleTyping(){
        this.setState({
            keyValue:this.refs.editKey.value
        });
    }

    renderCheckBox(){
        return <td><CheckBox checked={this.state.checked} handleClick={this.handleCheck.bind(this)}/></td>
    }

    renderRowLabels(){
        if(this.state.checked){
            return <td><input onChange={this.handleTyping.bind(this)} value={this.state.keyValue} ref="editKey" type="text" className="form-control" placeholder={this.props.raw.keyValue} /></td>
        }
        return <td >{this.state.keyValue}</td>
    }

    render() {
        console.log("icon is ",this.props.raw.icon);
        let firstColume;
        if (this.props.raw.visible) {
            console.log("Nested or not"+this.props.raw.visible);
            firstColume = <td><Badge handleClick={this.handleCollapse}  iconClassName={"glyphicon glyph"+this.props.raw.icon} className={"btn btn-info"}/></td>;

        } else {
            firstColume=<td> </td>
        }

        let divStyle = {

            display : this.props.raw.rawVisibility

        };

        if(this.state.typeTriggered){
            if(this.refs.inputFormatter && this.refs.outputFormatter){
                console.log(this.refs.inputFormatter);
                console.log(this.refs.outputFormatter);
            }else {
                let drop = this.refs.formatter;
                let self = this;
                drop.setState({title: "select"}, function () {
                    this.setState({typeTriggered: false});
                }.bind(self));

            }
        }
        let formatTypeColum;
        if(this.state.indexSelected===2){
            formatTypeColum= <td >
                Input Formatter :
                <Dropdown noInitial={this.state.triggerNoInitial} onItemSelect={this.onSelect.bind(this)} ref="inputFormatter" items={this.state.indexSelected>=0?this.props.raw.ValueFormatters[this.state.indexSelected]:[]} title="select"/>
                Output Formatter :
                <Dropdown noInitial={this.state.triggerNoInitial} onItemSelect={this.onSelect.bind(this)} ref="outputFormatter" items={this.state.indexSelected>=0?this.props.raw.ValueFormatters[this.state.indexSelected]:[]} title="select"/>
            </td>;

        }else{
            formatTypeColum=<td><Dropdown noInitial={this.state.triggerNoInitial} onItemSelect={this.onSelect.bind(this)} ref="formatter" items={this.state.indexSelected>=0?this.props.raw.ValueFormatters[this.state.indexSelected]:[]} title="select"/></td>;
        }

        return (

            <tr colSpan="3" ref={this.props.raw.keyValue} className={this.state.selected?"active":""} key={this.props.raw.keyValue  }     style={divStyle }  /*onClick={this.handleSelect.bind(this)}*/>
                {this.renderCheckBox()}
                {firstColume}
                {this.renderRowLabels()}
                <td ><Dropdown onItemSelect={this.onSelect.bind(this)} ref="keyformatter" items={this.props.raw.KeyFormatter} title="select"/></td>
                <td ><Dropdown onItemSelect={this.loadFormattersOnSelect.bind(this)} ref="type" items={this.props.raw.ValueType} title="select"/></td>
                {formatTypeColum}
                <td ><Badge  handleClick={this.handleRemoveRow.bind(this)} iconClassName={"glyphicon glyphicon-remove-sign"} className={"btn-danger right item-style"} title={"" }/></td>

            </tr>
        );
    }
}
