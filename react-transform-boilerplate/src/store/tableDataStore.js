/**
 * Created by nuwantha on 9/8/16.
 */
import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class TableDataStore extends EventEmitter {
    constructor() {

        super();
        this.count=1;
        this.tableData=[
            //{
            //    keyValue: "fname",
            //    KeyFormatter:
            //        [
            //            "toupper",
            //            "tolower",
            //            "camalCase"
            //        ],
            //    ValueType: ["String"],
            //    ValueFormatters: [
            //        [
            //            "toupper",
            //            "tolower",
            //            "camalCase"
            //        ]
            //    ],
            //
            //    preview: "preveiw"
            //
            //
            //},
            //{
            //    keyValue: "lname",
            //    KeyFormatter:
            //        [
            //            "toupper",
            //            "tolower",
            //            "camalCase"
            //        ],
            //    ValueType: ["String","date"],
            //    ValueFormatters:[
            //        [
            //            "toupper",
            //            "tolower",
            //            "camalCase"
            //        ],
            //        [
            //            "long",
            //            "short",
            //            "median"
            //        ]
            //    ],
            //    preview: "preveiw"
            //
            //}
        ];
    }


    addTableData(keyValue,KeyFormatter,	ValueType,	ValueFormatters,handleRemoveRow,visible,parentRaw,rawVisibility){
        console.log("parent raw is : "+parentRaw);
        for(let i=0;i<this.tableData.length;i++){
            if(this.tableData[i].keyValue==keyValue){
                return;
            }
        }
        this.tableData.push({
            keyValue,
            KeyFormatter,
            ValueType,
            ValueFormatters,
            handleRemoveRow,
            visible,
            parentRaw,
            rawVisibility
        });
        this.emit("change");

    }

    rawCountOfParent(index,parentRaw){

        console.log(parentRaw);
        for (let i=index;i<this.tableData.length;i++) {

            let raw=this.tableData[i];
            console.log(raw["parentRaw"] === parentRaw);
            if(raw["parentRaw"] === parentRaw){
                console.log(parentRaw);
                this.count++;
                if(raw["visible"]){
                    this.rawCountOfParent(i+1,raw["keyValue"])
                }
            }


        }

    }

    deleteTableData(index,parentRaw){
        console.log(parentRaw);
        for(let j=0;j<=this.tableData.length;j++){
            let raw=this.tableData[j];
            if(raw["keyValue"]===index){
                console.log("index is :"+j);
                console.log("inside deleteTable data"+parentRaw);
                this.rawCountOfParent(j,parentRaw);
                console.log("count is"+this.count);
                this.tableData.splice(j,this.count);
                console.log(this.tableData);
                this.emit("change");
                break;
            }
        }

    }


    updateTableData(parentRaw){

        for (let itemNumber in this.tableData) {

            console.log(itemNumber);
            console.log(this.tableData[itemNumber]);
            let raw=this.tableData[itemNumber];
            if(raw["parentRaw"]===parentRaw){

                if(raw["rawVisibility"]==='none'){
                    this.tableData[itemNumber]["rawVisibility"]='table-row';
                }else{
                    this.tableData[itemNumber]["rawVisibility"]='none';
                }

                console.log(raw["parentRaw"]["visible"]);
                if(raw["visible"]){
                    this.updateTableData(raw["keyValue"])
                }

                console.log("equality is match");
                console.log(this.tableData[itemNumber]);

            }
        }

        this.emit("change");
        console.log("new function working :"+parentRaw);
    }

    getAll() {
        return this.tableData;
    }

    handleActions(action) {
        switch(action.type) {
            case "ADD_DATA": {
                this.addTableData(action.keyValue,action.KeyFormatter,	action.ValueType,	action.ValueFormatters,action.handleRemoveRow,action.visible,action.parentRaw,action.rawVisibility);
                break;
            }
            case "RECEIVE_DATA": {
                this.tableData = action.tableData;
                this.emit("change");
                break;
            }
            case "DELETE_DATA":
                this.deleteTableData(action.keyValue,action.parentRaw);
                break;
            case "UPDATE_DATA":
                this.updateTableData(action.parentRaw);
                break;
        }
    }
}

const tableDataStore = new TableDataStore;
dispatcher.register(tableDataStore.handleActions.bind(tableDataStore));
export default tableDataStore;