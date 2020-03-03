import * as formFields from './fields';

export const f6 = (group) => {
  const result = [];

  for (let key of Object.keys(group.controls)) {
    if (group.controls[key]['errors'] !== null) {
      result.push(formFields.fields.f6.list[key].label);
    }
  }

  return result;
};

