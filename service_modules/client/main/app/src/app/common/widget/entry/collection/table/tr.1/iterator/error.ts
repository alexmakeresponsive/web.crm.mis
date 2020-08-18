const showControlLabelErrorDefault = (query) => {
  return {}
};

const showControlLabelErrorRequire = (query) => {

  let payloadId = query.component.payload.id;
  let listCollection =  query.formControls[query.component.parameters.formControlName].list[+payloadId - 1];

  let formControlId = query.component.parameters.formControlName + '_' + payloadId;

  for (let controlName of Object.keys(listCollection)) {
    if (listCollection[controlName].errors === null) {
      continue;
    }

    if (listCollection[controlName].errors.hasOwnProperty('required')) {
      for (let colName of Object.keys(query.entryComponentInstanceCollection[formControlId].parameters.body)) {
        if (!query.entryComponentInstanceCollection[formControlId].parameters.body[colName].hasOwnProperty(controlName)) {
          continue;
        }
        query.entryComponentInstanceCollection[formControlId].parameters.body[colName][controlName].errors[payloadId] = {required:true};
      }
    }
  }
};

export default {
  default: showControlLabelErrorDefault,
  require: showControlLabelErrorRequire
};
