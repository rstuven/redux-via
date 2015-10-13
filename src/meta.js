const namespace = '@@redux-via/';

const keys = Object.freeze({
  broadcast: namespace + 'broadcast',
  client: namespace + 'client',
  server: namespace + 'server',
  next: namespace + 'next',
});

/**
 * Builds a namespaced meta object.
 *
 * @param {Object} original The original meta object.
 */
export function noConflict(original) {
  return Object.keys(original).reduce((meta, key) => {
    const metaKey = keys[key];
    meta[metaKey] = original[key];
    return meta;
  }, {[namespace]: true});
}

/**
 * Gets a meta object property value.
 *
 * @param {Object} meta The meta object.
 * @param {String} key The meta property key.
 * @returns {any} A meta property value.
 */
export function get(meta, key) {
  if (meta[namespace] === true) {
    return meta[namespace + key];
  }
  return meta[key];
}

/**
 * Sets a meta object property value.
 *
 * @param {Object} meta The meta object.
 * @param {String} key The meta property key.
 * @param {any} value The meta property value.
 */
export function set(meta, key, value) {
  if (meta[namespace] === true) {
    meta[namespace + key] = value;
  } else {
    meta[key] = value;
  }
}

/**
 * Removes a meta object property value.
 *
 * @param {Object} meta The meta object.
 * @param {String} key The meta property key.
 */
export function remove(meta, key) {
  if (meta[namespace] === true) {
    delete meta[namespace + key];
  } else {
    delete meta[key];
  }
}
