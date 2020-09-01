# How to build robust frontend applications: Brewery DB

![robust as a rock](https://images.unsplash.com/photo-1525857597365-5f6dbff2e36e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80)

A showcase Vue.js application to spread the word on robust SPA development.

The working application is available at [https://interferenc.github.io/breweries](https://interferenc.github.io/breweries).

## Common SPA pitfalls

There are some really common problems with most SPAs. The purpose of this application is to show an example on how to handle these problems:

- loosing page level state when URL is shared or bookmarked
- concurrent async operations cause flickering or unanticipated state
- runtime errors breaking the application
- validate all incoming data to enforce contracts and avoid impossible states
- separate business logic from the presentation layer

## Architecture

The design principle when setting the structure of this application was [The Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html).

The implemented layers are:

1. Entities
2. Services
3. User Interface

The most important guiding principle is that _no component in any of the layers should depend on anything in a higher layer._

### Entities

[Entities](src/entities) are all "things" the application works with: fetches them, creates them, saves them.

All business rules about these entities should also be part of this layer, like:

- validations
- mutations
- transformations

### Services

[Services](src/services) can depend on entities and other services only. They are responsible for moving data to and from the application, as well enforcing related business rules, like:

- packing and unpacking all incoming and outgoing data
- validating contracts: making sure the incoming data is what was promised
- handling transport errors: making sure a temporary network error does not break the application

### User Interface

All the [user interfaces](src/ui) the users interact with are in this layer. It is very easy to accidently implement business rules inside this layer, but that should be avoided. Whenever possible, business rules should be defined in the Entities and Services layers.
