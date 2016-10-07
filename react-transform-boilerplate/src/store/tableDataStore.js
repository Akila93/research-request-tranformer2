/**
 * Created by nuwantha on 9/8/16.
 */
import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class TableDataStore extends EventEmitter {
    constructor() {

        super();
        this.count=1;
        this.tableData=[ ];
    }


    addTableData(keyValue,KeyFormatter,	ValueType,	ValueFormatters,handleRemoveRow,visible,parentRaw,rawVisibility,onPreview,icon,dropdownTitle,initialKey,selectedKeyFormatter,selectedValueFormatter,selectedDateInputFormatter,selectedDateOutputFormatter){
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
            rawVisibility,
            onPreview,
            icon,
            dropdownTitle,
            initialKey,
            selectedKeyFormatter,
            selectedValueFormatter,
            selectedDateInputFormatter,
            selectedDateOutputFormatter,
        });
        console.log("added TData is",this.tableData);
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

    deleteTableData(index,parentRaw,onPreview){
        //console.log(parentRaw);
        const len=this.tableData.length;
        let newTable =[];
        for(let item=0;item<len;item++){
            newTable.push(this.tableData[item]);
        }

        for(let j=0;j<len;j++){
            let raw=newTable[j];
            if(raw["keyValue"]===index){
                console.log("index is :"+j);
                console.log("inside deleteTable data"+parentRaw);
                this.rawCountOfParent(j,parentRaw);
                console.log("count is"+this.count);
                console.log("TData is",this.tableData);
                newTable.splice(j,this.count);
                console.log("now TData is",newTable);
                this.tableData=newTable;

                break;
            }
        }
        this.emit("change");
        //onPreview();


    }



    updateTableRawVisibility(parentRaw,icon){
        for (let itemNumber in this.tableData) {
            let raw=this.tableData[itemNumber];

            if(raw["parentRaw"]===parentRaw){
                if(icon==='icon-plus'){
                    this.tableData[itemNumber]["rawVisibility"]='table-row';
                    if(raw["visible"]){
                        raw["icon"]='icon-minus'
                    }
                }else{
                    this.tableData[itemNumber]["rawVisibility"]='none';
                    if(raw["visible"]){
                        raw["icon"]='icon-plus'
                    }
                }
                if(raw["visible"]){
                    this.updateTableRawVisibility(raw["keyValue"],icon);
                }

            }
        }
    }

    updateTableData(parentRaw){
        let icon;
        for (let itemNumber in this.tableData) {
            let raw = this.tableData[itemNumber];
            if(raw["keyValue"]===parentRaw){
                icon=raw["icon"]
                if(raw["icon"]==='icon-plus'){
                    raw["icon"]='icon-minus';
                }else{
                    raw["icon"]='icon-plus';
                }
                break;
            }
        }

        this.updateTableRawVisibility(parentRaw,icon);
        this.emit("change");
    }


    updateTableDataOnEdit(oldRef,newRef,selectedKeyFormatter,selectedValueFormatter,selectedDateInputFormatter,selectedDateOutputFormatter){
        for (let itemNumber in this.tableData) {
            let raw=this.tableData[itemNumber];
            console.log("raw is(updateTableDataOnEdit)",raw);
            if(raw["keyValue"]===oldRef){
                raw["keyValue"]=newRef;
                raw["selectedKeyFormatter"]=selectedKeyFormatter;
                raw["selectedValueFormatter"]=selectedValueFormatter;
                raw["selectedDateInputFormatter"]=selectedDateInputFormatter;
                raw["selectedDateOutputFormatter"]=selectedDateOutputFormatter;

                console.log("selectedKeyFormatter",selectedKeyFormatter);

                for (let itemNumber in this.tableData) {
                    let raw=this.tableData[itemNumber];
                    if(raw["parentRaw"]===oldRef){
                        raw["parentRaw"]=newRef;
                    }
                }
                break;
            }
        }

        this.emit("change");
    }

    deleteAll() {
        this.tableData = [];
        this.emit("change");
    }


    getAll() {
        return this.tableData;
    }

    handleActions(action) {
        switch(action.type) {
            case "ADD_DATA": {
                this.addTableData(action.keyValue,action.KeyFormatter,action.ValueType,action.ValueFormatters,action.handleRemoveRow,action.visible,action.parentRaw,action.rawVisibility,action.onPreview,action.icon,action.dropdownTitle,action.initialKey,action.selectedKeyFormatter,action.selectedValueFormatter,action.selectedDateInputFormatter,action.selectedDateOutputFormatter);
                console.log("dropdowntitle is inside table store",action.dropdownTitle)
                break;
            }
            case "RECEIVE_DATA": {
                this.tableData = action.tableData;
                this.emit("change");
                break;
            }
            case "DELETE_DATA":
                this.deleteTableData(action.keyValue,action.parentRaw,action.onPreview);
                break;
            case "UPDATE_DATA":
                this.updateTableData(action.parentRaw);
                break;
            case "UPDATE_DATA_ON_EDIT":
                this.updateTableDataOnEdit(action.oldRef,action.newRef,action.selectedKeyFormatter,action.selectedValueFormatter,action.selectedDateInputFormatter,action.selectedDateOutputFormatter);
                break;
            case "REMOVE_ALL":
                this.deleteAll();
                break;
        }
    }
}

const tableDataStore = new TableDataStore;
dispatcher.register(tableDataStore.handleActions.bind(tableDataStore));
export default tableDataStore;