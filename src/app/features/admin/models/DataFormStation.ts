export interface IDataFormStation {
  id: number;
  city: string;
  lat: number;
  lon: number;
  connectedTo: { id: number; distance?: number }[];
}
