/**
 * Created by nuwantha on 9/7/16.
 */
import React from "react";
import {Dropdown} from "./dropdown";
import {RowCell} from "./RowCell";
import * as TableAction from "../action/TableActions";
import {Badge} from "./badge";
//import * as EventHandlers from './util/eventHandlers';
//import * as Callbacks from './util/callbackFunctions';

export class TableRaw extends React.Component {
    constructor(props) {
        super(props);
        let self = this;
        let i = this.initialIndexOfSelected(self);
        //console.log("index: ",i,this.props.raw.ValueFormatters[i]);

        this.state = {
            selected: false,
            indexSelected: -1,
            formatters: props.raw.formatters,
            visibility: this.props.raw.rawVisibility,
            triggerNoInitial: false,
            editClicked: false,
            keyValue: this.props.raw.keyValue,
            icon: "icon-minus",
            removeVisible: false,
            typeTriggered: false,
            overTheSkip: false,
            overTheExpan: false,
            overEdit: false,
            removeChecked: false,
            overTheEdit: false,
            selectedKeyFormatter: "",
            selectedValueFormatter: "",
            selectedDateInputFormatter: "",
            selectedDateOutputFormatter: "",
            selectedListvalueInputFormat: "",
            dropdownTitle: this.props.raw.dropdownTitle,
            firstRender: true
        };
        this.setState({
            selected: false,
            indexSelected: -1,
            formatters: props.raw.formatters,
            triggerNoInitial: true,
            editClicked: false,
            keyValue: this.props.raw.keyValue,
            removeVisible: false,
            typeTriggered: false,
            overTheSkip: false,
            overTheExpan: false,
            overEdit: false,
            removeChecked: false,
            overTheEdit: false,
            editVisible: false,
            firstRender: true
        });
        this.countOfLists = 0;
        this.handleCollapse = this.handleCollapse.bind(this);
        this.updateStateValue = this.updateStateValue.bind(this);
        this.renderDropDownList = this.renderDropDownList(this);
    }

    initialIndexOfSelected(self) {
        let types = self.props.raw.ValueType;
        for (let x = 0; x < types.length; x++) {

            if (types[x] == self.props.raw.dropdownTitle) {//
                return x;
            }
        }

    }


    loadFormattersOnSelect(indexSelected, title) {
        this.setState({indexSelected: indexSelected, triggerNoInitial: false, typeTriggered: true, dropdownTitle: ""});
    }


    onSelect(indexSelected, title) {
        this.setState({
            editVisible: false
        }, function () {
            this.props.raw.onPreview(title, this.refs.seconedCell.refs.type.state.title);
        }.bind(this));
    }


    handleRemoveRow() {
        TableAction.deleteTableData(this.props.raw.keyValue, this.props.raw.keyValue, this.props.raw.onPreview);
    }

    handleChecked() {
        this.setState({
            removeChecked: !this.state.removeChecked
        }, function () {
            this.props.raw.onPreview();
        }.bind(this));
    }

    handleCollapse() {
        TableAction.updateTableData(this.props.raw.keyValue);
    }

    /////////////////////////////////////////////////////////////////

    updateStateValueSupportForLists(key, obj) {

        let newObj = {};
        if (obj instanceof Array) {
            let elemenOfTheArray;
            for (const i in  obj) {
                elemenOfTheArray = obj[i];
                if (typeof  elemenOfTheArray == "object") {
                    this.updateStateValueSupportForLists(key, elemenOfTheArray);
                }
            }

        }
        for (const v in obj) {
            if (v != key) {
                //let title=this.props.app.refs.tableData.refs[v].refs.type.state.title;
                if (typeof obj[v] === "string") {//need to change
                    newObj[v] = obj[v];
                } else {
                    newObj[v] = this.updateStateValue(key, obj[v]);
                }
            } else {
                newObj[this.state.keyValue] = obj[v];
            }
        }

        return newObj;
    }


////////////////////////////////////////////////////////////////
    updateStateValue(key, obj) {
        ///not supported for list
        let newObj = {};

        for (const v in obj) {
            if (v != key) {
                //let title=this.props.app.refs.tableData.refs[v].refs.type.state.title;
                if (typeof obj[v] === "string") {//need to change
                    newObj[v] = obj[v];
                } else {
                    newObj[v] = this.updateStateValue(key, obj[v]);
                }
            } else {
                newObj[this.state.keyValue] = obj[v];
            }
        }

        return newObj;
    }

