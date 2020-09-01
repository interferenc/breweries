/* eslint-disable @typescript-eslint/camelcase */
import * as t from "io-ts";
import {
  NumberFromString,
  DateFromISOString,
  optionFromNullable
} from "io-ts-types";

/**
 * The codec for a brewery
 */
export const breweryCodec = t.type({
  name: t.string,
  brewery_type: t.string,
  street: optionFromNullable(t.string),
  city: optionFromNullable(t.string),
  state: optionFromNullable(t.string),
  country: optionFromNullable(t.string),
  phone: optionFromNullable(t.string),
  longitude: optionFromNullable(NumberFromString),
  latitude: optionFromNullable(NumberFromString),
  website_url: optionFromNullable(t.string),
  updated_at: DateFromISOString
});

/**
 * The codec for a brewery list item
 */
export const breweryRecordCodec = t.type({
  id: t.number,
  name: t.string,
  city: optionFromNullable(t.string),
  country: optionFromNullable(t.string)
});

/**
 * The codec for a brewery list
 */
export const breweryListCodec = t.array(breweryRecordCodec);
