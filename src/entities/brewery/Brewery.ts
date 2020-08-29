import { Option } from "fp-ts/lib/Option";

export interface Brewery {
  name: string;
  address: {
    street: Option<string>;
    city: Option<string>;
    state: Option<string>;
    country: Option<string>;
  };
  coordinates: {
    longitude: Option<number>;
    latitude: Option<number>;
  };
  phone: Option<string>;
  website: Option<string>;
  updatedAt: Date;
}

export interface BreweryRecord {
  id: number;
  name: string;
  address: {
    city: Option<string>;
    country: Option<string>;
  };
}

export type BreweryList = BreweryRecord[];
