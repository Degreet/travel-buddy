import { PlaceReview } from '@googlemaps/google-maps-services-js/src/common';
import { Geocode } from './geocode.interface';

export interface Place {
  id: string;
  name: string;
  address: string;
  rating?: number;
  photos: string[];
  reviews?: PlaceReview[];
  geocode: Geocode;
}
