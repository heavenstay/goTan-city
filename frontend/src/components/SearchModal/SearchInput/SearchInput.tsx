import { ChangeEvent, useContext, useEffect, useState } from "react";
import "./SearchInput.scss";
import { MapContext, MapProperties } from "../../../context/MapContext";
import { Station } from "../../../interfaces/Station";

export function SearchInput() {
  const { setViewState, setSelectedRouteId, setSelectedStationId } =
    useContext<MapProperties>(MapContext);

  const [stations, setStations] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/stations`)
      .then((response) => response.json())
      .then((data) => {
        setStations(data);
      })
      .catch((error) => {
        console.error("Error fetching the stops:", error);
      });
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    // Check if the input value matches one of the station names
    const selectedStation: Station | undefined = stations.find(
      (station: Station) => station.name === value
    );
    if (selectedStation) {
      const station: Station = selectedStation;
      setViewState({
        longitude: station.longitude,
        latitude: station.latitude,
        zoom: 18,
      });
      setSelectedRouteId(undefined);
      setSelectedStationId(station.id);
    }
  };

  return (
    <div className="datalist">
      <input
        list="stations"
        name="stations-search"
        id="stations-search"
        placeholder="Search a stations"
        onChange={handleInputChange}
      />
      <datalist id="stations">
        {stations.map((station: Station) => (
          <option value={station.name} key={station.id}></option>
        ))}
      </datalist>
    </div>
  );
}
