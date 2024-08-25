export interface IDataStation {
  id: number;
  city: string;
  connectedTo: { id: number; distance?: number }[];
  latitude: number;
  longitude: number;
}
