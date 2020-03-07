import schema     from "./schema";
import {Iterable} from "../../type/Object";

export const createDataMap = (data:any) => {

    let result = {
        keys:   '',
        values: '',
    };

    for (let key of Object.keys(schema)) {
        if (key === 'id') {
            continue;
        }

        let value = null;

        if (data.hasOwnProperty(key)) {
            value = data[key].length === 0 ? null : '"' + data[key] + '"';
        }

        result.keys   += key + ', ';
        result.values += value + ', ';
    }
        result.keys   = result.keys.slice(0, -2);
        result.values = result.values.slice(0, -2);

    return result;
};