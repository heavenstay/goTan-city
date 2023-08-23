import { Dispatch, SetStateAction, createContext } from 'react';

export interface MapProperties {  
    viewState: MapViewState;
    setViewState: Dispatch<SetStateAction<MapViewState>>;
    selectedRouteId: string | undefined; 
    setSelectedRouteId: Dispatch<SetStateAction<string | undefined>>;
    selectedStationId: string | undefined;
    setSelectedStationId: Dispatch<SetStateAction<string | undefined>>;
}

export interface MapViewState {
    latitude: number;
    longitude: number;
    zoom: number;
}

export const defaultViewState: MapViewState = {
    longitude: -1.5675348693361855,
    latitude: 47.22197283966,
    zoom: 12,
};

export const MapContext = createContext<MapProperties>({
    viewState: defaultViewState,
    setViewState: () => {},
    selectedRouteId: undefined,
    setSelectedRouteId: () => {},
    selectedStationId: undefined,
    setSelectedStationId: () => {}
});