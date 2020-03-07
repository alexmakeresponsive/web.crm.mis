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

            // for undefined, null, other...
                value = null;

            if(data[key] === true) {
                value = '1';
            }
            if(data[key] === false) {
                value = '0';
            }
            if(typeof data[key] === 'string') {
                value = data[key].length !== 0 ? '"' + data[key] + '"' : null;
            }
            if(typeof data[key] === 'number') {
                value = '"' + data[key] + '"';
            }
        }

        result.keys   += key + ', ';
        result.values += value + ', ';
    }
        result.keys   = result.keys.slice(0, -2);
        result.values = result.values.slice(0, -2);

    return result;
};