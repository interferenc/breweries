# Entities

For the purposes of this showcase application, only a handful of entites were defined. All entities should be defined in a logical way, to support whichever task they are needed for. How they look like on the "other end" (the server) or how the API returns them should not matter as long as they can be transformed.

## Brewery

The brewery entity is defined like this:

```ts
import { Option } from "fp-ts/lib/Option";
import { GeographicLocation } from ".";

export interface Brewery {
  name: string;
  type: string;
  address: {
    street: Option<string>;
    city: Option<string>;
    state: Option<string>;
    country: Option<string>;
  };
  coordinates: Option<GeographicLocation>;
  phone: Option<string>;
  website: Option<string>;
  updatedAt: Date;
}
```
