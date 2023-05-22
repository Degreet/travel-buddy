import { PlaceReview } from '@googlemaps/google-maps-services-js/src/common';

export interface Place {
  id: string;
  name: string;
  address: string;
  rating?: number;
  photos: string[];
  reviews?: PlaceReview[];
}
