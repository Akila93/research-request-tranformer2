import React, { Component } from 'react';
import { Badge } from './components/badge';
import { Header } from './components/header';
import {Table} from './components/table';
import {TextArea} from './components/textArea';
import TableDataStore from './store/tableDataStore';
import Api from './util/api';
import * as TableAction from './action/TableActions';
import {Alert} from './components/alert';


export class App extends Component {
  constructor(){
    super();
    this.state = {
      TableData: TableDataStore.getAll(),
      inputTextAreaValue:"",
      alertOfAppIdFade:"out",
      generatedAppId:"",
      visible: {
        table: false,
        inputTextArea: true,
        outputTextArea: false
      },
      outputTextAreaValue:"",
      resultInput:"",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePreview = this.handlePreview.bind(this);
    this.saveSpecification = this.saveSpecification.bind(this);
    this.handlePreviewRequest=this.handlePreviewRequest.bind(this);
    this.saveSpecificationCallback=this.saveSpecificationCallback.bind(this);
    this.handleRequest=this.handleRequest.bind(this);
    this.getSave=this.getSave.bind(this);
    this.formASpecification=this.formASpecification.bind(this);
    this.getFormattedResult=this.getFormattedResult.bind(this);
  }

//not using
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




  saveSpecificationCallback(err,resp) {
    if (resp) {
      this.setState({
        alertOfAppIdFade: "in",
        generatedAppId: resp.body.appId
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



  componentWillMount(){
    TableDataStore.on("change",()=>{
      this.setState({
      TableData: TableDataStore.getAll()
    })
  })
  }


  getFormattedResult(err,resp){
    let ss=JSON.stringify(resp.body.request,null,2);
    let id=JSON.stringify(resp.body.appId);
    let ob={}
    ob["request"]=ss;
    ob["id"]=id;
    return ob;
  }


  //this is a recursion function for create request object

  
  getSave(err,resp){
    let ob = this.getFormattedResult(err,resp);
    this.setState({
      outputTextAreaValue: ob["request"],
      alertOfAppIdFade:"in",
      generatedAppId:ob["id"]
    });
  }

//need to check
  handleRequest(err,resp){
    if(resp) {
      let request = {
        appId: 1,
        request: []
      }
      if (resp) {
        request.appId = resp.body.appId;
      }
      let formRequest = this.formARequest();
      request.request = formRequest.request;
      return request;
    }else{
      return err;
    }
  }



  handlePreviewRequest(err,resp){
    if(resp){
      this.setState({
        outputTextAreaValue: JSON.stringify(resp.body.requestBody,null,2)
      });
    }
  }


  handleChange(event){
    this.setState({inputTextAreaValue: event.target.value})
  }



  addTableData(key,KeyFormatter,ValueType,ValueFormatters,handleRemoveRow,visible,parentRaw,rawVisibility,onPreview,icon){

    TableAction.addTableData(key,KeyFormatter,ValueType,ValueFormatters,handleRemoveRow,visible,parentRaw,rawVisibility,onPreview,icon);

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
    //this.handlePreview();
  }



  handleRemoveRow(){
    console.log("done");
  }



  handleFetched(err,resp){
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
        var addRawByRaw=function(request,self,responseBody,ValueType,ValueFormatters,parentRaw,rawVisibility){

          //console.log("in");
          console.log(parentRaw);
          for(const key in request) {
            let value=request[key];
            console.log(typeof value === 'string',value);
            if(typeof value === 'string') {

              self.addTableData(key, responseBody.String, ValueType, ValueFormatters, self.handleRemoveTableClick.bind(self),false,parentRaw,rawVisibility,this.handlePreview.bind(this),'noicon');
            }else{
              self.addTableData(key, responseBody.String, ["Nested"], [["Nested"]], self.handleRemoveTableClick.bind(self),true,parentRaw,rawVisibility,this.handlePreview.bind(this),'icon-minus');

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



  
  handleSubmitData(err,resp){
    console.log(resp.text);
  }




  submitData(){
    try{

      this.request=JSON.parse(this.state.inputTextAreaValue);
      Api.setOnFetch(this.handleFetched.bind(this));
      Api.fetchTableData();

      this.setState({

        visible: {
          table: true,
          inputTextArea: false,
          outputTextArea: true
        }

      });
    }catch(err){
      console.log("parse errror");
    }

  }


  formARequest(){

    let  request={
      requestBody:[]
    };
    let obj =JSON.parse(this.state.inputTextAreaValue);
    request.requestBody=obj;
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
      let tableRaw=tableRaws[x];
      let keyFormatter=tableRaw.refs["keyformatter"].state.title;
      let type=tableRaw.refs["type"].state.title;
      let valueFormatter;
      let valueInputFormat="";
      console.log(type);
      if(type==="Date"){
        console.log("inside condition")
        valueFormatter=tableRaw.refs["outputFormatter"].state.title;
        valueInputFormat=tableRaw.refs["inputFormatter"].state.title
      }else {
        valueFormatter= tableRaw.refs["formatter"].state.title;
      }
      if(keyFormatter=="select" || valueFormatter=="select" || type=="select"){
        continue;
      }
      let specificationItem={
        key: x,
        keyFormatter: keyFormatter,
        valueFormatter:valueFormatter,
        valueInputFormat:valueInputFormat,
        valueType: type,
      }
      list.push(specificationItem);
    }
    specification.list=list;
    return specification;
  }

  handlePreview(){
    let specification = this.formASpecification();
    let request=this.formARequest();


    let previewBody={
      specification:specification,
      request:request,
    }
    //console.log(previewBody);
    Api.handlePreviewRequest(previewBody,this.handlePreviewRequest.bind(this));
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



  renderInputTextArea(){
    if(this.state.visible.inputTextArea){
      return (
          <div>
            <div className="col-sm-2"/>
            <div className="col-sm-8">
              <form >
                <div className="col-sm-4">
                  <h3>Enter json request</h3>
                </div>
                <div className="col-sm-8s">
                  <TextArea rows="15" ref="inputTextArea" ClassName="form-control item-style" value={this.state.inputTextAreaValue} handleChange={this.handleChange}/>
                </div>
              </form>
              <div style={{textAlign:"right"}}>
                <Badge  handleClick={this.submitData.bind(this)} iconClassName={"glyphicon glyphicon-triangle-right"} className={"btn-success right item-style"} title={" Next " }/>
              </div>
            </div>
            <div className="col-sm-2"/>
          </div>);}
    return <div/>
  }




  renderTable(){
    if(this.state.visible.table){
      //console.log(this.state.TableData);
      return (
          <div className="row" >
            {/*<div className="col-sm-2"/>*/}
            <div className="col-sm-10">
              <Table app={this} ref="tableData" raws={this.state.TableData}/>
              <div class="btn-group">
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

          <div className="row">

            {/*<div className="col-sm-2"/>*/}
            {/*<div className="col-sm-8">*/}

            <TextArea rows="8" ref="inputTextArea" id="inputTextArea"  ClassName="form-control item-style" value={JSON.stringify(JSON.parse(this.state.inputTextAreaValue),null,5)}  />

            {/*output*/}
            <TextArea rows="8" ref="outputTextArea" id="outputTextArea"  ClassName="form-control item-style" value={this.state.outputTextAreaValue}  />


            {/*</div>*/}
             {/*<div className="col-sm-2"/>*/}
          </div>

    );
    }return <div/>
  }



  render(){
    return (
        <div>
          <Header/>
          <div className="container">
            <div className="row">
              {this.renderInputTextArea()}

              <div className="col-sm-8">

              {this.renderTable()}

              </div>

              <div className="col-sm-4">

              {this.renderOutputTextArea()}


              </div>
            </div>
            <div className="row">
              <Alert fade = {this.state.alertOfAppIdFade} msg={this.state.generatedAppId}/>
            </div>
          </div>
    </div>
  );
  }
}
