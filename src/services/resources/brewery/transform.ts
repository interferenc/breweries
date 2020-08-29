import * as t from "io-ts";
import { breweryCodec, breweryRecordCodec, breweryListCodec } from "./codec";
import {
  Brewery,
  BreweryRecord,
  BreweryList
} from "@/entities/brewery/Brewery";
import { isSome, some, none, getOrElse } from "fp-ts/lib/Option";

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

export const breweryListTransformer = (
  breweryList: t.TypeOf<typeof breweryListCodec>
): BreweryList => breweryList.map(breweryRecordTransformer);
