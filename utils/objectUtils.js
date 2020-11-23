export const arrToObj = (arrayValue = [], keyField) => {
  const obj = {};
  arrayValue.forEach((value, index) => {
    obj[keyField ? value[keyField] : index] = value;
  });
  return obj;
};

export const objToArr = (objValue = {}, keyField = 'key') => Object.keys(objValue)
  .map(key => ({
    ...objValue[key],
    [keyField]: key,
  }));
