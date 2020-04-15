
/**
 * Clone
 *
 * @param  {object} array
 * @return {object}
 */
Array.clone = function clone(array) {
  return array.slice();
};

/**
 * Deep clone
 *
 * @param  {object} array
 * @return {object}
 */
Array.cloneDeep = function cloneDeep(array) {
  return array.map(item => {
    if (Array.isArray(item)) {
      return Array.cloneDeep(item);
    } else if (Object.isObject(item)) {
      return Object.cloneDeep(item);
    }

    return item;
  });
};

/**
 * Move an array item by index
 *
 * @param  {object} array
 * @param  {string} oldIndex
 * @param  {string} newIndex
 * @return {object}
 */
Array.move = function move(array, oldIndex, newIndex) {
  const newarray = array;
  if (newIndex >= newarray.length) {
    let k = newIndex - newarray.length;

    while (k-- + 1) {
      newarray.push(undefined);
    }
  }

  const item = newarray[newIndex];

  newarray[newIndex] = newarray[oldIndex];
  newarray[oldIndex] = item;

  return newarray;
};
