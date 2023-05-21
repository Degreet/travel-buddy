import { GeocodeResponse } from './interfaces/response.interface';
import * as opencage from 'opencage-api-client';

export class OpencageAPI {
  async searchByGeocode(lt: number, lg: number): Promise<GeocodeResponse> {
    return await opencage.geocode({ q: `${lt}, ${lg}`, language: 'ru' });
  }

  async getAddressByGeocode(lt: number, lg: number): Promise<string> {
    const res = await this.searchByGeocode(lt, lg);
    return res?.results && res.results[0].formatted;
  }
}
