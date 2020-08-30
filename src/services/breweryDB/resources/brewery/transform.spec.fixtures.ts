import { some } from "fp-ts/lib/Option";

/* eslint-disable @typescript-eslint/camelcase */
export const rawBrewery = {
  id: 127,
  name: "Dragoon Brewing Co",
  brewery_type: "micro",
  street: some("1859 W Grant Rd Ste 111"),
  city: some("Tucson"),
  state: some("Arizona"),
  country: some("United States"),
  longitude: some(-111.005452051979),
  latitude: some(32.2504946147872),
  phone: some("5203293606"),
  website_url: some("http://www.dragoonbrewing.com"),
  updated_at: new Date("2018-08-23T23:21:40.563Z")
};

export const transformedBrewery = {
  name: "Dragoon Brewing Co",
  type: "micro",
  address: {
    street: some("1859 W Grant Rd Ste 111"),
    city: some("Tucson"),
    state: some("Arizona"),
    country: some("United States")
  },
  coordinates: some({
    longitude: -111.005452051979,
    latitude: 32.2504946147872
  }),
  phone: some("5203293606"),
  website: some("http://www.dragoonbrewing.com"),
  updatedAt: new Date("2018-08-23T23:21:40.563Z")
};
