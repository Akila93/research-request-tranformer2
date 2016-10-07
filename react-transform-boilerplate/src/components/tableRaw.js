/**
 * Created by nuwantha on 9/7/16.
 */
import React from "react";
import { Dropdown } from './dropdown';
import { CheckBox } from './checkBox';
import { RowCell } from './RowCell';
import * as TableAction from '../action/TableActions';
//import * as EventHandlers from './util/eventHandlers';
//import * as Callbacks from './util/callbackFunctions';

export class TableRaw extends React.Component {
    constructor(props){
        super(props);
        let self = this;
        let i = this.initialIndexOfSelected(self);
        console.log("index: ",i,this.props.raw.ValueFormatters[i]);

        this.state={
            selected:false,
            indexSelected: -1,
            formatters: props.raw.formatters,
            visibility:this.props.raw.rawVisibility,
            triggerNoInitial:false,
            editClicked:false,
            keyValue:this.props.raw.keyValue,
            icon:"icon-minus",
            removeVisible:false,
            typeTriggered:false,
            overTheSkip:false,
            overTheExpan:false,
            overEdit:false,
            removeChecked:false,
            overTheEdit:false,
            selectedKeyFormatter:"",
            selectedValueFormatter:"",
            selectedDateInputFormatter:"",
            selectedDateOutputFormatter:"",
            dropdownTitle:this.props.raw.dropdownTitle,
        };
        this.setState({
            selected:false,
            indexSelected: -1,
            formatters: props.raw.formatters,
            triggerNoInitial:true,
            editClicked:false,
            keyValue:this.props.raw.keyValue,
            removeVisible:false,
            typeTriggered:false,
            overTheSkip:false,
            overTheExpan:false,
            overEdit:false,
            removeChecked:false,
            overTheEdit:false,
            editVisible:false
        });
        this.handleCollapse=this.handleCollapse.bind(this);
        this.updateStateValue=this.updateStateValue.bind(this);
        this.renderDropDownList=this.renderDropDownList(this);
    }
    initialIndexOfSelected(self){
        let types = self.props.raw.ValueType;
        for(let x=0;x< types.length;x++){

                    if(types[x]==self.props.raw.dropdownTitle){//
                        return x;
                    }
                }

    }



    loadFormattersOnSelect(indexSelected,title){
          this.setState({indexSelected:indexSelected,triggerNoInitial:false,typeTriggered: true,dropdownTitle:""});
    }
    handleMouseOverEdit(self,status){
        console.log("over the edit: ",this.state.overTheEdit,status,this.state);
        //self.setState({overTheEdit:status},function(){
        //    console.log("over the edit: ",this.state.overTheEdit);
        //}.bind(self));
    }




    onSelect(indexSelected,title){



        ///change the condition after chane the server
            //console.log("callbackCaller: ");
            this.setState({
                editVisible:false
            },function(){
                console.log("our edit is: ",this.state.editVisible);
                this.props.raw.onPreview(title,this.refs.seconedCell.refs.type.state.title);}.bind(this));

    }


    handleRemoveRow() {
        TableAction.deleteTableData(this.props.raw.keyValue,this.props.raw.keyValue,this.props.raw.onPreview);


        //this.props.raw.onPreview();


    }

    handleChecked(){
        this.setState({
            removeChecked:!this.state.removeChecked
        },function(){
            //do the remove
            console.log("I am inside remove checked: ",this.state.removeChecked);
            this.props.raw.onPreview();
        }.bind(this));
    }

    handleCollapse(){
        TableAction.updateTableData(this.props.raw.keyValue);
    }

    updateStateValue(key,obj){
       
        let newObj={};
        for(const v in obj){
            if(v!=key){
                //let title=this.props.app.refs.tableData.refs[v].refs.type.state.title;
                if(typeof obj[v] ==="string") {//need to change
                    newObj[v]=obj[v];
                }else{
                    newObj[v]=this.updateStateValue(key,obj[v]);
                }
            }else{

                newObj[this.state.keyValue] = obj[v];

            }
        }

        return newObj;
    }
    onCustomTypeSelect(){
        this.setState({editVisible:true},function(){
            this.handleEditClick();
        }.bind(this));

    }

    handleEditClick(){
        this.setState({
            editClicked:!this.state.editClicked
        },function(){

            //update the store
            //update the value from text
            let obj = this.props.app.state.inputTextObject;//JSON.parse(this.props.app.state.value);

            let newObj=this.updateStateValue(this.props.raw.keyValue,obj);
            let self=this;
            TableAction.updateTableDataOnEdit(this.props.raw.keyValue,this.state.keyValue,this.state.selectedKeyFormatter,this.state.selectedValueFormatter,this.state.selectedDateInputFormatter,this.state.selectedDateOutputFormatter);


            //this.props.raw.onPreview();


            //this.props.app.setState({
            //    //inputTextAreaValue:JSON.stringify(newObj),
            //    //inputTextObject:newObj,
            //},function(){
            //    //TableAction.updateTableDataOnEdit(this.props.raw.keyValue,this.state.keyValue);
            //}.bind(this));


        }.bind(this));
    }

