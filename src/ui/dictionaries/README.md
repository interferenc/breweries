# Dictionaries

Dictionaries can be used to turn an enumerated list into a human readable string.

## API Error codes

The `apiError` function can turn an HTTP error code (or an internal error code) into a localized string.

```ts
import { apiError } from '@/ui/dictionaries';

console.log(apiError(500)); // 'Server error`
```
