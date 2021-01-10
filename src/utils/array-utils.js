export const pushOrRemoveToArray = (array, item) => {
  const tmp = [...array];
  const exists = tmp.includes(item);
  if (exists) {
    return tmp.filter(c => c !== item);
  } else {
    tmp.push(item);
    return tmp;
  }
};

export const isObjectInArray = (object, array) => {
  if (array.length) {
    if (object instanceof Array) {
      return array.some(data => object && object.includes(data));
    } else {
      return array.some(
        data => object && object.toLowerCase().includes(data.toLowerCase())
      );
    }
  } else {
    return true;
  }
};
