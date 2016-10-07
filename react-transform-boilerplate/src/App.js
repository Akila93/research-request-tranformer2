import React, { Component } from 'react';
import { Badge } from './components/badge';
import { Header } from './components/header';
import {Table} from './components/table';
import {TextArea} from './components/textArea';
import TableDataStore from './store/tableDataStore';
import Api from './util/api';
import * as TableAction from './action/TableActions';
import {Alert} from './components/alert';
import {Modal} from './components/modal';
import {Jumbotron} from './components/Jumbotron';



export class App extends Component {
  constructor(){
    super();
    this.state = {
      TableData: TableDataStore.getAll(),
      inputTextAreaValue:"",
      alertOfAppIdFade:"out",
      generatedAppId:"",
      inputTextObject:{},
      visible: {
        table: false,
        inputTextArea: true,
        outputTextArea: false,
        editTextAreaVisible:true
      },
      outputTextAreaValue:"",
      resultInput:""

    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePreview = this.handlePreview.bind(this);
    this.saveSpecification = this.saveSpecification.bind(this);
    this.handlePreviewCallback=this.handlePreviewCallback.bind(this);
    this.saveSpecificationCallback=this.saveSpecificationCallback.bind(this);
    this.formASpecification=this.formASpecification.bind(this);
  }



  componentWillMount(){

    TableDataStore.on("change",()=>{
      this.setState({
      TableData: TableDataStore.getAll()
    },function () {
        this.handlePreview();
    })

  }

  )

  }




  handlePreview(func){

    let specification = this.formASpecification();
    let request=this.formARequest();
    console.log("specification is",specification);
    //console.log("specification :",request);
    console.log("inside handle preview function")
    let previewBody={
      specification:specification,
      request:request,
    }
    console.log(previewBody);
    Api.handlePreviewRequest(previewBody,this.handlePreviewCallback.bind(this));
    if(func){
      this.setState(
          {
            visible: {
              table: true,
              inputTextArea: false,
              outputTextArea: true
            }
          },func
      );

    }else{
      this.setState(
          {
            visible: {
              table: true,
              inputTextArea: false,
              outputTextArea: true
            }
          }
      );}
  }


  saveSpecificationCallback(err,resp) {
    if (resp) {
      this.setState({
        alertOfAppIdFade: "in",
        generatedAppId: resp.body.appId,
        visible: {
          table: false,
          inputTextArea: false,
          outputTextArea: false
        }
      });

    }else{

    }
  }



  saveSpecification(){
    let specification = this.formASpecification();
    Api.addSpecification(specification,this.saveSpecificationCallback.bind(this));
    this.setState(
        {
          visible: {
            table: true,
            inputTextArea: false,
            outputTextArea: true
          }
        }
    );
  }


  modifyRequst(intialReqeust, keyListOfTable)
  {
    var self=this;
    var keyListOfInitialRequest=Object.keys(intialReqeust);
    keyListOfInitialRequest.forEach(function (key) {
      let bool=false;
      for (let i = 0; i <keyListOfTable.length; i++) {
        if (keyListOfTable[i] === key) {
          bool=true;
        }
      }
      if(!bool){
        delete intialReqeust[key];
      }else{
        if(!(typeof intialReqeust[key] === 'string')){
          console.log(intialReqeust[key]);
          intialReqeust[key]=self.modifyRequst(intialReqeust[key],keyListOfTable);
        }
      }
    },this);
    return intialReqeust;

  }



  formARequest(){
    let  request={
      requestBody:[]
    };

    let currentInputTextAreaValue =JSON.parse(this.state.inputTextAreaValue);

   // request.requestBody=currentInputTextAreaValue;

    let keyListOfTable =[];
    let tableData=TableDataStore.getAll();

    for (let i=0;i<tableData.length;i++){
      console.log("refs: ffdgfdgs ",this.refs.tableData.refs);
      if(this.refs.tableData.refs[tableData[i]["keyValue"]].state.removeChecked){
        continue;
      }else {
    for (let specificationItemListIndex in this.state.TableData) {
      console.log("item list is ",this.state.TableData[0]);
      if(this.state.TableData[specificationItemListIndex]["keyValue"]===this.refs.tableData.refs[tableData[i]["keyValue"]].state.keyValue){
        keyListOfTable.push(this.state.TableData[specificationItemListIndex]["initialKey"]);
        break;
      }
    }
    //     keyListOfTable.push(tableData[i]["keyValue"]);
      }
    }
    request.requestBody=this.modifyRequst(currentInputTextAreaValue,keyListOfTable);

     return request;
  }


  formASpecification(){
    var specification=
    {
      list: [],
      created :"845486"
    };

    let list=[];

    let tableRaws=this.refs["tableData"].refs;
    console.log("refs of rows: ",tableRaws);
    for (let x in tableRaws) {

      let specificationItemKey="";
      for (let specificationItemListIndex in this.state.TableData) {
        console.log("item list is ",this.state.TableData[0]);
        if(this.state.TableData[specificationItemListIndex]["keyValue"]===x){
            specificationItemKey=this.state.TableData[specificationItemListIndex]["initialKey"];
           break;
        }
      }

      let tableRaw=tableRaws[x];
      let keyFormatter=tableRaw.refs.firstCell.refs["keyformatter"].state.title;
      let type=tableRaw.refs.seconedCell.refs["type"].state.title;
      let valueFormatter;
      let valueInputFormat="";

      console.log(type);

      if(type==="Date"){
        console.log("inside conditionryyt")
        console.log("sdffdfa",tableRaw);
        valueFormatter=tableRaw.refs.thiredCell.refs["outputFormatter"].state.title;
        valueInputFormat=tableRaw.refs.thiredCell.refs["inputFormatter"].state.title
      }else{
        valueFormatter= tableRaw.refs.thiredCell.refs["formatter"].state.title;
      }
      if((keyFormatter=="select" && valueFormatter=="select")){
        continue;
      }
      let specificationItem={
        key: specificationItemKey,
        keyFormatter: (keyFormatter=="select")?"nothing":keyFormatter,
        valueFormatter:(valueFormatter=="select")?"nothing":valueFormatter,
        valueInputFormat:valueInputFormat,
        valueType: type,
        updatedKey:x,
      }
      list.push(specificationItem);
    }
    specification.list=list;
    return specification;
  }



  handlePreviewCallback(err,resp){
    if(resp){
      console.log("formatted output",resp.body.requestBody);
      this.setState({
        outputTextAreaValue: JSON.stringify(resp.body.requestBody,null,2)
      });
    }
  }


  addTableData(key,KeyFormatter,ValueType,ValueFormatters,handleRemoveRow,visible,parentRaw,rawVisibility,onPreview,icon,dropdownTitle,initialKey,selectedKeyFormatter,selectedValueFormatter,selectedDateInputFormatter,selectedDateOutputFormatter){

    console.log(selectedDateInputFormatter);
    TableAction.addTableData(key,KeyFormatter,ValueType,ValueFormatters,handleRemoveRow,visible,parentRaw,rawVisibility,onPreview,icon,dropdownTitle,initialKey,selectedKeyFormatter,selectedValueFormatter,selectedDateInputFormatter,selectedDateOutputFormatter);

  }



  submitDataCallback(err,resp){
    try{
      if(resp){
        const responseBody =resp.body;
        let ValueFormatters=[],ValueType=[];
        for(const key in responseBody){
          if(key!="Nested") {
            ValueType.push(key);
            ValueFormatters.push(responseBody[key]);
          }
        }
        let self = this;
        console.log(ValueFormatters+" "+ValueType);
        TableAction.deleteAll();
        ///empty the store before readding
        var addRawByRaw=function(request,self,responseBody,ValueType,ValueFormatters,parentRaw,rawVisibility){

          //console.log("in");
          console.log(parentRaw);
          for(const key in request) {
            let title="String";
            let value=request[key];
            var nummberReg = new RegExp("^[-]?[0-9]+[\.]?[0-9]+$");
            var dateReg=new RegExp("[-+]?\\d*\\.?\\d+");
            if(nummberReg.test(value)){
              title="Number";
            }else if(dateReg.test(value)){
              title="Date"
            }else if(typeof value !="string"){
              title="Nested"
            }
            console.log(title);
            let keyFormatters=[];

            for(let keyFormatterIndex in responseBody.String){ keyFormatters.push(responseBody.String[keyFormatterIndex]);}
            keyFormatters.push("custom");
            console.log(typeof value === 'string',value);

            let tableData={
              key:key,
              KeyFormatter:keyFormatters,
              ValueType:ValueType,
              ValueFormatters:ValueFormatters,
              handleRemoveRow:self.handleRemoveTableClick.bind(self),
              visible:false,
              parentRaw:parentRaw,
              rawVisibility:rawVisibility,
              onPreview:this.handlePreview.bind(this),
              icon:'noicon',
              dropdownTitle:title,
              initialKey:key,
              selectedKeyFormatter:"select",
              selectedValueFormatter:"select",
              selectedDateInputFormatter:"select",
              selectedDateOutputFormatter:"select",

            }

            if(typeof value === 'string') {

              self.addTableData(key, keyFormatters, ValueType, ValueFormatters, self.handleRemoveTableClick.bind(self),false,parentRaw,rawVisibility,this.handlePreview.bind(this),'noicon',title,key,"select","select","select","select");
            }else{
              tableData.valueType=["Nested"];
              tableData.ValueFormatters=[["Nested"]];
              tableData.visible=true;
              tableData.icon='icon-minus';
              self.addTableData(key, keyFormatters, ["Nested"], [["Nested"]], self.handleRemoveTableClick.bind(self),true,parentRaw,rawVisibility,this.handlePreview.bind(this),'icon-minus',title,key,"select","select","select","select");

            }
            if(!(typeof value === 'string')){
              addRawByRaw(value,self,responseBody,ValueType,ValueFormatters,key,'table-row');

            }
          }
        }.bind(self);
        if(this.request){
          addRawByRaw(this.request,this,responseBody,ValueType,ValueFormatters,"none",'table-row');
        }
      }else{
        resp ? console.log(resp) : console.log(err);
      }
    }catch(err){}

  }


  submitData(){
    try{
      this.request=JSON.parse(this.state.inputTextAreaValue);
      Api.fetchTableData(this.submitDataCallback.bind(this));
      this.setState({
        visible: {
          table: true,
          inputTextArea: false,
          outputTextArea: true,
          editTextAreaVisible:true
        }

      });
    }catch(err){
      console.log("parse errror");
    }

  }

  handleRemoveTableClick(){

    let table=this.refs.tableData;
    let list = this.refs.tableData.refs;
    const len = this.state.TableData.length;
    for(let x=0;x<len;x++){
      let key = this.state.TableData[x].keyValue;
      if(list[key].state.selected){
        this.deleteTableData(key,"none");
      }
    }
  }

  handleChange(event){
    this.setState({
      inputTextAreaValue: event.target.value,
      inputTextObject:JSON.parse(event.target.value)

    })
  }


  renderInputTextArea(){

    if(this.state.visible.inputTextArea){
      let stylesForNext = {paddingTop:'20px'};
      return (
          <div>
            <form>
            <div className="form-group">
              <div style={{paddingTop:'15px'}}>
              <TextArea toolTip="This text area show the input text" rows="15" ref="inputTextArea" ClassName="form-control item-style" value={this.state.inputTextAreaValue} handleChange={this.handleChange}/>
              </div>
                <div style={{paddingTop:'15px'}}>
              <Badge  handleClick={this.submitData.bind(this)} iconClassName={"glyphicon glyphicon-hand-right"} className={"btn btn-default right item-style"} title={"Next " }/>
              </div>
            </div>
            </form>
          </div>);}
    return <div/>
  }

  renderEditTextArea(){
    if(this.state.visible.editTextAreaVisible){
      return (
          <div>
            <form>
              <div className="form-group">
                <TextArea toolTip="This text area show the input text" rows="15" /*ref="inputTextArea"*/ ClassName="form-control item-style" value={this.state.inputTextAreaValue} handleChange={this.handleChange}/>

              </div>
            </form>
          </div>);}
    return <div/>
  }



  renderTable(){
    if(this.state.visible.table){
      //console.log(this.state.TableData);
      return (
          <div className="row" style={{paddingLeft:'40px'}}>
            {/*<div className="col-sm-2"/>*/}
            <div className="col-sm-10">
              <Table app={this} ref="tableData" raws={this.state.TableData}/>
              <div class="btn-group">
                <button type="button" className="btn btn-default" data-toggle="modal" data-target="#myModal">
                  Edit Input
                </button>
              <Badge  handleClick={this.saveSpecification.bind(this)} iconClassName={"glyphicon glyphicon-floppy-save"} className={"btn btn-default right item-style"} title={"Save " }/>

              </div>
            </div>
            <div className="col-sm-2">

            </div>
          </div>);}

    return <div/>
  }



  renderOutputTextArea(){
    if(this.state.visible.outputTextArea){
      return (

          <div className="row" style={{paddingRight:'60px'}}>

            {/*<div className="col-sm-6">*/}
            {/*<div className="col-sm-8">*/}
            <h2>Input Jason Object</h2>
            <TextArea rows="8" toolTip="This text area show the input text!" ref="inputTextArea" id="inputTextArea"  ClassName="form-control item-style" value={JSON.stringify(JSON.parse(this.state.inputTextAreaValue),null,5)}  />

            {/*</div>*/}
            {/*<div className="col-sm-6">*/}

            {/*output*/}
            <h2>Formatted Jason Object</h2>
            <TextArea rows="8" toolTip="This text area show the output text!" ref="outputTextArea" id="outputTextArea"  ClassName="form-control item-style" value={this.state.outputTextAreaValue}  />
            {/*</div>*/}

            {/*</div>*/}
            {/*<div className="col-sm-2"/>*/}
          </div>

      );
    }return <div/>
  }

  handleSaveChanges(){
    console.log("gfhdsjkdflghjkerhfduzlllllrdhgiiiiiia");
  }

  render(){
    let stylesForNext = {paddingTop:'20px'};
    return (
        <div>
          <Header/>
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-3"/>
              <div className="col-sm-6">
              {
                this.renderInputTextArea()
              }
                </div>
              <div className="col-sm-3"/>
              </div>
                <div className="row" style={stylesForNext}>
              <div className="col-sm-8">

              {this.renderTable()}

              </div>

              <div className="col-sm-4">

              {this.renderOutputTextArea()}
              </div>
            </div>
            <div className="row">
              <div className="col-sm-3"/>
                <div className="col-sm-6">
              <Alert fade = {this.state.alertOfAppIdFade} msg={this.state.generatedAppId}/>
                  <  Jumbotron visible = {this.state.alertOfAppIdFade==="out"?false:true} request={this.state.inputTextAreaValue} appId={this.state.generatedAppId}/>
                  </div>
              <div className="col-sm-3"/>
              </div>
                <div className="row">
              <Modal saveChanges={this.submitData.bind(this)} modalTitle="your input request" body={this.renderEditTextArea.bind(this)}/>
            </div>
          </div>
    </div>
  );
  }
  renderAlert(){
    return <Alert fade = {this.state.alertOfAppIdFade} msg={this.state.generatedAppId}/>
  }
}
