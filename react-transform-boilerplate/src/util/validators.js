/**
 * Created by nuwantha on 10/3/16.
 */

export class validators {
    isNumber(value) {
        var reg = new RegExp("^[-]?[0-9]+[\.]?[0-9]+$");
        return reg.test(value)
    }
}
