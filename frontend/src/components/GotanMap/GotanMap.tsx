import Map, { Source, Layer } from "react-map-gl";
import type { CircleLayer } from "react-map-gl";
import type { FeatureCollection } from "geojson";
import "./GotanMap.scss"

const geojson: FeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      id: "MOUT1",
      type: "Feature",
      geometry: { type: "Point", coordinates: [-1.53301942, 47.21956936] },
      properties: {
        name: "Moutonnerie",
        type: "TRAM",
        routes: ["1"],
        feature_type: "stop",
        wheelchair_accessible: true,
      },
    },
    {
      id: "MOUT2",
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-1.53341505, 47.21955608],
      },
      properties: {
        name: "Moutonnerie",
        type: "TRAM",
        routes: ["1"],
        feature_type: "stop",
        wheelchair_accessible: true,
      },
    },
  ],
};

const layerStyle: CircleLayer = {
  id: "point",
  type: "circle",
  paint: {
    "circle-radius": 10,
    "circle-color": "#007cbf",
  },
  source: "source",
};

export function GotanMap() {
  const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

  return (
    <div className="gotan-map">
      <Map
        initialViewState={{
          longitude: -1.53341505,
          latitude: 47.21955608,
          zoom: 14,
        }}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <Source id="my-data" type="geojson" data={geojson}>
          <Layer {...layerStyle} />
        </Source>
      </Map>
    </div>
  );
}
