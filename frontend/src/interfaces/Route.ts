export interface Route {
    id: string;
    shortName: string;
    longName: string;
    color: string;
    type: TransportType;
  }
  
  export enum TransportType {
    BUS = 'BUS',
    TRAM = 'TRAM',
  }