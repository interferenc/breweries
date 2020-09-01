# HTTP Service

This service is a general purpose HTTP service wrapped around the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). This application uses it to connect to the brewery database using the [breweryDB service](../breweryDB).

## Create a request

The request factory function can be used to create a request with the appropriate HTTP method.

```ts
import {
    getRequest,
    postRequest,
    putRequest,
    deleteRequest,
} from '@/services/http';

const request = getRequest('some url');
```

## Set headers

The `setHeader` function can be used to add some HTTP headers to a `Request` object. This function does not mutate the original request.

```ts
import { setHeaders, getRequest } from '@/services/http';
import { flow } from "fp-ts/lib/function";

const requestWithHeader = setHeader([
    ['Accept', 'application/json']
])(getRequest('some url'));

// create reusable header function
const setAuthorizationHeaders = setHeaders([
  ['Authorization', 'Bearer token']
]);

// function that returns a get request with the authorization headers applied
const authorizedGetRequest = flow(
  getRequest,
  setAuthorizationHeaders
);

const requestWithAuthHeaders = authorizedGetRequest('some url);
```

## Set query string

The `setQuery` function can be used to add query string variables to a `Request` object. This function does not mutate the original request.

```ts
import { setQuery, getRequest } from '@/services/http';

const requestWithParam = setQuery({
    foo: 'bar',
})(getRequest('some url'));

// create reusable query function
const addFooBar = setQuery({ foo: 'bar' });
const requestWithFooBar = setQuery(getRequest('some url'));
```

## Set body

For the purposes of this showcase application, a function to set the body was not implemented, but in a real world app, there would be one.

## Execute request

The `execute` function can be used execute a `Request` object. It returns a `TaskEither<Error, Response>`.

```ts
import { getRequest, execute } from '@/services/http';

const result = execute(getRequest('some url));
```
