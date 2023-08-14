import Map, { Source, Layer, Marker, Popup } from "react-map-gl";
import type { Feature, FeatureCollection, Point } from "geojson";
import "./GotanMap.scss";
import bus from "./../../assets/bus-pin.png";
import train from "./../../assets/train-pin.png";
import { useState } from "react";

const geojson: FeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      id: "BENA1",
      type: "Feature",
      geometry: { type: "Point", coordinates: [-1.53718842, 47.20411813] },
      properties: {
        name: "Beaulieu",
        type: "BUS",
        routes: ["4"],
        picture: null,
        feature_type: "stop",
        wheelchair_accessible: true,
      },
    },
    {
      id: "BENA2",
      type: "Feature",
      geometry: { type: "Point", coordinates: [-1.53704358, 47.20394287] },
      properties: {
        name: "Beaulieu",
        type: "BUS",
        routes: ["4"],
        picture: null,
        feature_type: "stop",
        wheelchair_accessible: true,
      },
    },
    {
      id: "BGAR1",
      type: "Feature",
      geometry: { type: "Point", coordinates: [-1.53125706, 47.19702208] },
      properties: {
        name: "Bonne Garde",
        type: "BUS",
        routes: ["4"],
        picture: null,
        feature_type: "stop",
        wheelchair_accessible: true,
      },
    },
    {
      id: "BGAR2",
      type: "Feature",
      geometry: { type: "Point", coordinates: [-1.53123758, 47.19675253] },
      properties: {
        name: "Bonne Garde",
        type: "BUS",
        routes: ["4"],
        picture: null,
        feature_type: "stop",
        wheelchair_accessible: true,
      },
    },
    {
      id: "BODO1",
      type: "Feature",
      geometry: { type: "Point", coordinates: [-1.52103414, 47.18718746] },
      properties: {
        name: "Bourdonnières",
        type: "BUS",
        routes: ["4"],
        picture: null,
        feature_type: "stop",
        wheelchair_accessible: true,
      },
    },
    {
      id: "BODO2",
      type: "Feature",
      geometry: { type: "Point", coordinates: [-1.52066465, 47.1875601] },
      properties: {
        name: "Bourdonnières",
        type: "BUS",
        routes: ["4"],
        picture: null,
        feature_type: "stop",
        wheelchair_accessible: true,
      },
    },
    {
      id: "CDCO1",
      type: "Feature",
      geometry: { type: "Point", coordinates: [-1.54501797, 47.21367185] },
      properties: {
        name: "Cité des Congrès",
        type: "BUS",
        routes: ["4"],
        picture: null,
        feature_type: "stop",
        wheelchair_accessible: true,
      },
    },
    {
      id: "CDCO2",
      type: "Feature",
      geometry: { type: "Point", coordinates: [-1.54487307, 47.2134966] },
      properties: {
        name: "Cité des Congrès",
        type: "BUS",
        routes: ["4"],
        picture: null,
        feature_type: "stop",
        wheelchair_accessible: true,
      },
    },
    {
      id: "CTOR1",
      type: "Feature",
      geometry: { type: "Point", coordinates: [-1.52908506, 47.19439301] },
      properties: {
        name: "Clos Toreau",
        type: "BUS",
        routes: ["4"],
        picture: null,
        feature_type: "stop",
        wheelchair_accessible: true,
      },
    },
    {
      id: "CTOR2",
      type: "Feature",
      geometry: { type: "Point", coordinates: [-1.5290656, 47.19412346] },
      properties: {
        name: "Clos Toreau",
        type: "BUS",
        routes: ["4"],
        picture: null,
        feature_type: "stop",
        wheelchair_accessible: true,
      },
    },
    {
      id: "CVER1",
      type: "Feature",
      geometry: { type: "Point", coordinates: [-1.5116739, 47.18930187] },
      properties: {
        name: "Chapeau Verni",
        type: "BUS",
        routes: ["4"],
        picture: null,
        feature_type: "stop",
        wheelchair_accessible: true,
      },
    },
    {
      id: "CVER2",
      type: "Feature",
      geometry: { type: "Point", coordinates: [-1.51034941, 47.18925604] },
      properties: {
        name: "Chapeau Verni",
        type: "BUS",
        routes: ["4"],
        picture: null,
        feature_type: "stop",
        wheelchair_accessible: true,
      },
    },
    {
      id: "DCAN3",
      type: "Feature",
      geometry: { type: "Point", coordinates: [-1.54692779, 47.2163095] },
      properties: {
        name: "Duchesse Anne-Chateau",
        type: "BUS",
        routes: ["4"],
        picture: null,
        feature_type: "stop",
        wheelchair_accessible: true,
      },
    },
    {
      id: "DCAN4",
      type: "Feature",
      geometry: { type: "Point", coordinates: [-1.54690823, 47.21603996] },
      properties: {
        name: "Duchesse Anne-Chateau",
        type: "BUS",
        routes: ["4"],
        picture: null,
        feature_type: "stop",
        wheelchair_accessible: true,
      },
    },
    {
      id: "FOCH1",
      type: "Feature",
      geometry: { type: "Point", coordinates: [-1.55031451, 47.21925758] },
      properties: {
        name: "Foch-Cathédrale",
        type: "BUS",
        routes: ["4"],
        picture: null,
        feature_type: "stop",
        wheelchair_accessible: true,
      },
    },
    {
      id: "GNRA1",
      type: "Feature",
      geometry: { type: "Point", coordinates: [-1.53356759, 47.19973652] },
      properties: {
        name: "Greneraie",
        type: "BUS",
        routes: ["4"],
        picture: null,
        feature_type: "stop",
        wheelchair_accessible: true,
      },
    },
    {
      id: "GNRA2",
      type: "Feature",
      geometry: { type: "Point", coordinates: [-1.53355459, 47.19955683] },
      properties: {
        name: "Greneraie",
        type: "BUS",
        routes: ["4"],
        picture: null,
        feature_type: "stop",
        wheelchair_accessible: true,
      },
    },
    {
      id: "IDNA1",
      type: "Feature",
      geometry: { type: "Point", coordinates: [-1.53893314, 47.20631111] },
      properties: {
        name: "Ile de Nantes",
        type: "BUS",
        routes: ["4"],
        picture: null,
        feature_type: "stop",
        wheelchair_accessible: true,
      },
    },
    {
      id: "IDNA2",
      type: "Feature",
      geometry: { type: "Point", coordinates: [-1.53877527, 47.20595616] },
      properties: {
        name: "Ile de Nantes",
        type: "BUS",
        routes: ["4"],
        picture: null,
        feature_type: "stop",
        wheelchair_accessible: true,
      },
    },
    {
      id: "JLVE1",
      type: "Feature",
      geometry: { type: "Point", coordinates: [-1.51724841, 47.18965588] },
      properties: {
        name: "Joliverie",
        type: "BUS",
        routes: ["4"],
        picture: null,
        feature_type: "stop",
        wheelchair_accessible: true,
      },
    },
    {
      id: "JLVE2",
      type: "Feature",
      geometry: { type: "Point", coordinates: [-1.51697834, 47.18957485] },
      properties: {
        name: "Joliverie",
        type: "BUS",
        routes: ["4"],
        picture: null,
        feature_type: "stop",
        wheelchair_accessible: true,
      },
    },
    {
      id: "MRAI1",
      type: "Feature",
      geometry: { type: "Point", coordinates: [-1.51069199, 47.18483142] },
      properties: {
        name: "Maraîchers",
        type: "BUS",
        routes: ["4"],
        picture: null,
        feature_type: "stop",
        wheelchair_accessible: true,
      },
    },
    {
      id: "MRAI2",
      type: "Feature",
      geometry: { type: "Point", coordinates: [-1.51054729, 47.18465612] },
      properties: {
        name: "Maraîchers",
        type: "BUS",
        routes: ["4"],
        picture: null,
        feature_type: "stop",
        wheelchair_accessible: true,
      },
    },
    {
      id: "MVSI1",
      type: "Feature",
      geometry: { type: "Point", coordinates: [-1.5256168, 47.19027625] },
      properties: {
        name: "Mauvoisins",
        type: "BUS",
        routes: ["4"],
        picture: null,
        feature_type: "stop",
        wheelchair_accessible: true,
      },
    },
    {
      id: "MVSI2",
      type: "Feature",
      geometry: { type: "Point", coordinates: [-1.52546555, 47.19001113] },
      properties: {
        name: "Mauvoisins",
        type: "BUS",
        routes: ["4"],
        picture: null,
        feature_type: "stop",
        wheelchair_accessible: true,
      },
    },
    {
      id: "PVTO1",
      type: "Feature",
      geometry: { type: "Point", coordinates: [-1.50526192, 47.18095976] },
      properties: {
        name: "Porte de Vertou",
        type: "BUS",
        routes: ["4"],
        picture: null,
        feature_type: "stop",
        wheelchair_accessible: true,
      },
    },
    {
      id: "PVTO2",
      type: "Feature",
      geometry: { type: "Point", coordinates: [-1.50497902, 47.180699] },
      properties: {
        name: "Porte de Vertou",
        type: "BUS",
        routes: ["4"],
        picture: null,
        feature_type: "stop",
        wheelchair_accessible: true,
      },
    },
    {
      id: "TPOD1",
      type: "Feature",
      geometry: { type: "Point", coordinates: [-1.540678, 47.20850406] },
      properties: {
        name: "Tripode",
        type: "BUS",
        routes: ["4"],
        picture: null,
        feature_type: "stop",
        wheelchair_accessible: true,
      },
    },
    {
      id: "TPOD2",
      type: "Feature",
      geometry: { type: "Point", coordinates: [-1.54065196, 47.20814468] },
      properties: {
        name: "Tripode",
        type: "BUS",
        routes: ["4"],
        picture: null,
        feature_type: "stop",
        wheelchair_accessible: true,
      },
    },
    {
      id: "4-0",
      type: "Feature",
      geometry: {
        type: "MultiLineString",
        coordinates: [
          [
            [-1.50526192, 47.18095976],
            [-1.51069199, 47.18483142],
            [-1.5116739, 47.18930187],
            [-1.51724841, 47.18965588],
            [-1.52103414, 47.18718746],
            [-1.5256168, 47.19027625],
            [-1.52908506, 47.19439301],
            [-1.53125706, 47.19702208],
            [-1.53356759, 47.19973652],
            [-1.53718842, 47.20411813],
            [-1.53893314, 47.20631111],
            [-1.540678, 47.20850406],
            [-1.54501797, 47.21367185],
            [-1.54692779, 47.2163095],
            [-1.55031451, 47.21925758],
            [-1.54690823, 47.21603996],
            [-1.54487307, 47.2134966],
            [-1.54065196, 47.20814468],
            [-1.53877527, 47.20595616],
            [-1.53704358, 47.20394287],
            [-1.53355459, 47.19955683],
            [-1.53123758, 47.19675253],
            [-1.5290656, 47.19412346],
            [-1.52546555, 47.19001113],
            [-1.52066465, 47.1875601],
            [-1.51697834, 47.18957485],
            [-1.51034941, 47.18925604],
            [-1.51054729, 47.18465612],
            [-1.50497902, 47.180699],
          ],
        ],
      },
      properties: {
        color: "#FDC600",
        long_name: "Foch - Cathédrale - Porte de Vertou",
        short_name: "4",
        feature_type: "route",
      },
    },
  ],
};

