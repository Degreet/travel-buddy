import { Injectable } from '@nestjs/common';
import { FoursquareAPI } from '../api/foursquare';

@Injectable()
export class PlacesService {
  constructor(private foursquareApi: FoursquareAPI) {}

  async search() {
    return await this.foursquareApi.search('Киев', 'ресторан');
  }
}
