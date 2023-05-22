import { Inject, Injectable } from '@nestjs/common';
import { Place } from './interfaces/place.interface';
import { PlacesApi } from './api/places.api';
import { PlaceData } from '@googlemaps/google-maps-services-js/src/common';

@Injectable()
export class PlacesService {
  constructor(@Inject(PlacesApi.name) private readonly placesApi: PlacesApi) {}

  private async buildPlaceObj(details: Partial<PlaceData>) {
    const place: Place = {
      id: details.place_id,
      name: details.name,
      address: details.formatted_address,
      rating: details.rating,
      reviews: details.reviews,
      photos: await Promise.all(
        (details.photos || []).map((photo) => this.placesApi.photoLink(photo)),
      ),
    };

    return place;
  }

  async getPlaceById(id: string): Promise<Place> {
    const details = await this.placesApi.details(id);
    return await this.buildPlaceObj(details || {});
  }

  async search(query: string): Promise<Place[]> {
    return await Promise.all(
      (
        await this.placesApi.search(query)
      ).map((place) => this.buildPlaceObj(place)),
    );
  }
}
