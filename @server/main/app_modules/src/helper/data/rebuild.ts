import schema            from "../../model/ticket/schema";
import moment            from "moment";

export const idPrimaryKey = (data:any) => {

    let result:any = {};

    for (let item of data) {
        for (let key of Object.keys(item)) {
            if (schema[key] === 'DATE' && item[key]) {
                item[key] = moment(item[key]).format('YYYY-MM-DD');
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
};