    handleTyping(){
        //console.log(this.refs.thiredCell.refs.inputFormatter.state.title);
        this.setState({
            keyValue : this.refs.editKey.value,
            selectedKeyFormatter:this.refs.firstCell.refs.keyformatter.state.title,
            selectedValueFormatter:this.refs.thiredCell.refs.formatter?this.refs.thiredCell.refs.formatter.state.title:"",
            selectedDateInputFormatter:this.refs.thiredCell.refs.inputFormatter?this.refs.thiredCell.refs.inputFormatter.state.title:"",
            selectedDateOutputFormatter:this.refs.thiredCell.refs.outputFormatter?this.refs.thiredCell.refs.outputFormatter.state.title:"",
        });
    }

    renderCheckBox(self){
        //overTheSkip
        let styleForSpan={backgroundColor:'black',color:'white'};
        let classN="";
        if(this.state.overTheSkip){
            return <td  width="10%"><span style={styleForSpan} data-toggle="tooltip" data-placement="bottom" title="select checkbox for remove them from output" className="badge"  onMouseOut={self.handleRemoveMouse.bind(self,false)}><CheckBox onMouseOver={self.handleRemoveMouse.bind(self,true)} handleClick={this.handleChecked.bind(this)}/></span></td>
        }
        return <td width="10%"><span  data-toggle="tooltip" data-placement="bottom" title="select checkbox for remove them from output"  onMouseOut={self.handleRemoveMouse.bind(self,false)}><CheckBox onMouseOver={self.handleRemoveMouse.bind(self,true)} handleClick={this.handleChecked.bind(this)}/></span></td>
    }

    renderEdit(){
        if(this.state.editVisible){
            return <span className="glyphicon glyphicon-edit" onClick={this.handleEditClick.bind(this)}/>
        }return <span/>
    }

    renderRowLabels(self){
        let styleForSpan={backgroundColor:'black',color:'white'};
        if(this.state.editClicked){

            return <td>
                <div className="input-group table-row-cell" >
                    <input onChange={this.handleTyping.bind(this)} value={this.state.keyValue} ref="editKey" type="text" className="form-control" placeholder={this.props.raw.keyValue} />
                    <span style={styleForSpan} className="input-group-addon" onClick={this.handleEditClick.bind(this)}><span className="glyphicon glyphicon-floppy-saved"/>
                    </span>
                </div>
            </td>
        }
        return <td >
            <div className="input-group table-row-cell" >
                <div>{this.state.keyValue}</div>
                {this.renderEdit()}
            </div>
        </td>
    }



    handleRemoveMouse(status){
        //console.log("I'm ",this.state.overTheSkip?"in":"out");
        this.setState({overTheSkip:status});
    }


    handleExpanMouse(status){
        this.setState({overTheExpan:status});
    }


    renderRemove(self){
        if(this.state.removeVisible){
            let classN = "";
            if(this.state.overTheSkip){
                classN = " red";
            }else{
                classN = " gray";
            }
            //console.log(this.state.overTheSkip?" red":" gray");
            return <td width="10%"><span onMouseOver={self.handleRemoveMouse.bind(self,true)} onMouseOut={self.handleRemoveMouse.bind(self,false)} className={"glyphicon glyphicon-remove-sign mysize"+classN} onClick={this.handleRemoveRow.bind(this)}/></td>
        }
        return <td width="10%"></td>
    }

    removeBtnVisible(status){

        this.setState({removeVisible:status});
    }


    renderDropDownList(){
        let formatTypeColum;
        if(this.state.indexSelected===2){
            let items=this.state.indexSelected>=0?this.props.raw.ValueFormatters[this.state.indexSelected]:[];
            let options=[
                {
                    noInitial:this.state.triggerNoInitial,
                    onItemSelect:this.onSelect.bind(this),
                    ref:"inputFormatter",
                    items:inputFormatterItems,
                    lable:"Input Formatter :"
                },
                {
                    noInitial:this.state.triggerNoInitial,
                    onItemSelect:this.onSelect.bind(this),
                    ref:"outputFormatter",
                    items:inputFormatterItems,
                    lable:"Output Formatter :"
                }
            ];
            formatTypeColum= <RowCell options={options}/>

        }else{
            formatTypeColum=<td><Dropdown noInitial={this.state.triggerNoInitial} onItemSelect={this.onSelect.bind(this)} ref="formatter" items={this.state.indexSelected>=0?this.props.raw.ValueFormatters[this.state.indexSelected]:[]} title="select"/></td>;
        }
        return formatTypeColum;
    }

