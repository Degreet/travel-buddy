import {
  IsIn,
  IsLatLong,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

import { City, Country } from 'country-state-city';
import { PLACE_TYPES } from '../constants/place-types.constant';
import { PlaceType } from '../types/place.type';
import { Geocode } from '../interfaces/geocode.interface';

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
  @IsIn(PLACE_TYPES)
  type?: PlaceType;

  @ValidateIf((v) => !!v.type)
  @IsLatLong()
  location?: Geocode;
}