    onCustomTypeSelect() {
        this.setState({editVisible: true}, function () {
            this.handleEditClick();
        }.bind(this));

    }

    handleEditClick() {
        this.setState({
            editClicked: !this.state.editClicked
        }, function () {
            let obj = this.props.app.state.inputTextObject;
            console.log("this.props.app.state.inputTextObject: ", this.props.app.state.inputTextObject);
            let newObj = this.updateStateValueSupportForLists(this.props.raw.keyValue, obj);
            let self = this;
            TableAction.updateTableDataOnEdit(this.props.raw.keyValue, this.state.keyValue, this.state.selectedKeyFormatter, this.state.selectedValueFormatter, this.state.selectedDateInputFormatter, this.state.selectedDateOutputFormatter);
        }.bind(this));
    }

    handleTyping() {
        console.log("titleOfTheListType: ", this.refs, this.props.app.refs.listModal.refs.modalBodyForList.state.titleOfTheListType);

        if (this.refs.seconedCell.refs.type.state.title == "List") {
            this.setState({
                keyValue: this.refs.editKey.value,
                selectedKeyFormatter: this.refs.firstCell.refs.keyformatter.state.title,
                selectedValueFormatter: "nothing",
                selectedListvalueInputFormat: this.props.app.refs.listModal.refs.modalBodyForList.state.titleOfTheListType
            });
        } else {
            this.setState({
                keyValue: this.refs.editKey.value,
                selectedKeyFormatter: this.refs.firstCell.refs.keyformatter.state.title,
                selectedValueFormatter: this.refs.thiredCell.refs.formatter ? this.refs.thiredCell.refs.formatter.state.title : "",
                selectedDateInputFormatter: this.refs.thiredCell.refs.inputFormatter ? this.refs.thiredCell.refs.inputFormatter.state.title : "",
                selectedDateOutputFormatter: this.refs.thiredCell.refs.outputFormatter ? this.refs.thiredCell.refs.outputFormatter.state.title : "",
            });
        }
    }


    renderCheckBox(self) {
        //overTheSkip
        let onOverStyles = {backgroundColor: 'black', color: 'white', margin: 'auto'};
        let onOutStyles = {background: 'transparent', color: 'black', margin: 'auto'};
        //style={{margin:'auto'}}
        let classN = "";
        if (this.state.overTheSkip) {
            return <td width="10%">
                <span style={onOverStyles} data-toggle="tooltip" data-placement="bottom"
                      title="select checkbox for remove them from output" className="badge"
                      onMouseOut={self.handleRemoveMouse.bind(self, false)}>
                    <span className={"glyphicon glyphicon-" + (this.state.removeChecked ? "check" : "unchecked")}
                          onMouseOver={self.handleRemoveMouse.bind(self, true)}
                          onClick={this.handleChecked.bind(this)}/>
                </span></td>
        }
        return <td width="10%"><span style={onOutStyles} data-toggle="tooltip" data-placement="bottom"
                                     title="select checkbox for remove them from output" className="badge"
                                     onMouseOut={self.handleRemoveMouse.bind(self, false)}>
            <span className={"glyphicon glyphicon-" + (this.state.removeChecked ? "check" : "unchecked")}
                  onMouseOver={self.handleRemoveMouse.bind(self, true)} onClick={this.handleChecked.bind(this)}/>
                </span></td>
    }

    renderEdit() {
        if (this.state.editVisible) {
            return <span className="glyphicon glyphicon-edit" onClick={this.handleEditClick.bind(this)}/>
        }
        return <span/>
    }

