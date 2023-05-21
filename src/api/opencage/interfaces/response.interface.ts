export interface GeocodeResponse {
  documentation: string;
  licenses: License[];
  rate: Rate;
  results: Result[];
  status: Status;
  stay_informed: StayInformed;
  thanks: string;
  timestamp: Timestamp;
  total_results: number;
}

export interface License {
  name: string;
  url: string;
}

export interface Rate {
  limit: number;
  remaining: number;
  reset: number;
}

export interface Result {
  annotations: any[];
  bounds: any[];
  components: any[];
  confidence: number;
  formatted: string;
  geometry: any[];
}

export interface Status {
  code: number;
  message: string;
}

export interface StayInformed {
  blog: string;
  mastodon: string;
  twitter: string;
}

export interface Timestamp {
  created_http: string;
  created_unix: number;
}
