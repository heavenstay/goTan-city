import "./RoutesSelection.scss";
import { IonIcon } from "@ionic/react";
import { trainSharp, busSharp } from "ionicons/icons"

export function RoutesSelection() {
  return (
    <div className="routes-selection">
      <h2>Filter by routes</h2>
      <div className="row">
        <IonIcon icon={trainSharp} />
        <div className="route-icon" style={{ backgroundColor: "#007a45" }}>
          <span>1</span>
        </div>
        <div className="route-icon" style={{ backgroundColor: "#e53138" }}>
          <span>2</span>
        </div>
        <div className="route-icon" style={{ backgroundColor: "#0079bc" }}>
          <span>3</span>
        </div>
      </div>
      <div className="row">
        <IonIcon icon={busSharp} />
        <div className="route-icon" style={{ backgroundColor: "#fdc600" }}>
          <span>4</span>
        </div>
        <div className="route-icon" style={{ backgroundColor: "#34b4e4" }}>
          <span>5</span>
        </div>
      </div>
    </div>
  );
}