    renderRowLabels(self) {
        let styleForSpan = {backgroundColor: 'black', color: 'white'};
        let styleforIndent = {textIndent: '0%'};
        let paddingStyle = {
            paddingTop: '10px',
            paddingBottom: '10px',
            paddingLeft: '0%'
        };

        paddingStyle["paddingLeft"] = this.props.raw.currentPaddingForLeft;
        if (this.state.editClicked) {

            return <td className={"noBorderLeft"} style={styleforIndent}>
                <div className="input-group table-row-cell" style={paddingStyle}>
                    <input onChange={this.handleTyping.bind(this)} title={this.state.keyValue}
                           value={this.state.keyValue} ref="editKey" type="text" className="form-control"
                           placeholder={this.props.raw.keyValue}/>
                    <span onClick={this.handleEditClick.bind(this)}><span className="glyphicon glyphicon-floppy-saved"/>
                    </span>
                </div>
            </td>
        }
        return <td className={"noBorderLeft"} style={styleforIndent}>
            <div className="input-group table-row-cell" style={paddingStyle}>
                <div className="container-fluid">
                    <div clssName="row">{this.state.keyValue}</div>
                    <div clssName="row">{this.renderEdit()}</div>
                </div>
            </div>
        </td>
    }


    handleRemoveMouse(status) {
        this.setState({overTheSkip: status});
    }


    handleExpanMouse(status) {
        this.setState({overTheExpan: status});
    }


    renderRemove(self) {
        if (this.state.removeVisible) {
            let classN = "";
            if (this.state.overTheSkip) {
                classN = " red";
            } else {
                classN = " gray";
            }
            return <td width="10%"><span onMouseOver={self.handleRemoveMouse.bind(self, true)}
                                         onMouseOut={self.handleRemoveMouse.bind(self, false)}
                                         className={"glyphicon glyphicon-remove-sign mysize" + classN}
                                         onClick={this.handleRemoveRow.bind(this)}/></td>
        }
        return <td width="10%"></td>
    }

    removeBtnVisible(status) {

        this.setState({removeVisible: status});
    }


    renderDropDownList() {
        let formatTypeColum;
        if (this.state.indexSelected === 2) {
            let items = this.state.indexSelected >= 0 ? this.props.raw.ValueFormatters[this.state.indexSelected] : [];
            let options = [
                {
                    noInitial: this.state.triggerNoInitial,
                    onItemSelect: this.onSelect.bind(this),
                    ref: "inputFormatter",
                    items: inputFormatterItems,
                    lable: "Input Formatter :"
                },
                {
                    noInitial: this.state.triggerNoInitial,
                    onItemSelect: this.onSelect.bind(this),
                    ref: "outputFormatter",
                    items: inputFormatterItems,
                    lable: "Output Formatter :"
                }
            ];
            formatTypeColum = <RowCell options={options}/>

        } else {
            formatTypeColum =
                <td><Dropdown noInitial={this.state.triggerNoInitial} onItemSelect={this.onSelect.bind(this)}
                              ref="formatter"
                              items={this.state.indexSelected >= 0 ? this.props.raw.ValueFormatters[this.state.indexSelected] : []}
                              title="select"/></td>;
        }
        return formatTypeColum;
    }

    renderExpantionCol(self) {
        let styleForSpan = {backgroundColor: 'black', color: 'white', margin: 'auto'};
        let classN = "";

        if (this.state.overTheExpan) {
            classN = " blue";
        } else {
            classN = " gray";
        }


        let firstColume;
        if (this.props.raw.visible) {
            if (this.state.overTheExpan) {
                firstColume = <td className={"noBorderRight"}>
                        <span style={styleForSpan} data-toggle="tooltip" data-placement="bottom" title="expan"
                              className="badge" onMouseOut={self.handleExpanMouse.bind(self, false)}>
                            <span className={"glyphicon glyph" + this.props.raw.icon + classN}
                                  onClick={this.handleCollapse.bind(this)}/>
                        </span>
                </td>;
            } else {
                firstColume = (<td className={"noBorderRight"}>
                    <span className="badge" style={{background: 'transparent', margin: 'auto'}}>
                        <span
                            onMouseOver={self.handleExpanMouse.bind(self, true)} /*onMouseOut={self.handleExpanMouse.bind(self,false)}*/
                            className={"glyphicon glyph" + this.props.raw.icon + classN}
                            onClick={this.handleCollapse.bind(this)}/>
                    </span>
                </td>);
            }
        } else {
            firstColume = <td className={"noBorderRight"}></td>
        }
        return firstColume;
    }

