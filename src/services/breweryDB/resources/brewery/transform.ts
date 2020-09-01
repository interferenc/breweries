import * as t from "io-ts";
import { breweryCodec, breweryRecordCodec, breweryListCodec } from "./codec";
import { Brewery, BreweryRecord, BreweryList } from "@/entities";
import { isSome, some, none, getOrElse } from "fp-ts/lib/Option";

/**
 * Transforms the decoded brewery data into a Brewery entity.
 * @param brewery the decoded brewery data
 */
export const breweryTransformer = (
  brewery: t.TypeOf<typeof breweryCodec>
): Brewery => ({
  name: brewery.name,
  type: brewery.brewery_type,
  address: {
    street: brewery.street,
    city: brewery.city,
    state: brewery.state,
    country: brewery.country
  },
  coordinates:
    // TODO: there must be a better way of writing this
    isSome(brewery.longitude) && isSome(brewery.latitude)
      ? some({
          longitude: getOrElse<number>(() => 0)(brewery.longitude),
          latitude: getOrElse<number>(() => 0)(brewery.latitude)
        })
      : none,
  phone: brewery.phone,
  website: brewery.website_url,
  updatedAt: brewery.updated_at
});

/**
 * Transforms the decoded brewery list item data into a BreweryRecord entity
 * @param brewery the decoded list item data
 */
export const breweryRecordTransformer = (
  brewery: t.TypeOf<typeof breweryRecordCodec>
): BreweryRecord => ({
  id: brewery.id,
  name: brewery.name,
  address: {
    city: brewery.city,
    country: brewery.country
  }
});

/**
 * Transforms the decoded brewery list data into a BreweryList entity
 * @param breweryList the decoded list data
 */
export const breweryListTransformer = (
  breweryList: t.TypeOf<typeof breweryListCodec>
): BreweryList => breweryList.map(breweryRecordTransformer);
