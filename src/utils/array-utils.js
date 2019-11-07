export const pushOrRemoveToArray = (array, item) => {
  const exists = array.includes(item);
  if (exists) {
    return array.filter(c => {
      return c !== item;
    });
  } else {
    const result = array;
    result.push(item);
    return result;
  }
};

export const isObjectInArray = (object, array) => {
  if (array.length) {
    if (object instanceof Array) {
      return array.some(data => object && object.includes(data.toLowerCase()));
    } else {
      return array.some(
        data => object && object.toLowerCase().includes(data.toLowerCase())
      );
    }
  } else {
    return object;
  }
};

// TODO consider to move to object-utils..
export const getKeyByValue = (object, value) => {
  return Object.keys(object).find(key => object[key] === value);
};
