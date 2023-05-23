import {
  Client,
  Place,
  PlaceDetailsRequest,
  PlaceDetailsResponse,
  PlacePhoto,
  PlacePhotoRequest,
  PlacePhotoResponse,
  PlacesNearbyRequest,
  PlacesNearbyResponse,
  TextSearchRequest,
  TextSearchResponse,
} from '@googlemaps/google-maps-services-js';

import { Params } from '../types/params.type';
import { Geocode } from '../interfaces/geocode.interface';

export class PlacesApi {
  private readonly GOOGLE_PLACES_API_KEY: string;

  constructor(private readonly client: Client) {
    this.GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
  }

  async makeRequest<T, R>(
    method: string,
    params: T,
    responseType?: string,
  ): Promise<R> {
    return this.client[method]({
      params: {
        key: this.GOOGLE_PLACES_API_KEY,
        ...params,
      },
      responseType,
    }).catch(console.error);
  }

  async search(query: string): Promise<Place[]> {
    const response = await this.makeRequest<
      Params<TextSearchRequest>,
      TextSearchResponse
    >('textSearch', { query });
    return response?.data?.results;
  }

  async searchNear(near: Geocode, type?: string): Promise<Place[]> {
    const response = await this.makeRequest<
      Params<PlacesNearbyRequest>,
      PlacesNearbyResponse
    >('textSearch', { location: near, type });
    return response?.data?.results;
  }

  async details(place_id: string): Promise<Place> {
    const response = await this.makeRequest<
      Params<PlaceDetailsRequest>,
      PlaceDetailsResponse
    >('placeDetails', { place_id });
    return response?.data?.result;
  }

  async photoLink(photo: PlacePhoto): Promise<string> {
    const response = await this.makeRequest<
      Params<PlacePhotoRequest>,
      PlacePhotoResponse
    >(
      'placePhoto',
      {
        photoreference: photo.photo_reference,
        maxwidth: photo.width,
        maxheight: photo.height,
      },
      'arraybuffer',
    );
    return response?.request?.res?.responseUrl;
  }
}
