interface ConnectedStation {
  id: number;
  distance: number;
}

export interface StationResponse {
  id: number;
  city: string;
  latitude: number;
  longitude: number;
  connectedTo: ConnectedStation[];
}
