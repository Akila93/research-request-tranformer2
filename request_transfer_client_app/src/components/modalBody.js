import React, { Component } from 'react';
import {Dropdown} from "./dropdown";

export class ModalBody extends Component {
    constructor(props) {
        super(props);
        let operationsForList=this.props.operations;
        let elementForList=this.props.elements;
        this.state = {
            titleOfTheListType:"objectList",///this should be loaded by store
            operationsForList:operationsForList,
            elementForList:elementForList,
            selectedOpsWithName:[],////this should be loaded by store
            //listOfNewNamesForOperations:[],//this should be loaded by store
            mouseEvents: {
                OpsWithName:[],////this should be loaded by store or should be created accoording to selectedOpsWithName
                listType: {
                    enter: false,
                    leave: true
                },
                operations: {
                    enter: false,
                    leave: true
                }
            }
        }

    }

    onItemSelect(index,title){
        if(this.refs.listType.state.title=="objectList"){
            this.setState({
                titleOfTheListType:title
            })
        }else{
            this.setState({
                titleOfTheListType:title
            })
        }

    }
    onCustomTypeSelect(){

    }
    handleMouseEnterForListItem(index){
        let mouseEvents= this.state.mouseEvents;
        let OpsWithName=mouseEvents.OpsWithName;
       // console.log("listTypeWithName[index]:",OpsWithName,index);
        let enterNewStatus=!OpsWithName[index].enter;
        OpsWithName[index].enter=enterNewStatus;
        mouseEvents.OpsWithName=OpsWithName;
        this.setState({mouseEvents:mouseEvents});
    }
    mouseEvent(element) {

        let newState=this.state;
        let mouseEvents=newState['mouseEvents'];
        let listType=mouseEvents[element];
        //console.log("element: ",element,mouseEvents[element]);
        listType.enter=!listType.enter;
        mouseEvents[element]=listType;
        newState['mouseEvents']=mouseEvents;
        this.setState(
            newState
        );
    }

    onItemSelectOPeration(index,title){
        let newList=this.state.selectedOperations;
        let newListWithName=this.state.selectedOpsWithName;
        let mouseEvents=this.state.mouseEvents;
        let mouseEventList=this.state.mouseEvents.OpsWithName;
        //add a condition for prevent readding
        let listItem={};
        listItem["title"]=title;
        let mouseEventForListElement = {enter:false};
        mouseEventList.push(mouseEventForListElement);
        newListWithName.push(listItem);


        mouseEvents.OpsWithName=mouseEventList;
        this.setState({
            selectedOpsWithName:newListWithName,
            mouseEvents:mouseEvents
        });
    }

    onItemSelectElement(index,title){}


    onCustomTypeSelectForOperation(){
        //set title  operation,name,element for selectedOpsWithName list item

    }
    renderElementDropdownForOperation(index){

        if(this.state.titleOfTheListType=="objectList"){
            return  <Dropdown onCustomTypeSelect={this.onCustomTypeSelectForOperation.bind(this)} enter={this.state.mouseEvents.OpsWithName[index].enter} leave={!this.state.mouseEvents.OpsWithName[index].enter} noInitial={false} onItemSelect={this.onItemSelectElement.bind(this)} ref={"element:"+index} items={this.state.elementForList} title={"select"}/>
        }else {
            return <div ></div>
        }
    }

    renderList(){
        return this.state.selectedOpsWithName.map(function(operation,index){
            console.log("index:",index,this.state.mouseEvents.OpsWithName);
            let indexOfli=index;
            return <li className="list-group-item" >
                <div className="row" style={{margin:'auto'}}>
                <div className="col-sm-4">
                    {operation.title}
                </div>
                <div style={{paddingBottom:'1.5px'}} className="col-sm-4" onMouseEnter={this.handleMouseEnterForListItem.bind(this,index)} onMouseLeave={this.handleMouseEnterForListItem.bind(this,index)}>
                    {this.renderElementDropdownForOperation(index)}
                </div>

                    <input ref={""+indexOfli} className="col-sm-4"></input>//value should be loaded by listOfNewNamesForOperations

                    </div>
            </li>;

        }.bind(this)
        );
    }

    render() {
        let styleForDiv={
            paddingTop:'15px',
            paddingBottom:'10px'
        }

        return (
            <div ref={this.props.ref} style={{backgroundColor: 'white',color:'black'}}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-6">
                            {"Select list type: "}
                        </div>
                        <div className="col-sm-6"style={styleForDiv} onMouseEnter={this.mouseEvent.bind(this,"listType")} onMouseLeave={this.mouseEvent.bind(this,"listType")}>
                            <Dropdown onCustomTypeSelect={this.onCustomTypeSelect.bind(this)} enter={this.state.mouseEvents.listType.enter} leave={this.state.mouseEvents.listType.leave} noInitial={false} onItemSelect={this.onItemSelect.bind(this)} ref="listType" items={["objectList","valueList"]} title={this.state.titleOfTheListType}/>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            {"Select operation: "}
                        </div>
                        <div className="col-sm-6"style={styleForDiv} onMouseEnter={this.mouseEvent.bind(this,"operations")} onMouseLeave={this.mouseEvent.bind(this,"operations")}>
                            <Dropdown onCustomTypeSelect={this.onCustomTypeSelect.bind(this)} enter={this.state.mouseEvents.operations.enter} leave={this.state.mouseEvents.operations.leave} noInitial={false} onItemSelect={this.onItemSelectOPeration.bind(this)} ref="operations" items={this.state.operationsForList} title={"select"}/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-2"/>
                        <div className="col-sm-8">
                            <ul className="list-group">
                                {
                                    this.renderList()
                                }
                            </ul>

                        </div>
                        <div className="col-sm-2"/>
                    </div>
                    </div>



            </div>
        );
    }

}