import { Injectable } from '@nestjs/common';
import { FoursquareAPI } from '../api/foursquare';
import { IGeocode, IPlace } from './interfaces/place.interface';
import { OpencageAPI } from '../api/opencage';

@Injectable()
export class PlacesService {
  constructor(
    private foursquareApi: FoursquareAPI,
    private opencageApi: OpencageAPI,
  ) {}

  async search(near: string, query?: string): Promise<IPlace[]> {
    const foundPlaces = await this.foursquareApi.search(near, query);
    const places = [];

    for (const place of foundPlaces) {
      const geocode: IGeocode = {
        lt: place.geocodes.main.latitude,
        lg: place.geocodes.main.longitude,
      };

      places.push({
        name: place.name,
        address: await this.opencageApi.getAddressByGeocode(
          geocode.lt,
          geocode.lg,
        ),
        geocode: geocode,
      });
    }

    return places;
  }
}
