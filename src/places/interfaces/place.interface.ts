export interface IPlace {
  name: string;
  address: string;
  geocode: IGeocode;
}

export interface IGeocode {
  lg: number;
  lt: number;
}
