/**
 * Created by nuwantha on 9/8/16.
 */
import dispatcher from "../dispatcher";


export function addTableData(keyValue,KeyFormatter,	ValueType,	ValueFormatters,handleRemoveRow,visible,parentRaw,rawVisibility,onPreview,icon,dropdownTitle,initialKey,selectedKeyFormatter,selectedValueFormatter,selectedDateInputFormatter,selectedDateOutputFormatter,rowColor,currentPaddingForLeft) {
    dispatcher.dispatch({
        type: "ADD_DATA",
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
        rowColor,
        currentPaddingForLeft
    });
}



export function deleteTableData(keyValue,parentRaw,onPreview) {
    console.log("parentRawIs"+parentRaw);
    dispatcher.dispatch({
        type: "DELETE_DATA",
        keyValue,
        parentRaw,
        onPreview
    });
}



export function updateTableData(parentRaw) {
        console.log("inside the action"+parentRaw);
        dispatcher.dispatch({
            type: "UPDATE_DATA",
            parentRaw
        });
}


export function updateTableDataOnEdit(oldRef,newRef,selectedKeyFormatter,selectedValueFormatter,selectedDateInputFormatter,selectedDateOutputFormatter) {
    console.log("inside the action:refs:",oldRef,newRef,selectedKeyFormatter,selectedValueFormatter);
    dispatcher.dispatch({
        type: "UPDATE_DATA_ON_EDIT",
        oldRef,
        newRef,
        selectedKeyFormatter,
        selectedValueFormatter,
        selectedDateInputFormatter,
        selectedDateOutputFormatter,
    });


}
export function deleteAll() {
    dispatcher.dispatch({
        type: "REMOVE_ALL"
    });
}

