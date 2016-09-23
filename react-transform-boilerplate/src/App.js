import React, { Component } from 'react';
import { Badge } from './components/badge';
import { Header } from './components/header';
import {Table} from './components/table';
import {TextArea} from './components/textArea';
import TableDataStore from './store/tableDataStore';
import Api from './util/api';
import * as TableAction from './action/TableActions';


export class App extends Component {
  constructor(){
    super();
    this.state = {
      TableData: TableDataStore.getAll(),
      value:"",
      visible: {
        table: false,
        inputTextArea: true,
        outputTextArea: false
      },
      result:"",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.handleRequest=this.handleRequest.bind(this);
    this.getFormattedResult=this.getFormattedResult.bind(this);
  }



  componentWillMount(){
    TableDataStore.on("change",()=>{
      this.setState({
      TableData: TableDataStore.getAll()

    })
      console.log(this.state.TableData);
  })
  }

  getFormattedResult(err,resp){
    Api.deleteSpecification("http://172.16.1.182:8080/specification/"+resp.body.appId,function(err,resp){
      console.log("done");
    });
    this.setState({result: resp.text})

  }

  createRequst(obj,rawkey){
    var self=this;
    var keys=Object.keys(obj);
    keys.forEach(function (key) {
      let bool=false;
      for (let i = 0; i <rawkey.length; i++) {
        if (rawkey[i] === key) {
          bool=true;
        }
      }
      if(!bool){
        delete obj[key];
      }else{
        if(!(typeof obj[key] === 'string')){
          console.log(obj[key]);
          obj[key]=self.createRequst(obj[key],rawkey);
        }
      }
    },this);
    return obj;

  }


  handleRequest(err,resp){
    let request={
      appId:1,
      request:[]
    }

    if(resp){
      request.appId=resp.body.appId;
    }
    request.request=JSON.parse(this.state.value);
    let obj =JSON.parse(this.state.value);
    console.log(obj);

    let rawkey={};
    let tableRaws=this.refs["tableData"].refs;
    console.log(tableRaws);
    for(const x in tableRaws){
      let rowRefs= tableRaws[x].refs;
      if(rowRefs["keyformatter"].state.title=="select" || rowRefs["formatter"].state.title=="select" || rowRefs["type"].state.title=="select"){
        continue;
      }
      rawkey[x]=obj[x];
    }
    var output=this.createRequst(obj,Object.keys(rawkey));
    request.request=output;
    console.log(request.request);
    Api.setOnFetch(this.getFormattedResult.bind(this));
    Api.getRequest('http://172.16.1.182:8080/request',request);
  }

  handleChange(event){
    this.setState({value: event.target.value})
  }


  addTableData(key,KeyFormatter,ValueType,ValueFormatters,handleRemoveRow,visible,parentRaw,rawVisibility){

    TableAction.addTableData(key,KeyFormatter,ValueType,ValueFormatters,handleRemoveRow,visible,parentRaw,rawVisibility);
  }

  handleRemoveTableClick(){
    let table=this.refs.tableData;
    let list = this.refs.tableData.refs;
    //console.log(list);
    for(let x=0;x<this.state.TableData.length;x++){
      let key = this.state.TableData[x].keyValue;
      if(list[key].state.selected){this.deleteTableData(x);}
    }
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
          ValueType.push(key);
          ValueFormatters.push(responseBody[key]);
        }
        let self = this;
        console.log(ValueFormatters+" "+ValueType);
        var addRawByRaw=function(request,self,responseBody,ValueType,ValueFormatters,parentRaw,rawVisibility){

          console.log("in");
          console.log(parentRaw);
          for(const key in request) {
            let value=request[key];
            console.log(typeof value === 'string',value);
            if(typeof value === 'string') {

              self.addTableData(key, responseBody.String, ValueType, ValueFormatters, self.handleRemoveTableClick.bind(self),false,parentRaw,rawVisibility);
            }else{
              self.addTableData(key, responseBody.String, ["Nested"], [["Nested"]], self.handleRemoveTableClick.bind(self),true,parentRaw,rawVisibility);

            }
            if(!(typeof value === 'string')){

              addRawByRaw(value,self,responseBody,ValueType,ValueFormatters,key,'table-raw');

            }
          }
        }.bind(self);
        if(this.request){
          addRawByRaw(this.request,this,responseBody,ValueType,ValueFormatters,"none",'table-raw');
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

      this.request=JSON.parse(this.state.value);
      Api.setOnFetch(this.handleFetched.bind(this));
      Api.fetchTableData('http://172.16.1.182:8080/specification');

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



  deleteTableData(x){
    TableAction.deleteTableData(x);
  }



  handleSend(){
    var specification=
    {
      //appId: 1,
      list: [],
      created :"845486"
    };

    let list=[];

    let tableRaws=this.refs["tableData"].refs;
    for (let x in tableRaws) {
      let tableRaw=tableRaws[x];
      let keyFormatter=tableRaw.refs["keyformatter"].state.title;
      let valueFormatter=tableRaw.refs["formatter"].state.title;
      let type=tableRaw.refs["type"].state.title;

      if(keyFormatter=="select" || valueFormatter=="select" || type=="select"){
        continue;
      }

      let specificationItem={
        key: x,
        keyFormatter: keyFormatter,
        valueFormatter:valueFormatter,
        valueType: type,
      }
      list.push(specificationItem);
    }
    specification.list=list;
    console.log(list);
    Api.addSpecification('http://172.16.1.182:8080/specification/add',specification,this.handleRequest.bind(this));
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



  handleDelete(err,resp){}



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
                  <TextArea rows="15" ref="inputTextArea" ClassName="form-control item-style" value={this.state.value} handleChange={this.handleChange}/>
                </div>
              </form>
              <div style={{textAlign:"right"}}>
                <Badge  handleClick={this.submitData.bind(this)} iconClassName={"glyphicon glyphicon-plus-sign"} className={"btn-success right item-style"} title={"submit" }/>
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
              <Table ref="tableData" raws={this.state.TableData}/>
              <Badge  handleClick={this.handleSend.bind(this)} iconClassName={"glyphicon glyphicon-forward"} className={"btn btn-primary right item-style"} title={"Preview" }/>

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
              <TextArea rows="8" ref="outputTextArea" id="outputTextArea"  ClassName="form-control item-style" value={this.state.result}  />
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
          </div>
    </div>
  );
  }
}
