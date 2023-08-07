import "./App.scss";
import { GotanMap } from "./components/GotanMap/GotanMap";
import { SearchModal } from "./components/SearchModal/SearchModal";

function App() {
  return (
    <div className="content">
      <GotanMap />
      <SearchModal />
    </div>
  );
}

export default App;
