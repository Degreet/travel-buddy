import { Injectable } from '@nestjs/common';
import { FoursquareAPI } from '../api/foursquare';

@Injectable()
export class PlacesService {
  constructor(private foursquareApi: FoursquareAPI) {}

  async search(near: string, query?: string) {
    const places = await this.foursquareApi.search(near, query);
    return places;
  }
}
