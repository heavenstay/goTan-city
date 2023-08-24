import "./RoutesSelection.scss";
import { useContext, useEffect, useState } from "react";
import {
  MapContext,
  MapProperties,
  defaultViewState,
} from "../../../context/MapContext";
import { Route, TransportType } from "../../../interfaces/Route";
import trainSharp from "./../../../assets/icon/train-sharp.svg";
import busSharp from "./../../../assets/icon/bus-sharp.svg";

export function RoutesSelection() {
  const { setViewState, setSelectedRouteId, setSelectedStationId } =
    useContext<MapProperties>(MapContext);

    const [routes, setRoutes] = useState<Route[]>([]);
    
    useEffect(() => {
      // Fetch routes
      fetch(`${import.meta.env.VITE_API_URL}/routes`)
        .then((response) => response.json())
        .then((routes: Route[]) => {
          setRoutes(routes);
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
        <img src={trainSharp} alt="Train icon" width={30} />
        {routes
          .filter((route: Route) => route.type === TransportType.TRAM)
          .map((route) => (
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
        <img src={busSharp} alt="Bus icon" width={30} />
        {routes
          .filter((route: Route) => route.type === TransportType.BUS)
          .map((route) => (
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
