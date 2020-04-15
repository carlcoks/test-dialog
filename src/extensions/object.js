import _ from 'lodash';

/**
 * Clone
 *
 * @param  {object} object
 * @return {object}
 */
Object.clone = _.clone;

/**
 * Deep clone
 *
 * @param  {object} object
 * @return {object}
 */
Object.cloneDeep = _.cloneDeep;

/**
 * Merge
 *
 * @param  {object} args
 * @return {object}
 */
Object.merge = function merge(...args) {
  return _.assign({}, ...args);
};

/**
 * Deep merge
 *
 * @param  {object} args
 * @return {object}
 */
Object.mergeDeep = function mergeDeep(...args) {
  return _.merge({}, ...args);
};

/**
 * Is a non-null and non-array object.
 *
 * @param  {object}  object
 * @return {boolean}
 */
Object.isObject = function isObject(object) {
  return typeof object === 'object'
    && !Array.isArray(object)
    && !!object;
};

/**
 * Clone an object by model that
 * mean exclude not existed the
 * model fields and use default
 * values provided by model.
 *
 * @param  {object}  model
 * @param  {object}  object
 * @param  {boolean} useDefaults To use default values
 * @return {object}
 */
Object.cloneByModel = function cloneByModel(model, object, useDefaults = true) {
  const modelClone = Object.cloneDeep(model);
  const objectClone = Object.clone(object);

  Object.keys(modelClone).forEach(key => {
    if (!modelClone.hasOwnProperty(key)) {
      return;
    }

    if (key in objectClone) {
      modelClone[key] = objectClone[key];

    } else if (!useDefaults) {
      delete modelClone[key];
    }
  });

  return modelClone;
};

/**
 * Deep clone an objects by model
 * that mean exclude not existed
 * the model fields and use
 * default values provided
 * by model.
 *
 * @param  {object}  model
 * @param  {object}  object
 * @param  {boolean} useDefaults To use default values
 * @return {object}
 */
Object.cloneDeepByModel = function cloneDeepByModel(model, object, useDefaults = true) {
  const modelClone = Object.cloneDeep(model);
  const objectClone = Object.cloneDeep(object);

  Object.keys(modelClone).forEach(key => {

    if (!modelClone.hasOwnProperty(key)) {
      return;
    }

    if (key in objectClone) {
      modelClone[key] = objectClone[key];

    } else if (!useDefaults) {
      delete modelClone[key];
    }
  });

  return modelClone;
};

/**
 * Merge an objects by model that
 * mean exclude not existed the
 * model fields and use default
 * values provided by model.
 *
 * @param  {object} model
 * @param  {object} args
 * @return {object}
 */
Object.mergeByModel = function mergeByModel(model, ...args) {
  const modelClone = Object.cloneDeep(model);
  const mergedObject = Object.merge(...args);

  Object.keys(modelClone).forEach(key => {
    if (!modelClone.hasOwnProperty(key)) {
      return;

    }
    if (key in mergedObject) {
      modelClone[key] = mergedObject[key];
    }
  });

  return modelClone;
};

/**
 * Deep merge an objects by model
 * that mean exclude not existed
 * the model fields and use
 * default values provided
 * by model.
 *
 * @param  {object} model
 * @param  {object} args
 * @return {object}
 */
Object.mergeDeepByModel = function mergeDeepByModel(model, ...args) {
  const modelClone = Object.cloneDeep(model);
  const mergedObject = Object.mergeDeep(...args);

  Object.keys(modelClone).forEach(key => {
    if (!modelClone.hasOwnProperty(key)) {
      return;
    }
    if (key in mergedObject) {
      modelClone[key] = mergedObject[key];
    }
  });

  return modelClone;
};
