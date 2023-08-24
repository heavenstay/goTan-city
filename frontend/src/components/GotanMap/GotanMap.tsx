import Map, { Source, Layer, Marker, Popup } from "react-map-gl";
import type { Feature, FeatureCollection, Point } from "geojson";
import "./GotanMap.scss";
import bus from "./../../assets/pin/bus-pin.png";
import train from "./../../assets/pin/train-pin.png";
import { useContext, useEffect, useState } from "react";
import { MapContext, MapProperties } from "../../context/MapContext";
import { TransportType } from "../../interfaces/Route";

export function GotanMap() {
  const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

  const { viewState, setViewState, selectedRouteId, selectedStationId } =
    useContext<MapProperties>(MapContext);

  const [geojson, setGeojson] = useState<FeatureCollection>({
    type: "FeatureCollection",
    features: [],
  });

  const [popupInfo, setPopupInfo] = useState<Feature<Point> | null>(null);

  useEffect(() => {
    const queryParams: string[] = [];

    if (selectedRouteId) queryParams.push(`routeId=${selectedRouteId}`);
    if (selectedStationId) queryParams.push(`stationId=${selectedStationId}`);

    let fullUrl = `${import.meta.env.VITE_API_URL}/layers`;
    if (queryParams.length > 0) fullUrl += "?" + queryParams.join("&");

    fetch(fullUrl)
      .then((response) => response.json())
      .then((layer: FeatureCollection) => {
        if (!layer.features) {
          setGeojson({
            type: "FeatureCollection",
            features: [],
          });
        } else {
          setGeojson(layer);
        }
      })
      .catch((error) => {
        console.error("Error fetching the layers:", error);
      });
  }, [selectedRouteId, selectedStationId]);

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
            if (feature?.properties?.featureType === "route") {
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
              feature?.properties?.featureType === "stop" &&
              viewState.zoom > 15
            ) {
              const point = feature as Feature<Point>;

              return (
                <Marker
                  key={point.id + "_MARKER"}
                  longitude={point.geometry.coordinates[0]}
                  latitude={point.geometry.coordinates[1]}
                  onClick={() => {
                    setViewState({
                      longitude: point.geometry.coordinates[0],
                      latitude: point.geometry.coordinates[1],
                      zoom: 20,
                    });
                    setPopupInfo(point);
                  }}
                >
                  <img
                    src={
                      point.properties?.type === TransportType.BUS ? bus : train
                    }
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
                      Wheelchair accessibility :{" "}
                      {popupInfo.properties?.wheelchairAccessible
                        ? "Yes"
                        : "No"}
                    </p>
                  </div>
                </div>
                <div className="detail-column">
                  <div className="detail">
                    <h4 className="detail-title">Routes</h4>
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
