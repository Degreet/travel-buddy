export interface FSQResponse {
  results: Place[];
  context: Context;
}

export interface Place {
  fsq_id: string;
  categories: Category[];
  chains: any[];
  distance: number;
  geocodes: Geocodes;
  link: string;
  location: Location;
  name: string;
  related_places: RelatedPlaces;
  timezone: string;
}

export interface Category {
  id: number;
  name: string;
  icon: Icon;
}

export interface Icon {
  prefix: string;
  suffix: string;
}

export interface Geocodes {
  main: Main;
}

export interface Main {
  latitude: number;
  longitude: number;
}

export interface Location {
  address: string;
  country: string;
  cross_street: string;
  formatted_address: string;
  locality: string;
  region: string;
  postcode?: string;
  address_extended?: string;
}

export interface RelatedPlaces {}

export interface Context {
  geo_bounds: GeoBounds;
}

export interface GeoBounds {
  circle: Circle;
}

export interface Circle {
  center: Center;
  radius: number;
}

export interface Center {
  latitude: number;
  longitude: number;
}
