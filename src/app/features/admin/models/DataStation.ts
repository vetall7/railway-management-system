export interface IDataStation {
  id: number;
  city: string;
  connectedTo: { id: number; distance: number }[];
  show: boolean;
  latitude: number;
  longitude: number;
}
