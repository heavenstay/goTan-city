import { useState } from "react";
import "./App.scss";
import { GotanMap } from "./components/GotanMap/GotanMap";
import { SearchModal } from "./components/SearchModal/SearchModal";
import { MapContext, MapViewState, defaultViewState } from "./context/MapContext";

function App() {
  const [viewState, setViewState] = useState<MapViewState>(defaultViewState);
  const [selectedRouteId, setSelectedRouteId] = useState<string | undefined>();
  const [selectedStationId, setSelectedStationId] = useState<string | undefined>();

  return (
    <MapContext.Provider
      value={{
        viewState,
        setViewState,
        selectedRouteId: selectedRouteId,
        setSelectedRouteId: setSelectedRouteId,
        selectedStationId: selectedStationId,
        setSelectedStationId: setSelectedStationId,
      }}
    >
      <div className="content">
        <GotanMap />
        <SearchModal />
      </div>
    </MapContext.Provider>
  );
}

export default App;
