export interface StopProperties {
  name: string;
  type: string;
  wheelchair_accessible: boolean;
  picture: string;
  feature_type: 'stop';
}

export interface RouteProperties {
  short_name: string;
  long_name: string;
  color: string;
  feature_type: 'route';
}

export type FeatureProperties = StopProperties | RouteProperties;

export interface GeojsonFeature {
  type: string;
  id: string;
  properties: FeatureProperties;
  geometry: {
    type: string;
    coordinates: number[];
  };
}

export interface LayersDto {
  type: string;
  features: GeojsonFeature[];
}

export interface GeoJsonResult {
  geojson: LayersDto;
}
