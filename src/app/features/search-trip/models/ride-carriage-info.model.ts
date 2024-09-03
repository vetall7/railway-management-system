export interface IRideCarriageData {
  code: string;
  leftSeats: number;
  name: string;
  rightSeats: number;
  rows: number;
}
export interface IRideSeatsInfo {
  type: string;
  seats: number;
}

export interface ICarListItem {
  numberCar: number;
  seats: number[];
  occupiedSeats?: number;
}

export interface ICarModalData {
  car: number;
  numberSeat: number;
}
export interface ICarModalDataInfo extends ICarModalData {
  price: number;
}

export interface IDataToResponse {
  rideId: number;
  seat: number;
  stationStart: number;
  stationEnd: number;
}

export interface IOrderResponse {
  id: string;
}
