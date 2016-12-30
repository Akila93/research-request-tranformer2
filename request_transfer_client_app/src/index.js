import React from "react";
import {render} from "react-dom";
import {App} from "./App";

render(<App />, document.getElementById('root'));
//render(<div>
//        <Badge handleClick={
//
//            function(){
//                //console.log("this.props.app: ",app);
//                //app.setState({
//                //   rowOfCall:self
//                //},function(){
//                //    let parentRowLable = self.state.keyValue;
//                //
//                //    let operations=app.state.rowOfCall.props.raw.ValueFormatters[1];
//                //
//                //    let elements=[];
//                //    app.state.TableData.map(function(raw){
//                //        console.log("raw:",raw.parentRaw,parentRowLable);
//                //        if(raw.parentRaw===parentRowLable){
//                //            elements.push(raw.keyValue);
//                //        }
//                //
//                //    }.bind(app));
//                //    console.log("rowOfCall: ",app.state.rowOfCall.props.raw.ValueFormatters[1],elements);
//                //    app.refs.listModal.refs.modalBodyForList.setState(
//                //    {
//                //        operationsForList:operations,
//                //        elementForList:elements
//                //    }
//                //    );
//                //});
//
//                }
//
//                } dataToggle="modal" dataTarget="#listModal" title="format" />
//        <Modal onPreview={function(){}} submitBtnWithConfirm={false} submitButton="Preview"ref="listModal" modalId="listModal" saveChanges={function(){}} modalTitle="your input request" body={
//              function(){
//               // return <ModalBody ref="modalBodyForList" operations={["total","avg","max","min"]} elements={["value","subjectName","testDate"]}/>;
//                return <ModalBody ref="modalBodyForList" operations={["total","avg","max","min"]} elements={["value","subjectName","testDate"]}/>;
//              }.bind(this)}/>
//    </div>,
// document.getElementById('root'));

