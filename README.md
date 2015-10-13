redux-via
=========

**redux-via** provides a basis for using Redux across boundaries
with [Flux Standard Actions](https://github.com/acdlite/flux-standard-action).

By the way, **via** is Latin for "road", which brings us to a very important question:
*Why did the Redux FSA-compliant action cross the road?
To get reduced at the other side. Duh!*

...

OK, let's pretend that supposed joke never happened and get to the point.

## Usage

First, install an adapter:
- Socket.io: [redux-via-socket.io](https://github.com/rstuven/redux-via-socket.io)
- More to come...

Client and server side configuration look very similar. Specifics will depend on the adapter API. We'll use the names `outViaAdapter` and `inViaAdapter` just for the example.

```js
import {inClientViaAdapter as inViaAdapter} from 'redux-via-adapter';
import {outClientViaAdapter as outViaAdapter} from 'redux-via-adapter';
```
...at the client side, or...
```js
import {inServerViaAdapter as inViaAdapter} from 'redux-via-adapter';
import {outServerViaAdapter as outViaAdapter} from 'redux-via-adapter';
```

...at the server side. Then...

```js
// ...
const transport = ...; // object dealing with communication

const finalCreateStore = compose(
  applyMiddleware(
    outViaAdapter(transport), // initialize for outcoming actions
    anotherMiddleware,
    yetAnotherMiddleware,
  )
)(createStore);

const store = finalCreateStore(rootReducer, initialState);

// initialize for inconming actions
inViaAdapter(transport, store.dispatch);

```

## Meta options

Action flow is controlled by options specified in the `meta` property.

## Client side

#### `broadcast` (Boolean)
If `true`, sends the action to all the other clients.
Default value: `false`

#### `server` (Boolean)
If `true`, sends the action to the server.
Default value: `false`

#### `next` (Boolean)
If `true`, the action continues to the next middleware or the reducer, locally in the server.
Default value: `true`

## Server side

#### `broadcast` (Boolean)
If `true`, sends the action to all the clients except the specified in `client`.
Default value: `false`

#### `client` (String)
If `broadcast` is `false`, sends the action the specified client.
If `broadcast` is `true`, sends the action to all clients except the specified client.
Default value: `false`

#### `next` (Boolean)
If `true`, the action continues to the next middleware or the reducer in the client(s).
Default value: `true`

## Meta object keys conflicts

If redux-via meta keys conflict with other meta keys, use the `meta.noConflict` function. For example:

```js
// before
const action = {
  type: 'ACTION',
  meta: {server: true} // say this is causing an error in another library
};
```

```js
// after
import {meta} from 'redux-via';
const action = {
  type: 'ACTION',
  meta: {
    server: 'a-server-name-for-who-knows-what',
    ...meta.noConflict({server: true})  // PEACE!
  }
};
```

## Implementing an adapter

// Doc in progress...
In the meantime, [redux-via-socket.io](https://github.com/rstuven/redux-via-socket.io) can provide an example of how to do it.


```
npm install --save redux-via
```

### `inClientVia(dispatch: Function, action: Object)`
 * `dispatch`: The dispatch function from store.
 * `action`: The action object.

### `outClientVia(cross: Function): Function`
* `cross`: The function to cross the action out of the client boundary.
* Returns a Redux middleware


### `inServerVia(dispatch: Function, action: Object, client: String)`
* `dispatch`: The dispatch function from store.
* `action`: The action object.
* `client`: The client identifier.

### `outServerVia(cross: Function): Function`
* `cross`: The function to cross the action out of the server boundary.
* Returns a Redux middleware

---

Thanks to:
- [Elie Rotenberg](@elierotenberg) and his idea of
["Flux over the wire" with adapters](https://github.com/elierotenberg/nexus-flux) for the inspiration.
- [Tero Parviainen](@teropa) and his wonderful
[Full-Stack Redux Tutorial](http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html) for showing how simple this could be using Redux.

---

## License

MIT
