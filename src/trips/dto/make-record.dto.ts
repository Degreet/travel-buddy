import { Geocode } from '../../places/interfaces/geocode.interface';

export class MakeRecordDto implements Geocode {
  longitude: number;
  latitude: number;
}
