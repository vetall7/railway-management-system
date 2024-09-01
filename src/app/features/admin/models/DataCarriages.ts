export interface IDataCarriages {
  name: string;
  rightSeats: number;
  leftSeats: number;
  rows: number;
  code?: string;
}

export interface IDataView {
  rightSeats: number;
  leftSeats: number;
  rows: number;
}

export interface IDataReq {
  code: string;
}