    renderThiredCell(self, items) {


        let optionsForDateType =
            [
                {
                    noInitial: self.state.triggerNoInitial,
                    onItemSelect: self.onSelect.bind(self),
                    ref: "inputFormatter",
                    items: items,
                    lable: "Input Formatter :",
                    title: self.props.raw.selectedDateInputFormatter,
                },
                {
                    noInitial: self.state.triggerNoInitial,
                    onItemSelect: self.onSelect.bind(self),
                    ref: "outputFormatter",
                    items: items,
                    lable: "Output Formatter :",
                    title: self.props.raw.selectedDateOutputFormatter,
                }
            ];
        let optionsForOtherTypes =
            [
                {
                    noInitial: self.state.triggerNoInitial,
                    onItemSelect: self.onSelect.bind(self),
                    ref: "formatter",
                    items: items,
                    lable: "",
                    title: self.props.raw.selectedValueFormatter,
                }
            ];
        let formatTypeColum;


        if (this.props.raw.dropdownTitle == 'List') {

            let app = this.props.app;
            let getStatus = function (keyValue, listType) {
                if (listType == "valueList") {
                    return true;
                }
                let elements = [];
                app.state.TableData.map(function (raw) {
                    //console.log("raw:",raw.parentRaw,parentRowLable,raw);
                    if (raw.parentRaw === keyValue) {
                        if (raw.dropdownTitle === "Number") {
                            elements.push(raw.initialKey);
                        }
                    }

                }.bind(app));
                if (elements.length == 0) {
                    return false;
                }
                return true;
            };

            this.countOfLists++;
            let dataTarget = "#listModal" + this.props.raw.keyValue;
            let iconName="glyphicon glyphicon-menu-hamburger";
            if(this.props.raw.modalData.selectedOpsWithName.length===0){
                iconName="";
            }

            formatTypeColum = <td><Badge disabled={!getStatus(self.state.keyValue, self.props.raw.titleOfTheListType)}
                                         style={{background: 'transparent', textAlign: 'left' ,border:'solid',borderWidth:'0.6px'}}
                                         iconClassName={iconName}
                                         dataId={this.countOfLists}
                                         handleClick={
                                             function () {
                                                 app.setState({
                                                     rowOfCall: self
                                                 }, function () {
                                                     let parentRowLable = self.state.keyValue;

                                                     let operations = app.state.rowOfCall.props.raw.ValueFormatters[1];
                                                     let titleOfTheListType = app.state.rowOfCall.props.raw.titleOfTheListType;
                                                     //let selectedModalData="this.props.raw.modalData";

                                                     let elements = [];


                                                     let selectedModalData = {
                                                         currentWorkingPanelIndex: -1,
                                                         titleOfTheListType: titleOfTheListType,
                                                         operationsForList: operations,
                                                         elementForList: elements,
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

                                                     app.state.TableData.map(function (raw) {

                                                         if (raw.keyValue === parentRowLable) {
                                                             selectedModalData.currentWorkingPanelIndex = raw.modalData.currentWorkingPanelIndex;
                                                             //selectedModalData.titleOfTheListType=raw.modalData.titleOfTheListType;
                                                             {/*selectedModalData.operationsForList=raw.modalData.titleOfTheListType;*/
                                                             }
                                                             selectedModalData.selectedOpsWithName = raw.modalData.selectedOpsWithName;
                                                             selectedModalData.panelsExpandingStatus = raw.modalData.panelsExpandingStatus;
                                                             selectedModalData.mouseEvents = raw.modalData.mouseEvents;
                                                         }
                                                     }.bind(app));

                                                     console.log("484", selectedModalData);
                                                     console.log("484", selectedModalData);
                                                     app.state.TableData.map(function (raw) {
                                                         //console.log("raw:",raw.parentRaw,parentRowLable,raw);
                                                         if (raw.parentRaw === parentRowLable) {
                                                             console.log("raw.parentRaw: ", raw.parentRaw);
                                                             if (raw.dropdownTitle === "Number") {
                                                                 elements.push(raw.initialKey);
                                                             }
                                                         }

                                                     }.bind(app));
                                                     console.log("line 497", selectedModalData);

                                                     console.log("rowOfCall: ", app.state.rowOfCall.props.raw.ValueFormatters[1], elements, titleOfTheListType);
                                                     app.refs.listModal.refs.modalBodyForList.setState(
                                                         {
                                                             titleOfTheListType: titleOfTheListType,
                                                             operationsForList: operations,
                                                             elementForList: elements
                                                         }
                                                         , function () {
                                                             app.setState({selectedModalData: selectedModalData});
                                                         }
                                                     );
                                                 });

                                             }

                                         } dataToggle="modal" dataTarget="#listModal" title="Add Aggregate Operation "/></td>;

        } else if (self.state.indexSelected === 3 || self.state.dropdownTitle == "Date") {

            formatTypeColum = <RowCell onCustomTypeSelect={this.onCustomTypeSelect.bind(this)} ref="thiredCell"
                                       mouseEventToElement={true} onItemSelect={self.onSelect.bind(self)}
                                       options={optionsForDateType}/>

        } else {

            formatTypeColum = <RowCell onCustomTypeSelect={this.onCustomTypeSelect.bind(this)} ref="thiredCell"
                                       mouseEventToElement={false} onItemSelect={self.onSelect.bind(self)}
                                       options={optionsForOtherTypes}/>;
        }

        return formatTypeColum;
    }


    renderCellOneTwo(self, ops, reffer, onSelect) {
        return <RowCell onCustomTypeSelect={this.onCustomTypeSelect.bind(this)} ref={reffer} mouseEventToElement={false}
                        onItemSelect={onSelect.bind(self)} options={ops}/>;
    }


    render() {
        let self = this;
        let backColor = '#' + (this.props.raw.rowColor ? 'dde3e6' : 'd7f9f7');
        let divStyle = {
            backgroundColor: backColor,
            display: this.props.raw.rawVisibility

        };


        let items = this.state.indexSelected >= 0 ? this.props.raw.ValueFormatters[this.state.indexSelected] : this.props.raw.ValueFormatters[self.initialIndexOfSelected(self)];

        let opsForRowCell1 = [
            {
                noInitial: undefined,
                ref: "keyformatter",
                items: self.props.raw.KeyFormatter,
                lable: "",
                title: self.props.raw.selectedKeyFormatter
            }];


        let opsForRowCell2 = [{
            noInitial: undefined,
            ref: "type",
            items: self.props.raw.ValueType,
            lable: "",
            title: self.props.raw.dropdownTitle,
        }
        ];


        return (
            <tr onMouseLeave={this.removeBtnVisible.bind(this, false)}
                onMouseEnter={this.removeBtnVisible.bind(this, true)} colSpan="3" ref={this.props.raw.keyValue}
                className={this.state.selected ? "active" : ""} key={this.props.raw.keyValue  }
                style={divStyle }  /*onClick={this.handleSelect.bind(this)}*/>

                {this.renderExpantionCol(self)}
                {this.renderRowLabels(self)}
                {this.renderCellOneTwo(self, opsForRowCell1, "firstCell", this.onSelect)}
                {this.renderCellOneTwo(self, opsForRowCell2, "seconedCell", this.loadFormattersOnSelect)}
                {this.renderThiredCell(self, items)}
                {this.renderCheckBox(self)}


            </tr>
        );
    }
}
