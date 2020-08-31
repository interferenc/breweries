# The Query Store

This application is a Single Page Application (SPA for short), meaning that javascript code is loaded on the initial page view and that controls all application behaviour throughout the use of the application. There are no subsequent page loads in the traditional sense.

For convenience, all of the views of this application correspond to a unique URL. The Vue Router makes sure that while navigating between views, the URL is always updated. Upon sharing or bookmarking a URL, the Vue Router makes sure to start the application with displaying the appropriate view.

But to not _break the web,_ this is not enough. Page level state should also be preserved when resuming any SPA. If the page displays a paginated list, the currently selected page should be shown when a user decides to share the URL. To achieve that, most web apps "mirror" their internal state to the URL.

This application takes that one step further: it uses the query string as the single source of thruth.

```ts
import * as qs from "@/ui/queryState";

// create computed (reactive) variables that store their value exclusively in the query string

// pass the query parameter name and a default value
const page = qs.number("page", 1);

// strings default to an empty string
const city = qs.string("city");

// setting the value will also update the query string automatically
city.value = 'Berlin';
```

## Codecs

Any arbitrary type that can be serialized into a string (and back) can be stored in the query string. In this showcase app we only provide examples for `number` and `string` types.

## Debouncing

Updating the query string on rapid value changes for a computed variable would result in many history entries which could impair user experience (pressing the back button would have no visible effect).

To avoid that, any change to the query string is automatically debounced.

## Use cases

Some use cases where storing the state in the query is essential:

- Pagination (page, per page)
- Sorting (column, direction)
- Filtering

It should be evaluated on a case-by-case basis what local state should be exluded. For example:

- component level state (like open/closed state of a dropdown component) is very likely should be exlcuded
- the open/closed state of a "checkout" modal should be included
