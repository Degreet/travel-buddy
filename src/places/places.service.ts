import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Client } from '@googlemaps/google-maps-services-js';
import { Place } from './interfaces/place.interface';

@Injectable()
export class PlacesService {
  constructor(private client: Client) {}

  private getKey(): { key: string } {
    return { key: process.env.GOOGLE_PLACES_API_KEY };
  }

  async search(query: string) {
    const { data } = await this.client.textSearch({
      params: {
        query,
        ...this.getKey(),
      },
    });

    if (!data || data.error_message)
      throw new HttpException(data.error_message, HttpStatus.NOT_ACCEPTABLE);

    const places: Place[] = [];

    for (const result of data.results) {
      const place: Place = {
        name: result.name,
        address: result.formatted_address,
        rating: result.rating,
        photos: [],
      };

      for (const photo of result.photos) {
        const { data } = await this.client.placePhoto({
          params: {
            ...this.getKey(),
            photoreference: photo.photo_reference,
            maxwidth: photo.width,
            maxheight: photo.height,
          },
          responseType: 'arraybuffer',
        });

        place.photos.push(
          'data:image/png;base64,' +
            Buffer.from(data, 'binary').toString('base64'),
        );
      }

      places.push(place);
    }

    return places;
  }
}
