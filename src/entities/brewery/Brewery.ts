import { Option } from "fp-ts/lib/Option";

export interface GeographicLocation {
  longitude: number;
  latitude: number;
}

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

export interface BreweryRecord {
  id: number;
  name: string;
  address: {
    city: Option<string>;
    country: Option<string>;
  };
}

export type BreweryList = BreweryRecord[];
