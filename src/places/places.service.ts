import { Inject, Injectable } from '@nestjs/common';
import { Place } from './interfaces/place.interface';
import { PlacesApi } from './api/places.api';
import { PlaceData } from '@googlemaps/google-maps-services-js/src/common';
import { SearchQueryDto } from './dto/search.query.dto';

@Injectable()
export class PlacesService {
  constructor(@Inject(PlacesApi.name) private readonly placesApi: PlacesApi) {}

  private async buildPlaceObj(details: Partial<PlaceData>): Promise<Place> {
    return {
      id: details.place_id,
      name: details.name,
      address: details.formatted_address,
      rating: details.rating,
      reviews: details.reviews,
      geocode: {
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
      },
      photos: await Promise.all(
        (details.photos || []).map((photo) => this.placesApi.photoLink(photo)),
      ),
    };
  }

  async getPlaceById(id: string): Promise<Place> {
    const details = await this.placesApi.details(id);
    return await this.buildPlaceObj(details || {});
  }

  async search(searchQueryDto: SearchQueryDto): Promise<Place[]> {
    const { country, city, type, location } = searchQueryDto;
    let foundPlaces;

    if (type && location) {
      foundPlaces = await this.placesApi.searchNear(location, type);
    } else {
      foundPlaces = await this.placesApi.search(
        [country, city, 'interesting'].join(),
      );
    }

    return await Promise.all(
      (foundPlaces || []).map((place) => this.buildPlaceObj(place)),
    );
  }
}
