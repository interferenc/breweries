# Internationalization and Localization

This application uses the `vue-i18n` library to allow internationalization of the app.

## Locale

Since this is just a showcase application, the locale is left on its default `en` setting. In a real world application, the locale would be set:

- based on the client's supported locales, when logged out
- based on the user's selected locale, when logged in

## Internationalization

The principles for internationalization are the following:

- All user visible text should be ran through the `t` function.
- All user visible numbers should be ran through the `n` function
- All user visible dates should be ran through the `d` function

## Localization

Localizations can be provided in the form a JSON key value store.
