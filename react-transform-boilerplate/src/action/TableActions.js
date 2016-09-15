/**
 * Created by nuwantha on 9/8/16.
 */
import dispatcher from "../dispatcher";


export function addTableData(keyValue,formatter) {
    dispatcher.dispatch({
        type: "ADD_DATA",
        keyValue,
        formatter,
    });
}

export function deleteTableData(keyValue) {
    dispatcher.dispatch({
        type: "DELETE_DATA",
        keyValue,
    });

}

