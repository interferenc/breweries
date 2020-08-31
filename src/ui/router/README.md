# Router

The Vue Router conviniently manages the most important application level state: the currenty visible view (or screen, page). It does it by updating the URL every time the user navigates to a new view.

## Routes

This application uses [layouts](../layouts) to allow for sharing interface elements between views. To achieve that, it relies on Vue Router's child view support.

## The Query String

Page level state is stored in the query string in this showcase application using [queryState](../queryState). However, it is the routers responsibility to define what and how can be squeezed into the query string.

Some example codecs:

```ts
console.log(stringEncoder('foo')); // 'foo'
console.log(stringDecoder('foo')); // 'foo'

console.log(numberEncoder(1)) // '1'
console.log(numberDecoder('1')) // 1

// Decoding can fail. When it does, we use the type specific fallback value, in this case 0;
console.log(numberDecoder('bar')) // 0

// An alternatie fallback value can also be specified
console.log(numberDecoder('baz', 1)) // 1
```
