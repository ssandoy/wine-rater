export const pushOrRemoveToArray = (array, item) => {
  const tmp = [...array];
  const exists = tmp.includes(item);
  if (exists) {
    return tmp.filter((c) => c !== item);
  } else {
    tmp.push(item);
    return tmp;
  }
};

export const isObjectInArray = (object, array) => {
  if (array.length) {
    if (Array.isArray(object)) {
      return array.some((data) => object?.includes(data));
    } else {
      return array.some((data) =>
        object?.toLowerCase().includes(data.toLowerCase())
      );
    }
  } else {
    return true;
  }
};
