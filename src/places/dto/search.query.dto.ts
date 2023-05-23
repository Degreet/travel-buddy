import {
  IsIn,
  IsLatLong,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

import { City, Country } from 'country-state-city';
import { Geocode } from '../interfaces/geocode.interface';
import { PlaceType1 } from '@googlemaps/google-maps-services-js';

export class SearchQueryDto {
  @IsOptional()
  @IsString()
  @IsIn(Country.getAllCountries().map((country) => country.name.toLowerCase()))
  country?: string;

  @IsOptional()
  @IsString()
  @IsIn(City.getAllCities().map((city) => city.name.toLowerCase()))
  city?: string;

  @ValidateIf((v) => !!v.location)
  @IsString()
  @IsIn(Object.values(PlaceType1))
  type?: PlaceType1;

  @ValidateIf((v) => !!v.type)
  @IsLatLong()
  location?: Geocode;
}
