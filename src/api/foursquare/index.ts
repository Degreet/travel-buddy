import { FSQResponse, Place } from './interfaces/response.interface';
import axios from 'axios';

export class FoursquareAPI {
  private readonly API_URL = 'https://api.foursquare.com/v3/places/search';
  private readonly API_V = '20230520';
  private readonly API_KEY: string;

  constructor() {
    this.API_KEY = process.env.FSQ_API_KEY;
  }

  private async makeRequest(params: Record<string, string>) {
    return await axios.get<FSQResponse>(this.API_URL, {
      headers: {
        Authorization: this.API_KEY,
      },
      params: {
        v: this.API_V,
        ...params,
      },
    });
  }

  async search(near: string, query?: string): Promise<Place[]> {
    const { data } = await this.makeRequest({ near, query });
    return data?.results;
  }
}
