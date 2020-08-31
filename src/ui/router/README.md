# Router

The Vue Router conviniently manages the most important application level state: the currenty visible view (or screen, page). It does it by updating the URL every time the user navigates to a new view.

## Routes

This application uses [layouts](../layouts) to allow for sharing interface elements between views. To achieve that, it relies on Vue Router's child view support.

## The Query String

Page level state is stored in the query string in this showcase application using [queryState](../queryState). However, it is the routers responsibility to define what and how can be squeezed into the query string.

Some example codecs:

```ts
// pushing strings to the query string (fairly trivial)
export const stringEncoder = i => i;
export const stringDecoder = i => i;

// pushing numbers to the query string
export const numberEncoder = (i: number) => i.toString();
export const numberDecoder = (i: string) => parseInt(i, 10);
```
