/**
 * Created by nuwantha on 9/8/16.
 */
import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class TableDataStore extends EventEmitter {
    constructor() {
        super()
        this.tableData=[
            {
                keyValue: "fname",
                types: ["String"],
                formatters: [
                    [
                        "convertToUpper",
                        "convertFirstLetterToUpper",
                        "convertToLower"
                    ]
                ]


            },
            {
                keyValue: "birthday",
                types: ["String","Date"],
                formatters:[
                    [
                        "convertToUpper",
                        "convertFirstLetterToUpper",
                        "convertToLower"
                    ],
                    [
                        "dd-MM-yy",
                        "dd-MM-yy",
                        "MM-dd-yyyy",
                        "yyyy-MM-dd",
                        "yyyy-MM-dd HH:mm:ss",
                        "yyyy-MM-dd HH:mm:ss.SSS"
                    ]
                ]

            }
        ];
    }


    addTableData(keyValue,formatter){
        this.tableData.push({
            keyValue,
           formatter
        });
        this.emit("change");
    }
    deleteTableData(index){
        this.tableData.splice(index,1);
        this.emit("change");
    }


    getAll() {
        return this.tableData;
    }

    handleActions(action) {
        switch(action.type) {
            case "ADD_DATA": {
                this.addTableData(action.keyValue,action.formatter);
                break;
            }
            case "RECEIVE_DATA": {
                this.tableData = action.tableData;
                this.emit("change");
                break;
            }
            case "DELETE_DATA":
                this.deleteTableData(action.keyValue);
                break;
        }
    }
}



const tableDataStore = new TableDataStore;
dispatcher.register(tableDataStore.handleActions.bind(tableDataStore));
export default tableDataStore;
