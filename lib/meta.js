'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.noConflict = noConflict;
exports.get = get;
exports.set = set;
exports.remove = remove;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var namespace = '@@redux-via/';

var keys = Object.freeze({
  broadcast: namespace + 'broadcast',
  client: namespace + 'client',
  server: namespace + 'server',
  next: namespace + 'next'
});

/**
 * Builds a namespaced meta object.
 *
 * @param {Object} original The original meta object.
 */

function noConflict(original) {
  return Object.keys(original).reduce(function (meta, key) {
    var metaKey = keys[key];
    meta[metaKey] = original[key];
    return meta;
  }, _defineProperty({}, namespace, true));
}

/**
 * Gets a meta object property value.
 *
 * @param {Object} meta The meta object.
 * @param {String} key The meta property key.
 * @returns {any} A meta property value.
 */

function get(meta, key) {
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

function set(meta, key, value) {
  if (meta[namespace] === true) {
    meta[namespace + key] = value;
  } else {
    meta[key] = value;
  }
}

/**
 * Sets a meta object property value.
 *
 * @param {Object} meta The meta object.
 * @param {String} key The meta property key.
 * @param {any} value The meta property value.
 */

function remove(meta, key) {
  if (meta[namespace] === true) {
    delete meta[namespace + key];
  } else {
    delete meta[key];
  }
}