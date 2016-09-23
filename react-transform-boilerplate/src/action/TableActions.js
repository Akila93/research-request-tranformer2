/**
 * Created by nuwantha on 9/8/16.
 */
import dispatcher from "../dispatcher";


export function addTableData(keyValue,KeyFormatter,	ValueType,	ValueFormatters,handleRemoveRow,visible,parentRaw,rawVisibility) {
    dispatcher.dispatch({
        type: "ADD_DATA",
        keyValue,
        KeyFormatter,
        ValueType,
        ValueFormatters,
        handleRemoveRow,
        visible,
        parentRaw,
        rawVisibility
    });
}

export function deleteTableData(keyValue,parentRaw) {
    console.log("parentRawIs"+parentRaw);
    dispatcher.dispatch({
        type: "DELETE_DATA",
        keyValue,
        parentRaw,
    });
}
export function updateTableData(parentRaw) {
        console.log("inside the action"+parentRaw);
        dispatcher.dispatch({
            type: "UPDATE_DATA",
            parentRaw,
        });
}

