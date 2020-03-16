const getControlLabelErrorDefault = (query) => {
  let result = [];

  for (let id of Object.keys(query.list)) {
    for (let controlName of Object.keys(query.list[id])) {
      if (query.list[id][controlName].errors === null) {
        continue;
      }

      let resultId = +id + 1;
      let formControlId = query.key + '_' + resultId;

      if (query.list[id][controlName].errors !== null) {
        for (let colName of Object.keys(query.entryComponentInstanceCollection[formControlId].parameters.body)) {
          if (!query.entryComponentInstanceCollection[formControlId].parameters.body[colName].hasOwnProperty(controlName)) {
            continue;
          }

          result.push(query.entryComponentInstanceCollection[formControlId].parameters.body[colName][controlName].label);
        }
      }
    }
  }

  return result;
};

const getControlLabelErrorRequire = (query) => {

  let result = {};

  for (let id of Object.keys(query.list)) {
    for (let controlName of Object.keys(query.list[id])) {
      if (query.list[id][controlName].errors === null) {
        continue;
      }

      let resultId = +id + 1;
      let formControlId = query.key + '_' + resultId;

      let resultKey     = controlName + '_' + resultId;

      if (query.list[id][controlName].errors.required) {
        for (let colName of Object.keys(query.entryComponentInstanceCollection[formControlId].parameters.body)) {
          if (!query.entryComponentInstanceCollection[formControlId].parameters.body[colName].hasOwnProperty(controlName)) {
            continue;
          }
          result[resultKey] = query.entryComponentInstanceCollection[formControlId].parameters.body[colName][controlName].label
        }
      }
    }
  }

  return result;
};

export default {
  default: getControlLabelErrorDefault,
  require: getControlLabelErrorRequire
};
