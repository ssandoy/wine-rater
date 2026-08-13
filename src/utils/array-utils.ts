export const pushOrRemoveToArray = <T>(array: readonly T[], item: T): T[] => {
  const tmp = [...array];
  const exists = tmp.includes(item);
  if (exists) {
    return tmp.filter((c) => c !== item);
  } else {
    tmp.push(item);
    return tmp;
  }
};

export const isObjectInArray = (
  object: string | string[] | null | undefined,
  array: readonly string[]
): boolean => {
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
