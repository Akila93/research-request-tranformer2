import React, {Component} from "react";
import {Dropdown} from "./dropdown";
import {Badge} from "./badge";

export class ModalBody extends Component {
    constructor(props) {
        super(props);
        let operationsForList = this.props.operations;
        let elementForList = this.props.elements;
        let titleOfTheListType = this.props.titleOfTheListType;
        this.state = {
            currentWorkingPanelIndex: -1,
            titleOfTheListType: titleOfTheListType,
            operationsForList: operationsForList,
            elementForList: elementForList,
            selectedOpsWithName: [],
            panelsExpandingStatus: [],
            mouseEvents: {
                OpsWithName: [],
                listType: {
                    enter: false,
                    leave: true
                },
                operationsDropdowns: []
            }
        };
        if (this.props.modalData) {
            console.log("typeof this.props.modalData", this.props.modalData);
            this.state = this.props.modalData;
        }


    }

    componentWillReceiveProps(nextProps) {
        if (this.props != nextProps && nextProps.modalData) {
            let nextState = nextProps.modalData;
            this.state = nextState;
            this.setState({});
        }
    }

    onItemSelect(index, title) {

        this.setState({
            titleOfTheListType: title
        });


    }

    onCustomTypeSelect() {

    }

    handleMouseEnterForListItem(index) {
        let mouseEvents = this.state.mouseEvents;
        let OpsWithName = mouseEvents.OpsWithName;
        // let operationsDropdowns=mouseEvents.operationsDropdowns;
        // console.log("listTypeWithName[index]:",OpsWithName,index);
        let enterNewStatus = !OpsWithName[index].enter;
        OpsWithName[index].enter = enterNewStatus;
        mouseEvents.OpsWithName = OpsWithName;
        this.setState({
            mouseEvents: mouseEvents
            //,operationsDropdowns:operationsDropdowns
        });
    }

    mouseEvent(element) {

        let newState = this.state;
        let mouseEvents = newState['mouseEvents'];
        let listType = mouseEvents[element];
        //console.log("element: ",element,mouseEvents[element]);
        listType.enter = !listType.enter;
        mouseEvents[element] = listType;
        newState['mouseEvents'] = mouseEvents;
        this.setState(
            newState
        );
    }

    checkPanelExistOrNot(title) {
        let newListWithName = this.state.selectedOpsWithName;
        for (const panelIndex in newListWithName) {
            let panel = newListWithName[panelIndex];
            if (panel.title == "select") {
                return "exist";
            }
        }
        return "not exist";
    }

    handleButtonAdd() {
        let newListWithName = this.state.selectedOpsWithName;
        let mouseEvents = this.state.mouseEvents;
        let mouseEventList = this.state.mouseEvents.OpsWithName;
        let operationsDropdowns = this.state.mouseEvents.operationsDropdowns;
        //check if the panel exist or not

        if (this.checkPanelExistOrNot() != "exist") {
            let listItem = {};
            listItem["title"] = "select";
            listItem["element"] = "select";
            listItem["nameForElement"] = "";
            let mouseEventForListElement = {enter: false};
            let mouseEventsForOperationDrop = {enter: false};
            mouseEventList.push(mouseEventForListElement);
            newListWithName.push(listItem);
            operationsDropdowns.push(mouseEventsForOperationDrop);


            mouseEvents.OpsWithName = mouseEventList;
            mouseEvents.operationsDropdowns = operationsDropdowns;
            this.setState({
                selectedOpsWithName: newListWithName,
                mouseEvents: mouseEvents
            });
        }
    }

    handleTyping(index) {
        let newIndex = index + "";
        let nameForElement = this.refs[newIndex].value;
        //get value by refs
        let selectedOpsWithName = this.state.selectedOpsWithName;
        let updatedElement = selectedOpsWithName[this.state.currentWorkingPanelIndex];
        updatedElement.nameForElement = nameForElement;
        selectedOpsWithName[this.state.currentWorkingPanelIndex] = updatedElement;
        this.setState({
            selectedOpsWithName: selectedOpsWithName
        });
    }

    onItemSelectElement(index, title) {
        let selectedOpsWithName = this.state.selectedOpsWithName;
        let currentWorkingPanel = selectedOpsWithName[this.state.currentWorkingPanelIndex];
        currentWorkingPanel.element = title;
        selectedOpsWithName[this.state.currentWorkingPanelIndex] = currentWorkingPanel;
        this.setState({selectedOpsWithName: selectedOpsWithName});
    }


