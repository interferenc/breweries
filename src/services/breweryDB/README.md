# Brewery DB service

This service allows the UI layer to retrieve data from the [Open Brewery DB](https://www.openbrewerydb.org/).

It uses the general purpose [http](../http) service to create and execute `Request` objects.

## Resources: the Brewery

There is only one resource defined for this showcase application: the brewery. This resource is used to get a list of breweries or a single brewery.

### List

The `getList` action can be used to get a list of breweries:

```ts
const getList: (query: BreweryListQuery) => TaskEither<ApiError, BreweryList>
```

Example usage:

```ts
import { getList } from "@/services/breweryDB/resources/brewery";

const result = getList({
  city: 'Birmingham',
  name: '',
  page: 1
});
```

### Get

The `get` action can be used to get a single brewery by its ID:

```ts
const get: (id: number) => TaskEither<ApiError, Brewery>
```

Example usage:

```ts
import { get } from "@/services/breweryDB/resources/brewery";

const result = get(852);
```