    renderExpantionCol(self){
        let styleForSpan={backgroundColor:'black',color:'white'};
        let classN = "";
        if(this.state.overTheExpan){
            classN = " blue";
        }else{
            classN = " gray";
        }
        //console.log("state.overTheExpan: ",this.state.overTheExpan);
        let firstColume;
        if (this.props.raw.visible) {
            if(this.state.overTheExpan){
                firstColume = <td width="10%"><span style={styleForSpan} data-toggle="tooltip" data-placement="bottom" title="expan" className="badge" onMouseOut={self.handleExpanMouse.bind(self,false)}><span /*onMouseOver={self.handleExpanMouse.bind(self,true)}*/  className={"glyphicon glyph"+this.props.raw.icon+classN} onClick={this.handleCollapse.bind(this)}/></span></td>;


            }else{
                firstColume = <td width="10%"><span><span onMouseOver={self.handleExpanMouse.bind(self,true)} /*onMouseOut={self.handleExpanMouse.bind(self,false)}*/ className={"glyphicon glyph"+this.props.raw.icon+classN} onClick={this.handleCollapse.bind(this)}/></span></td>;


            }
            //firstColume = <td width="10%"><span><span onMouseOver={self.handleExpanMouse.bind(self,true)} onMouseOut={self.handleExpanMouse.bind(self,false)} className={"glyphicon glyph"+this.props.raw.icon+classN} onClick={this.handleCollapse.bind(this)}/></span></td>;

        } else {
            firstColume=<td width="10%"> </td>
        }
        return firstColume;
    }

    renderThiredCell(self,items){
        let optionsForDateType=
            [
                {
                    noInitial:self.state.triggerNoInitial,
                    onItemSelect:self.onSelect.bind(self),
                    ref:"inputFormatter",
                    items:items,
                    lable:"Input Formatter :",
                    title:self.props.raw.selectedDateInputFormatter,
                },
                {
                    noInitial:self.state.triggerNoInitial,
                    onItemSelect:self.onSelect.bind(self),
                    ref:"outputFormatter",
                    items:items,
                    lable:"Output Formatter :",
                    title:self.props.raw.selectedDateOutputFormatter,
                }
            ];
        let optionsForOtherTypes=
            [
                {
                    noInitial:self.state.triggerNoInitial,
                    onItemSelect:self.onSelect.bind(self),
                    ref:"formatter",
                    items:items,
                    lable:"",
                    title:self.props.raw.selectedValueFormatter,
                }
            ];
        let formatTypeColum;
        //self.props.raw.dropdownTitle
        if(this.state.indexSelected===2 || this.state.dropdownTitle=="Date"){
            formatTypeColum= <RowCell onCustomTypeSelect={this.onCustomTypeSelect.bind(this)} ref="thiredCell" mouseEventToElement={true} onItemSelect={self.onSelect.bind(self)} options={optionsForDateType}/>
        }else{
            formatTypeColum=<RowCell onCustomTypeSelect={this.onCustomTypeSelect.bind(this)} ref="thiredCell" mouseEventToElement={false} onItemSelect={self.onSelect.bind(self)} options={optionsForOtherTypes}/>;
        }
        return formatTypeColum;
    }


    renderCellOneTwo(self,ops,reffer,onSelect){
        return <RowCell onCustomTypeSelect={this.onCustomTypeSelect.bind(this)} ref={reffer} mouseEventToElement={false} onItemSelect={onSelect.bind(self)} options={ops}/>;
    }


    render() {
        let self = this;

        let divStyle = {

            display : this.props.raw.rawVisibility

        };

        if(this.state.typeTriggered){
            //console.log("refs in the row:",this.refs,this.state.typeTriggered);
//            if(this.refs.inputFormatter && this.refs.outputFormatter){
//                console.log(this.refs.inputFormatter);
//                console.log(this.refs.outputFormatter);
//            }else {
//                let drop = this.refs.formatter;
//                let self = this;
//                drop.setState({title: "select"}, function () {
//                    this.setState({typeTriggered: false});
//                }.bind(self));
//
//            }
        }

        //let items=this.state.indexSelected>=0?this.props.raw.ValueFormatters[this.state.indexSelected]:[];
        let items=this.state.indexSelected>=0?this.props.raw.ValueFormatters[this.state.indexSelected]:this.props.raw.ValueFormatters[self.initialIndexOfSelected(self)];
        //

        let opsForRowCell1=[
            {
                noInitial:undefined,
                ref:"keyformatter",
                items:self.props.raw.KeyFormatter,
                lable:"",
                title:self.props.raw.selectedKeyFormatter
            }];


        let opsForRowCell2=[{
            noInitial:undefined,
            ref:"type",
            items:self.props.raw.ValueType,
            lable:"",
            title:self.props.raw.dropdownTitle,
        }
        ];


       return (
            <tr onMouseLeave={this.removeBtnVisible.bind(this,false)} onMouseEnter={this.removeBtnVisible.bind(this,true)} colSpan="3" ref={this.props.raw.keyValue} className={this.state.selected?"active":""} key={this.props.raw.keyValue  }     style={divStyle }  /*onClick={this.handleSelect.bind(this)}*/>

                {this.renderExpantionCol(self)}
                {this.renderRowLabels(self)}
                {this.renderCellOneTwo(self,opsForRowCell1,"firstCell",this.onSelect)}
                {this.renderCellOneTwo(self,opsForRowCell2,"seconedCell",this.loadFormattersOnSelect)}
                {this.renderThiredCell(self,items)}
                {this.renderCheckBox(self)}
            </tr>
        );
    }
}
