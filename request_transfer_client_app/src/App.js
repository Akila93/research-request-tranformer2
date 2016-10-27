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
import {ModalBody} from './components/modalBody';
import {JSONTextArea} from './components/JSONTextArea';
//import 'react-json-pretty/JSONPretty.monikai.styl';

//require('./css/custom.css');

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
      resultInput:"",
      rowOfCall:""

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
    console.log("specification is",JSON.stringify(specification));
    console.log("request is :",JSON.stringify(request));

    let previewBody={
      specification:specification,
      request:request,
    }

    Api.handlePreviewRequest(previewBody,this.handlePreviewCallback.bind(this));

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
      console.log("Error while saving data: ",err);
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


  isSelectedKey(keyListOfTable,key){
    for (let index = 0; index < keyListOfTable.length; index++) {
      if (keyListOfTable[index] === key) {
        return true;
      }
    }return false;
  }

  performOnEachKey (key,keyListOfTable,intialReqeust) {
    if (!(this.isSelectedKey(keyListOfTable,key))) {
      delete intialReqeust[key];
    } else {
      if (!(typeof intialReqeust[key] === 'string')) {
        intialReqeust[key] = self.modifyRequst(intialReqeust[key], keyListOfTable);
      }
    }
  }


  modifyRequst(intialReqeust, keyListOfTable)
  {
    var self=this;

    if(intialReqeust instanceof Array){
      let modifiedList=[];
      for (let j=0;j<intialReqeust.length;j++){
        if(!(typeof intialReqeust[j] === 'object'))
        {
          return intialReqeust;
        }
        modifiedList.push(this.modifyRequst(intialReqeust[j],keyListOfTable));
      }
      return modifiedList;
    } else {
      var keyListOfInitialRequest = Object.keys(intialReqeust);
      keyListOfInitialRequest.forEach(
          function (key) {
            if (!(this.isSelectedKey(keyListOfTable,key))) {
              delete intialReqeust[key];
            } else {
              if (!(typeof intialReqeust[key] === 'string')) {
                intialReqeust[key] = self.modifyRequst(intialReqeust[key], keyListOfTable);
              }
            }
          }
          , this);

    }
    return intialReqeust;
  }

  getSpecificationItemAttribute(specificationItemListIndex,attribute){
    return this.state.TableData[specificationItemListIndex][attribute];
  }

  formARequest(){
    let  request={
      requestBody:[]
    };
    let getStateOfKeyValue=function(i){return this.refs.tableData.refs[tableData[i]["keyValue"]].state;}.bind(this);
    let currentInputTextAreaValue =JSON.parse(this.state.inputTextAreaValue);
    let removeChecked=function(i,getStateOfKeyValue){return getStateOfKeyValue(i).removeChecked;}.bind(this);

    let keyListOfTable =[];
    let tableData=TableDataStore.getAll();
    for (let i=0;i<tableData.length;i++){
      if(removeChecked(i,getStateOfKeyValue)){
        continue;
      }else {
        for (let specificationItemListIndex in this.state.TableData) {
          if(this.getSpecificationItemAttribute(specificationItemListIndex,"keyValue")===getStateOfKeyValue(i).keyValue){
            keyListOfTable.push(this.getSpecificationItemAttribute(specificationItemListIndex,"initialKey"));
            break;
          }
        }


      }
    }

      request.requestBody=this.modifyRequst(currentInputTextAreaValue,keyListOfTable);

    return request;
  }

  formAListOfOperations(){
   // this.refs.listModal.refs.modalBodyForList.refs.operations.state.title;
    let listOfOperations=this.refs.listModal.refs.modalBodyForList.state.selectedOpsWithName;
    //use storeto get selectedOpsWithName
    //console.log("modalBodyForList.state.selectedOperations",this.refs.listModal.refs.modalBodyForList.state);
    let stringListOfOps="";
    for(const operationIndex in listOfOperations){
      stringListOfOps=stringListOfOps+listOfOperations[operationIndex].title+",";
    }
    stringListOfOps=stringListOfOps.substr(0,stringListOfOps.length-1);
    return (stringListOfOps=="")?"nothing":stringListOfOps;
  }

  getCurrentPadding(currentValue,parentRaw){
    let currentPaddingForLeft=currentValue;
    if(parentRaw!="none"){
      currentPaddingForLeft=currentPaddingForLeft.substr(0,currentPaddingForLeft.length-1);
      currentPaddingForLeft=parseInt(currentPaddingForLeft);
      let shift=10;
      currentPaddingForLeft=(currentPaddingForLeft+shift)+'%';
      return currentPaddingForLeft;
    }
    return currentPaddingForLeft;
  }
  getElementList(){
    let elementsList=this.refs.listModal.refs.modalBodyForList.refs;
    //console.log("elementsList",elementsList);
    let stringOfElements='';
    for(const elementDropsIndex in elementsList){
      if(elementDropsIndex.search("element:")>=0){
        //console.log("elementDropsIndex",elementDropsIndex,elementsList[elementDropsIndex].state.title);
        stringOfElements=stringOfElements+elementsList[elementDropsIndex].state.title+',';
      }
    }
    stringOfElements=stringOfElements.substr(0,stringOfElements.length-1);
    //console.log("stringOfElements",stringOfElements);
    return stringOfElements;
  }
  getListOfNamesForOutputValues(){
    let listOfOps=this.refs.listModal.refs.modalBodyForList.refs;
    console.log("listOfOps",listOfOps);
    let stringOfNames='';
    for(const namesIndex in listOfOps){
      if(namesIndex=="listType"||namesIndex=="operations"||namesIndex.search("element")>=0){continue;}

      stringOfNames=stringOfNames+listOfOps[namesIndex].value+',';//listOfNewNamesForOperations[namesIndex].value
      //should use store to get names.
    }
    stringOfNames=stringOfNames.substring(0,stringOfNames.length-1);
    console.log("stringOfNames",stringOfNames);
    return stringOfNames;


  }

  formASpecification(){
    let existIntheList=function(list,name){
      for(const index in list){
        if(list[index].key==name){return true;}
      }
      return false;
    }
    let specification=
    {
      list: [],
      created :"845486"
    };

    let list=[];
    let getRefAttributes= function(refferedItem,firstRef,seconedRef,stateSelected){
      if(firstRef){
        if(seconedRef){
          if(stateSelected){
            return refferedItem.refs[firstRef].refs[seconedRef].state[stateSelected];
          }
          return refferedItem.refs[firstRef].refs[seconedRef];
        }
        return refferedItem.refs[firstRef];
      }
    }.bind(this);

    let tableRaws=this.refs["tableData"].refs;

    for (let row in tableRaws) {

      let specificationItemKey="";
      let parentName="none";
      for (let specificationItemListIndex in this.state.TableData) {

        if(this.getSpecificationItemAttribute(specificationItemListIndex,"keyValue")===row){
          specificationItemKey=this.getSpecificationItemAttribute(specificationItemListIndex,"initialKey");
          ///specification itemparent name
          parentName=this.getSpecificationItemAttribute(specificationItemListIndex,"parentRaw");
          break;
        }
      }

      let tableRaw=tableRaws[row];
      let keyFormatter=tableRaw.refs.firstCell.refs["keyformatter"].state.title;
      let type=tableRaw.refs.seconedCell.refs["type"].state.title;
      let valueFormatter='nothing';
      let valueInputFormat="";
      let customValueNames="";
      let operationKey="";
      let specificationItem={};
      //let listType="";

      ////console.log(type);
      //if(parent name exist){ add it first}
      if(parentName!=="none"){

        for (let parentRow in tableRaws) {
          if(parentRow==parentName){
            //console.log("parentRaw: ",parentName,parentRow);
            keyFormatter=tableRaws[parentRow].refs.firstCell.refs["keyformatter"].state.title;
            type=tableRaws[parentRow].refs.seconedCell.refs["type"].state.title;
            if(type!="List"){continue;}//if it is not a list we don't want to ormat
            valueFormatter="nothing";
            valueInputFormat=this.refs.listModal.refs.modalBodyForList.refs.listType.state.title;

            specificationItem={
              key: parentName,
              keyFormatter: (keyFormatter=="select")?"nothing":keyFormatter,
              valueFormatter:(valueFormatter=="select")?"nothing":valueFormatter,
              valueInputFormat:valueInputFormat,
              valueType: type,
              updatedKey:parentRow,
              operationKey:"nothing"
            }
            if(!existIntheList(list,parentName)){list.push(specificationItem);}


          }
        }


      }

      tableRaw=tableRaws[row];
      keyFormatter=tableRaw.refs.firstCell.refs["keyformatter"].state.title;
      type=tableRaw.refs.seconedCell.refs["type"].state.title;
      valueFormatter;
      valueInputFormat="";
      operationKey="";
      if(type==="Date"){

        valueFormatter=tableRaw.refs.thiredCell.refs["outputFormatter"].state.title;
        valueInputFormat=tableRaw.refs.thiredCell.refs["inputFormatter"].state.title;
        operationKey="none";

      }else if(type=="List"){
        ///add child row also it has
        console.log("formAListOfOperations: ",this.formAListOfOperations());
        valueFormatter=this.formAListOfOperations();//this.refs.listModal.refs.modalBodyForList.refs.operations.state.title;
        valueInputFormat=this.refs.listModal.refs.modalBodyForList.refs.listType.state.title;
        //"customValueNames":"totalmarks,marksaverage"
        customValueNames=this.getListOfNamesForOutputValues();

        if(valueInputFormat==="objectList"){
          operationKey=this.getElementList();
          //should change

        }



      }else{

        valueFormatter= tableRaw.refs.thiredCell.refs["formatter"].state.title;
        operationKey="none";

      }
      if((keyFormatter=="select" && valueFormatter=="select")){

        continue;

      }
      specificationItem={
        key: specificationItemKey,
        keyFormatter: (keyFormatter=="select")?"nothing":keyFormatter,
        valueFormatter:(valueFormatter=="select")?"nothing":valueFormatter,
        valueInputFormat:valueInputFormat,
        valueType: type,
        updatedKey:row,
        operationKey:operationKey,
        customValueNames:customValueNames
      }
      list.push(specificationItem);
    }
   // console.log("specification.list:",list);
    specification.list=list;
    return specification;
  }



  handlePreviewCallback(err,resp){
    if(resp){
      this.setState({
        outputTextAreaValue: JSON.stringify(resp.body.requestBody,null,2)
      });
    }
  }


  addTableData(key,KeyFormatter,ValueType,ValueFormatters,handleRemoveRow,visible,parentRaw,rawVisibility,onPreview,icon,dropdownTitle,initialKey,selectedKeyFormatter,selectedValueFormatter,selectedDateInputFormatter,selectedDateOutputFormatter,rowColor,currentPaddingForLeft){

    //console.log(selectedDateInputFormatter);
    TableAction.addTableData(key,KeyFormatter,ValueType,ValueFormatters,handleRemoveRow,visible,parentRaw,rawVisibility,onPreview,icon,dropdownTitle,initialKey,selectedKeyFormatter,selectedValueFormatter,selectedDateInputFormatter,selectedDateOutputFormatter,rowColor,currentPaddingForLeft);

  }


  detectValueType(value){
    let title="String";
    let nummberReg = new RegExp("^[-]?[0-9]+[\.]?[0-9]+$");
    let dateReg=new RegExp("[-+]?\\d*\\.?\\d+");
    if(nummberReg.test(value)){
      title="Number";
    }else if(dateReg.test(value)){
      title="Date"
    }else if(typeof value !="string"){
      title="Nested"
    }
    return title;
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
        //console.log(ValueFormatters+" "+ValueType);
        TableAction.deleteAll();
        var addRawByRaw=function(request,self,responseBody,ValueType,ValueFormatters,parentRaw,rawVisibility,rowColor,currentPaddingForLeft){

          ////console.log("in");
          //console.log(parentRaw);
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
            if(value instanceof Array){
              title="List"

            }
            ////console.log(title);
            let keyFormatters=[];

            for(let keyFormatterIndex in responseBody.String){ keyFormatters.push(responseBody.String[keyFormatterIndex]);}
            keyFormatters.push("custom");
            //console.log(typeof value === 'string',value);

            if(value instanceof Array){
              if(value.length > 0 && typeof value[0] == 'object'){
                let firstElement = value[0];
                /////////list type in the modal should be setted to objectList
                //getting next padding for key
                let newPaddingForLeft=this.getCurrentPadding(currentPaddingForLeft,key);
                self.addTableData(key, keyFormatters, ["List"], ValueFormatters, self.handleRemoveTableClick.bind(self),true,parentRaw,rawVisibility,self.handlePreview.bind(self),'icon-chevron-down',title,key,"select","select","select","select",rowColor,currentPaddingForLeft);
                addRawByRaw(firstElement,self,responseBody,ValueType,ValueFormatters,key,'table-row','B8E4F9',newPaddingForLeft);
              }else{
                /////////list type in the modal should be setted to valueList
                self.addTableData(key, keyFormatters, ["List"], ValueFormatters, self.handleRemoveTableClick.bind(self),false,parentRaw,rawVisibility,self.handlePreview.bind(self),'noicon',title,key,"select","select","select","select",rowColor,currentPaddingForLeft);
              }
            }else {

              if (typeof value === 'string') {

                self.addTableData(key, keyFormatters, ValueType, ValueFormatters, self.handleRemoveTableClick.bind(self), false, parentRaw, rawVisibility, self.handlePreview.bind(self), 'noicon', title, key, "select", "select", "select", "select",rowColor,currentPaddingForLeft);
              } else {
                self.addTableData(key, keyFormatters, ["Nested"], [["Nested"]], self.handleRemoveTableClick.bind(self), true, parentRaw, rawVisibility, self.handlePreview.bind(self), 'icon-minus', title, key, "select", "select", "select", "select",rowColor,currentPaddingForLeft);

              }
              if (!(typeof value === 'string')) {
                let newPaddingForLeft=this.getCurrentPadding(currentPaddingForLeft,key);
                addRawByRaw(value, self, responseBody, ValueType, ValueFormatters, key, 'table-row','D9E1EE',newPaddingForLeft);

              }
            }
          }
        }.bind(self);
        if(this.request){
          addRawByRaw(this.request,this,responseBody,ValueType,ValueFormatters,"none",'table-row','FFFFFF','0%');
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

  ////edit deleted required !important



  renderTable(){
    if(this.state.visible.table){
      return (
          <div className="row" >
            <div className="col-sm-10">
              <Table app={this} ref="tableData" raws={this.state.TableData}/>
              <div className="btn-group" style={{width:'270px', height:'34px',marginLeft:'100px',marginRight:'100px'}}>
                <Badge className={"btn btn-default item-style"} iconClassName={"glyphicon glyphicon-pencil"} dataId={this.countOfLists} handleClick={function(){}} dataToggle="modal" dataTarget="#myModal" title="Edit Input " />
                <Badge  handleClick={this.saveSpecification.bind(this)} iconClassName={"glyphicon glyphicon-floppy-save"} className={"btn btn-default item-style"} title={"Save " }/>
                <Badge  handleClick={this.submitData.bind(this)} iconClassName={"glyphicon glyphicon-refresh"} className={"btn btn-default item-style"} title={"Refresh " }/>
              </div>
            </div>
            <div className="col-sm-2">
            </div>
          </div>
      );}

    return <div/>
  }


  renderAlert(){
    return <Alert fade = {this.state.alertOfAppIdFade} msg={this.state.generatedAppId}/>
  }

  renderOutputTextArea(){
    if(this.state.visible.outputTextArea){
      return (

          <div className="row"/*"row rowOfTextAreas" style={{margin:'40px'}}*/>

            {/*<div className="col-sm-6">*/}
            <div className="col-sm-6">
            <center>
              <h3>Input Jason Object</h3>
            </center>
              <JSONTextArea className="textarea" ref="inputTextArea" id="textarea"  toolTip="This text area show the input text!" value={JSON.stringify(JSON.parse(this.state.inputTextAreaValue),null,5)}/>

            </div>
            <div className="col-sm-6">

            {/*output*/}
            <center>
            <h3>Formatted Jason Object</h3>
            </center>
              <JSONTextArea  className="textarea" toolTip="This text area show the output text!" ref="outputTextArea" id="textarea" value={this.state.outputTextAreaValue} />
              </div>

            {/*</div>*/}
            {/*<div className="col-sm-2"/>*/}
          </div>

    );
    }return <div/>
  }



  render(){
    let modalBodyOfEdit=(
        <div>
          <TextArea  toolTip="This text area show the input text" rows="15" ref="editTextArea" ClassName="form-control item-style" value={this.state.inputTextAreaValue} handleChange={this.handleChange}/>
        </div>);

    let stylesForNext = {paddingTop:'20px'};
    return (
        <div >
          <Header/>
          <div className="container-fluid" style={{marginTop:'105px'}}>
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
              <div className="col-sm-1"/>
              <div className="col-sm-10">

                {this.renderTable()}

              </div>
                <div className="col-sm-1"/>

            </div>
            <div className="row" style={stylesForNext}>
              <div className="col-sm-12">
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
              <Modal submitBtnWithConfirm={true} submitButton="Save changes" ref="myModal" modalId="myModal" saveChanges={this.submitData.bind(this)} modalTitle="your input request" body={function(){return modalBodyOfEdit;}.bind(this)}/>
              <Modal onPreview={this.handlePreview.bind(this)} submitBtnWithConfirm={false} submitButton="Preview"ref="listModal" modalId="listModal" saveChanges={function(){}} modalTitle="your input request" body={
              function(){
               return <ModalBody ref="modalBodyForList" operations={[]} elements={[]} />;
              }.bind(this)}/>
            </div>
          </div>
        </div>
    );
  }

}
