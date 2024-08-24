export interface IDataFormStation {
  id: number;
  city: string;
  connectedTo: { id: number; distance: number }[];
}
