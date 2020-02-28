export const idPrimaryKey = (data:any) => {

    let result:any = {};

    for (let item of data) {
        result[item.id] = item
    }

  return result;
};