    onCustomTypeSelectForOperation() {
        //set title  operation,name,element for selectedOpsWithName list item

    }

    renderElementDropdownForOperation(index, element) {

        if (this.state.titleOfTheListType == "objectList") {
            return <Dropdown updateOnPropsChanges="true"
                             onCustomTypeSelect={this.onCustomTypeSelectForOperation.bind(this)}
                             enter={this.state.mouseEvents.OpsWithName[index].enter}
                             leave={!this.state.mouseEvents.OpsWithName[index].enter} noInitial={false}
                             onItemSelect={this.onItemSelectElement.bind(this)} ref={"element:" + index}
                             items={this.state.elementForList} title={element}/>
        } else {
            return <div ></div>
        }
    }

    renderList() {
        return this.state.selectedOpsWithName.map(function (operation, index) {
                //console.log("index:",index,this.state.mouseEvents.OpsWithName);
                let indexOfli = index;
                return <li className="list-group-item">
                    <div className="row" style={{margin: 'auto'}}>
                        <div className="col-sm-4">
                            {operation.title}
                        </div>
                        <div style={{paddingBottom: '1.5px'}} className="col-sm-4"
                             onMouseEnter={this.handleMouseEnterForListItem.bind(this, index)}
                             onMouseLeave={this.handleMouseEnterForListItem.bind(this, index)}>
                            {this.renderElementDropdownForOperation(index)}
                        </div>
                        <input ref={"" + indexOfli} className="col-sm-4"></input>
                    </div>
                </li>;

            }.bind(this)
        );
    }

    mouseEventsForPlaneOperationDropdown(index) {
        let operationsDropdowns = this.state.mouseEvents.operationsDropdowns;
        let mouseEvents = this.state.mouseEvents;
        operationsDropdowns[index].enter = !operationsDropdowns[index].enter;
        mouseEvents.operationsDropdowns = operationsDropdowns;
        this.setState({
            mouseEvents: mouseEvents
        });
    }

    removePanel() {
        let newListWithName = this.state.selectedOpsWithName;
        let mouseEvents = this.state.mouseEvents;
        let mouseEventList = this.state.mouseEvents.OpsWithName;
        let operationsDropdowns = this.state.mouseEvents.operationsDropdowns;
        //check if the panel exist or not
        let newListCreator = function (currentList, ItemToPop) {
            let list = [];
            let newItem = "";
            while (currentList.length > 0) {
                newItem = currentList.pop();
                if (newItem == ItemToPop) {
                    continue;
                }
                list.push(newItem);
            }
            return list;

        }
        let listItem = newListWithName[this.state.currentWorkingPanelIndex];
        let mouseEventForListElement = mouseEventList[this.state.currentWorkingPanelIndex];
        let mouseEventsForOperationDrop = operationsDropdowns[this.state.currentWorkingPanelIndex];


        newListWithName = newListCreator(newListWithName, listItem);
        mouseEventList = newListCreator(mouseEventList, mouseEventForListElement);
        operationsDropdowns = newListCreator(operationsDropdowns, mouseEventsForOperationDrop);


        mouseEvents.OpsWithName = mouseEventList;
        mouseEvents.operationsDropdowns = operationsDropdowns;
        this.setState({
            selectedOpsWithName: newListWithName,
            mouseEvents: mouseEvents
        });
    }

