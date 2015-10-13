'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.inClientVia = inClientVia;
exports.outClientVia = outClientVia;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _meta = require('./meta');

var meta = _interopRequireWildcard(_meta);

/**
 * @param {Function} dispatch The dispatch function from store.
 * @param {Object} action The action object.
 */

function inClientVia(dispatch, action) {
  if (action.meta) {
    meta.remove(action.meta, 'server', false);
    meta.remove(action.meta, 'broadcast', false);
    meta.remove(action.meta, 'next', false);
  }
  dispatch(action);
}

/**
 * @param {Function} cross The function to cross the action out of the client boundary.
 * @returns {Function} A Redux middleware
 */

function outClientVia(cross) {
  return function () {
    return (/* store */function (next) {
        return function (action) {
          if (typeof action.meta === 'object') {
            var server = meta.get(action.meta, 'server');
            var broadcast = meta.get(action.meta, 'broadcast');
            if (server === true || broadcast === true) {
              if (action.error) {
                console.warn(action.payload);
              }
              cross(action);
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