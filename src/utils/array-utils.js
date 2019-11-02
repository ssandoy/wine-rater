export const pushOrRemoveToArray = (array, item) => {
	const exists = array.includes(item);
	if (exists) {
		return array.filter((c) => {
			return c !== item;
		})
	} else {
		const result = array;
		result.push(item);
		return result;
	}
};