    renderListOfPanels() {
        let self = this;
        return this.state.selectedOpsWithName.map(function (operation, index) {
                //console.log("index:",index,this.state.mouseEvents.OpsWithName);
                let indexOfli = index;
                let mouseEventHandlerForPanel = function () {
                    this.setState({currentWorkingPanelIndex: indexOfli});
                }.bind(this);
                return <div className="panel panel-default" onMouseEnter={mouseEventHandlerForPanel}>
                    <div className="row" style={{margin: 'auto'}}>
                        <div className="panel-heading" role="tab" id="headingOne">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-sm-10">
                                        <h4 className="panel-title">
                                            <a role="button" data-toggle="collapse" data-parent="#accordion"
                                               href={"#collapse" + indexOfli} aria-expanded="true"
                                               aria-controls={"collapse" + indexOfli}>
                                                {
                                                    operation.title == "select" ? "select an operation" : operation.title
                                                }
                                            </a>

                                        </h4>
                                    </div>
                                    <div className="col-sm-2"><span style={{float: 'right'}}
                                                                    onClick={this.removePanel.bind(this)}
                                                                    className=" glyphicon glyphicon-remove"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id={"collapse" + indexOfli} className="panel-collapse collapse in" role="tabpanel"
                             aria-labelledby="headingOne">
                            <div className="panel-body">
                                <div className="row" style={{
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    marginTop: 'auto',
                                    marginBottom: '10px',
                                    padding: 'auto'
                                }}>
                                    <div className="col-sm-6">
                                        {"Select operation: "}
                                    </div>
                                    <div className="col-sm-6" style={{paddingBottom: '1.5px'}}
                                         onMouseEnter={this.mouseEventsForPlaneOperationDropdown.bind(this, indexOfli)}
                                         onMouseLeave={this.mouseEventsForPlaneOperationDropdown.bind(this, indexOfli)}>
                                        <Dropdown updateOnPropsChanges="true"
                                                  onCustomTypeSelect={self.onCustomTypeSelect.bind(this)} enter={//false
                                            this.state.mouseEvents.operationsDropdowns[indexOfli].enter}
                                                  leave={!this.state.mouseEvents.operationsDropdowns[indexOfli].enter
                                                  } noInitial={false}
                                                  onItemSelect={this.handleOnItemSelectForPanel.bind(this)}
                                                  ref={"operations" + indexOfli} items={self.state.operationsForList}
                                                  title={operation.title}/>
                                    </div>
                                </div>
                                <div className="row" style={{
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    marginTop: 'auto',
                                    marginBottom: '10px',
                                    padding: 'auto'
                                }}>
                                    <div
                                        className="col-sm-6">{this.state.titleOfTheListType == "objectList" ? "select element to evaluate" : ""}</div>
                                    <div style={{paddingBottom: '1.5px'}} className="col-sm-6"
                                         onMouseEnter={this.handleMouseEnterForListItem.bind(this, index)}
                                         onMouseLeave={this.handleMouseEnterForListItem.bind(this, index)}>
                                        {this.renderElementDropdownForOperation(index, operation.element)}
                                    </div>
                                </div>
                                <div className="row" style={{margin: 'auto'}}>
                                    <div className="col-sm-6">Enter new name</div>
                                    <input ref={"" + indexOfli} onChange={this.handleTyping.bind(this, indexOfli)}
                                           className="col-sm-6" style={{margin: 'auto'}}
                                           value={operation.nameForElement}></input>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>;

            }.bind(this)
        );
    }

    handleOnItemSelectForPanel(index, title) {
        //console.log("indexOfThePanel",this.state.currentWorkingPanelIndex);
        let selectedOpsWithName = this.state.selectedOpsWithName;
        let currentWorkingPanel = selectedOpsWithName[this.state.currentWorkingPanelIndex];
        currentWorkingPanel.title = title;
        selectedOpsWithName[this.state.currentWorkingPanelIndex] = currentWorkingPanel;
        this.setState({selectedOpsWithName: selectedOpsWithName});
    }

    render() {
        //console.log("this.state",this.state);
        let styleForDiv = {
            paddingTop: '15px',
            paddingBottom: '10px'
        }

        return (
            <div ref={this.props.ref} style={{backgroundColor: 'white', color: 'black'}}>
                <div className="container-fluid">
                    <div className="container-fluid well">
                        <div className="row">
                            <div className="col-sm-6" style={styleForDiv}>
                                <div>{"Select list type: "}</div>
                            </div>
                            <div className="col-sm-6" style={styleForDiv}
                                 onMouseEnter={this.mouseEvent.bind(this, "listType")}
                                 onMouseLeave={this.mouseEvent.bind(this, "listType")}>
                                <Dropdown updateOnPropsChanges="true"
                                          onCustomTypeSelect={this.onCustomTypeSelect.bind(this)}
                                          enter={this.state.mouseEvents.listType.enter}
                                          leave={this.state.mouseEvents.listType.leave} noInitial={false}
                                          onItemSelect={this.onItemSelect.bind(this)} ref="listType"
                                          items={["objectList", "valueList"]} title={this.state.titleOfTheListType}/>
                            </div>
                        </div>
                        <div className="row">
                            <Badge handleClick={this.handleButtonAdd.bind(this)} style={{margin: '12px'}}
                                   title="Add an operation"/>
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                                {this.renderListOfPanels()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}