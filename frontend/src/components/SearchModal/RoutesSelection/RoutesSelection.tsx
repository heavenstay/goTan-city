import "./RoutesSelection.scss";
import { IonIcon } from "@ionic/react";
import { trainSharp, busSharp } from "ionicons/icons";
import { useContext, useEffect, useState } from "react";
import {
  MapContext,
  MapProperties,
  defaultViewState,
} from "../../../context/MapContext";
import { Route } from "../../../interfaces/Route";

export function RoutesSelection() {
  const { setViewState, setSelectedRouteId, setSelectedStationId } =
    useContext<MapProperties>(MapContext);

  const [trainRoutes, setTrainRoutes] = useState<Route[]>([]);
  const [busRoutes, setBusRoutes] = useState<Route[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/routes`)
      .then((response) => response.json())
      .then((routes: Route[]) => {
        setTrainRoutes(routes.filter((route: Route) => route.type === "TRAM"));
        setBusRoutes(routes.filter((route: Route) => route.type === "BUS"));
      })
      .catch((error) => {
        console.error("Error fetching the routes:", error);
      });
  }, []);

  const handleRouteChange = (route: Route) => {
    setViewState(defaultViewState);
    setSelectedStationId(undefined);
    setSelectedRouteId(route.id);
  };

  return (
    <div className="routes-selection">
      <h2>Filter by routes</h2>
      <div className="row">
        <IonIcon icon={trainSharp} />
        {trainRoutes.map((route) => (
          <div
            className="route-icon"
            style={{ backgroundColor: route.color }}
            key={route.id}
            onClick={() => handleRouteChange(route)}
          >
            <span>{route.shortName}</span>
          </div>
        ))}
      </div>
      <div className="row">
        <IonIcon icon={busSharp} />
        {busRoutes.map((route) => (
          <div
            className="route-icon"
            style={{ backgroundColor: route.color }}
            key={route.id}
            onClick={() => handleRouteChange(route)}
          >
            <span>{route.shortName}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
