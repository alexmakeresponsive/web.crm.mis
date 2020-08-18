import schema from "../../model/dc/protocol/schema";
import moment from "moment";

import {injectable} from "tsyringe";

@injectable()
export class factoryDataKey
{
    public addKey(data:any)
    {
        let result:any = {};

        for (let item of data) {
            for (let key of Object.keys(item)) {
                if (schema[key] === 'DATETIME' && item[key]) {
                    item[key] = moment(item[key]).format('YYYY-MM-DD HH:mm');
                    continue;
                }
                if (!item[key] && typeof item[key] !== 'number') {
                    item[key] = '';
                    continue
                }
            }

            result[item.id] = item
        }

        return result;
    }
}