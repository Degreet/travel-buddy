import {
  Client,
  Place,
  PlacePhoto,
  PlaceType1,
} from '@googlemaps/google-maps-services-js';

import { Geocode } from '../interfaces/geocode.interface';

export class PlacesApi {
  private readonly GOOGLE_PLACES_API_KEY: string;

  constructor(private readonly client: Client) {
    this.GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
  }

  get apiKey() {
    return { key: this.GOOGLE_PLACES_API_KEY };
  }

  async search(query: string): Promise<Place[]> {
    const response = await this.client.textSearch({
      params: { ...this.apiKey, query },
    });
    return response?.data?.results;
  }

  async searchNear(near: Geocode, type?: PlaceType1): Promise<Place[]> {
    const response = await this.client.placesNearby({
      params: { ...this.apiKey, location: near, type },
    });
    return response?.data?.results;
  }

  async details(place_id: string): Promise<Place> {
    const response = await this.client.placeDetails({
      params: { ...this.apiKey, place_id },
    });
    return response?.data?.result;
  }

  async photoLink(photo: PlacePhoto): Promise<string> {
    const response = await this.client.placePhoto({
      params: {
        ...this.apiKey,
        photoreference: photo.photo_reference,
        maxwidth: photo.width,
        maxheight: photo.height,
      },
      responseType: 'arraybuffer',
    });
    return response?.request?.res?.responseUrl;
  }
}
