import * as formFields from './fields';

export const f6 = (errors) => {
  console.log('ff6Validator');

  const result = [];

  for (let key of Object.keys(errors)) {
    if (Object.keys(errors.key).length !== 0 ) {
      result.push(formFields.f6.list[key].label);
    }
  }

  // return ['6.1', '6.2', '6.3'];

  return result;
};
