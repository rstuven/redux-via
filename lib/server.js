'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.inServerVia = inServerVia;
exports.outServerVia = outServerVia;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _meta = require('./meta');

var meta = _interopRequireWildcard(_meta);

/**
 * @param {Function} dispatch The dispatch function from store.
 * @param {Object} action The action object.
 * @param {String} client The client identifier.
 */

function inServerVia(dispatch, action, client) {
  if (typeof action.meta !== 'object') {
    action.meta = {};
  }
  meta.set(action.meta, 'client', client);
  meta.remove(action.meta, 'server');
  meta.remove(action.meta, 'next');
  dispatch(action);
}

/**
 * @param {Function} cross The function to cross the action out of the server boundary.
 * @returns {Function} A Redux middleware
 */

function outServerVia(cross) {
  if (typeof cross !== 'function') {
    throw new Error('cross function is required');
  }
  return function () {
    return (/* store */function (next) {
        return function (action) {
          if (typeof action.meta === 'object') {
            var broadcast = meta.get(action.meta, 'broadcast');
            var client = meta.get(action.meta, 'client');
            if (typeof broadcast === 'boolean' || typeof client === 'string') {
              cross(action, broadcast, client);
              var doNext = meta.get(action.meta, 'next');
              if (doNext === false) {
                // do next by default
                return undefined;
              }
            }
          }
          return next(action);
        };
      }
    );
  };
}