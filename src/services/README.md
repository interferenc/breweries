# Services

Services should work with the defined [entities](../entities) and allow the application to move them wherever they are needed.

For the purposes of this application, the following servies are defined:

- [http](http): a simple HTTP client wrapped around the fetch API
- [breweryDB](breweryDB): the brewery DB API
- [mapbox](mapbox): a simple wrapper to return a static map image for a location
