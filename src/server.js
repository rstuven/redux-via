import * as meta from './meta';

/**
 * Handles incoming actions at server side.
 *
 * @param {Function} dispatch The dispatch function from store.
 * @param {Object} action The action object.
 * @param {String} client The client identifier.
 */
export function inServerVia(dispatch, action, client) {
  if (typeof action.meta !== 'object') {
    action.meta = {};
  }
  meta.set(action.meta, 'client', client);
  meta.remove(action.meta, 'server');
  meta.remove(action.meta, 'next');
  dispatch(action);
}

/**
 * Builds a middleware that handles outcoming actions at server side.
 *
 * @param {Function} cross The function to cross the action out of the server boundary.
 * @returns {Function} A Redux middleware
 */
export function outServerVia(cross) {
  if (typeof cross !== 'function') {
    throw new Error('cross function is required');
  }
  return (/* store */) => next => action => {
    if (typeof action.meta === 'object') {
      const broadcast = meta.get(action.meta, 'broadcast');
      const client = meta.get(action.meta, 'client');
      if (typeof broadcast === 'boolean' || typeof client === 'string') {
        cross(action, broadcast, client);
        const doNext = meta.get(action.meta, 'next');
        if (doNext === false) { // do next by default
          return undefined;
        }
      }
    }
    return next(action);
  };
}
