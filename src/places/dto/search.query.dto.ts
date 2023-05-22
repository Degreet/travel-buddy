import { IsIn, IsOptional, IsString } from 'class-validator';
import { City, Country } from 'country-state-city';

export class SearchQueryDto {
  @IsString()
  @IsOptional()
  query?: string;

  @IsString()
  @IsOptional()
  @IsIn(Country.getAllCountries().map((country) => country.name.toLowerCase()))
  country?: string;

  @IsString()
  @IsOptional()
  @IsIn(City.getAllCities().map((city) => city.name.toLowerCase()))
  city?: string;
}
