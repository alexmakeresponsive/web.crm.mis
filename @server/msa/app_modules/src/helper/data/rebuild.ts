export const idPrimaryKey = (data:any) => {

    let result:any = {};

    for (let item of data) {
        for (let key of Object.keys(item)) {
            if (!item[key] && typeof item[key] !== 'number') {
                item[key] = '';
            }
        }

        result[item.id] = item
    }

  return result;
};