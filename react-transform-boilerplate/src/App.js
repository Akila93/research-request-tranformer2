import React, { Component } from 'react';
import { Badge } from './components/badge';
import { Header } from './components/header';
import { Footer } from './components/footer';
import {Table} from './components/table';
import {TextArea} from './components/textArea';
import TableDataStore from './store/tableDataStore';
import * as TableAction from './action/TableActions';
import api from './util/api';

export class App extends Component {
  constructor(){
    super();
    this.state = {
      TableData: TableDataStore.getAll(),
      value:"",
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
    })
  }

  handleChange(event){
    this.setState({value: event.target.value})
    //console.log(event.target.value);
  }

  addTableData(){
    var key=this.refs.key;
    var formatter=this.refs.formatter;
    if(key.state.title=="select key"||formatter.state.title=="select formatters"){return;}

    TableAction.addTableData(key.state.title,formatter.state.title);
  }
  handleRemoveTableClick(){
    let table=this.refs.tableData;
    let list = this.refs.tableData.refs;

    for(let x=0;x<this.state.TableData.length;x++){
      //console.log(this.state.TableData[x].keyValue);
      let key = this.state.TableData[x].keyValue;
      if(list[key].state.selected){this.deleteTableData(x);}
    }
  }

  handleSubmitData(err,resp){
    console.log(resp.text);
  }

  submitData(){

    api.setCallback(this.handleSubmitData);
    api.fetchTableData('http://172.16.1.182:8080/specification');

  }

  deleteTableData(x){
    TableAction.deleteTableData(x);
  }
  getFormattedResult(err,resp){
    this.setState({result: resp.text})
    console.log(resp.text);
  }

  handleRequest(){
    let request={
      appId:"001",
      request:[]
    }

    request.request=JSON.parse(this.state.value);
    console.log(request.request);
    api.setCallback(this.getFormattedResult.bind(this));
    api.getRequest('http://localhost:8080/request',request);

  }

  handleSend(){
    var specification=
    {
      appId: "001",
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
         let specificationItem={
           key: x,
           keyFormatter: keyFormatter,
           valueFormatter:valueFormatter,
           valueType: type,
         }
         list.push(specificationItem);
    }
    specification.list=list;
    api.addSpecification('http://localhost:8080/specification/add',specification);
    this.handleRequest();
  }

  render(){
    const { TableData } = this.state;
    return (
    <div>
      <Header/>
      <div className="container">


      <div className="row">
        <div className="col-sm-6 colStyle">

          <form >
            <div className="raw">
              <div className="col-sm-4">
                <h3>Enter json request</h3>
              </div>
              <div className="col-sm-8s">
                <TextArea ClassName="form-control item-style" value={this.state.value} handleChange={this.handleChange}/>
              </div>
            </div>
          </form>

          <div style={{textAlign:"right"}}>
            <Badge  handleClick={this.submitData.bind(this)} iconClassName={"glyphicon glyphicon-plus-sign"} className={"btn-success right item-style"} title={"submit" }/>
          </div>
        </div>

        <div className="col-sm-6 colStyle">
          <Table ref="tableData" raws={TableData}/>
          <Badge  handleClick={this.handleRemoveTableClick.bind(this)} iconClassName={"glyphicon glyphicon-remove-sign"} className={"btn-danger right item-style"} title={"Remove" }/>
          <Badge  handleClick={this.handleSend.bind(this)} iconClassName={"glyphicon glyphicon-envelope"} className={"btn btn-primary right item-style"} title={"Send" }/>
          <TextArea ClassName="form-control item-style" value={this.state.result}/>

        </div>
      </div>
    </div>

      <Footer/>

    </div>
    );
  }
}
