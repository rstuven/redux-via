import * as meta from './meta';

/**
 * Handles incoming actions at client side.
 *
 * @param {Function} dispatch The dispatch function from store.
 * @param {Object} action The action object.
 */
export function inClientVia(dispatch, action) {
  if (action.meta) {
    meta.remove(action.meta, 'server', false);
    meta.remove(action.meta, 'broadcast', false);
    meta.remove(action.meta, 'next', false);
  }
  dispatch(action);
}

/**
 * Builds a middleware that handles outcoming actions at client side.
 *
 * @param {Function} cross The function to cross the action out of the client boundary.
 * @returns {Function} A Redux middleware
 */
export function outClientVia(cross) {
  return (/* store */) => next => action => {
    if (typeof action.meta === 'object') {
      const server = meta.get(action.meta, 'server');
      const broadcast = meta.get(action.meta, 'broadcast');
      if (server === true || broadcast === true) {
        if (action.error) {
          console.warn(action.payload);
        }
        cross(action);
        const doNext = meta.get(action.meta, 'next');
        if (doNext === false) { // do next by default
          return undefined;
        }
      }
    }
    return next(action);
  };
}