export function GotanMap() {
  const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

  const [viewState, setViewState] = useState({
    longitude: -1.5675348693361855,
    latitude: 47.22197283966,
    zoom: 12,
  });
  const [popupInfo, setPopupInfo] = useState<Feature<Point> | null>(null);

  return (
    <div className="gotan-map">
      <Map
        {...viewState}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
        onMove={(evt) => setViewState(evt.viewState)}
      >
        <Source id="my-data" type="geojson" data={geojson}>
          {geojson.features.map((feature: Feature) => {
            if (feature?.properties?.feature_type === "route") {
              return (
                <Layer
                  key={feature.id + "_LAYER"}
                  type="line"
                  paint={{
                    "line-color": ["get", "color", ["properties"]],
                    "line-width": 2,
                  }}
                />
              );
            } else if (
              feature?.properties?.feature_type === "stop" &&
              viewState.zoom > 15
            ) {
              const point = feature as Feature<Point>;

              return (
                <Marker
                  key={point.id + "_MARKER"}
                  longitude={point.geometry.coordinates[0]}
                  latitude={point.geometry.coordinates[1]}
                  onClick={() => {
                    setPopupInfo(point);
                  }}
                >
                  <img
                    src={point.properties?.type === "BUS" ? bus : train}
                    alt="description"
                    width="60"
                    height="60"
                  />
                </Marker>
              );
            }
          })}
        </Source>

        {popupInfo && (
          <Popup
            key={popupInfo.id + "_POPUP"}
            longitude={popupInfo.geometry.coordinates[0]}
            latitude={popupInfo.geometry.coordinates[1]}
            closeOnClick={false}
            onClose={() => setPopupInfo(null)}
          >
            <div className="popup-content">
              <h3>{popupInfo.properties?.name}</h3>
              <div className="popup-details">
                <div className="detail-column">
                  <div className="detail">
                    <h4 className="detail-title">Informations </h4>
                    <p className="detail-content">
                      Type : {popupInfo.properties?.type}
                    </p>
                    <p className="detail-content">
                      Accessibilité handicapé :{" "}
                      {popupInfo.properties?.wheelchair_accessible
                        ? "oui"
                        : "non"}
                    </p>
                  </div>
                </div>
                <div className="detail-column">
                  <div className="detail">
                    <h4 className="detail-title">Trajets</h4>
                    <p className="detail-content">
                      {" "}
                      {popupInfo.properties?.routes}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}
