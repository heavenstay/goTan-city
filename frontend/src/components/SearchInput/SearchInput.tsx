import "./SearchInput.scss";

export function SearchInput() {
  return (
    <div className="datalist">
      <input
        list="stops"
        name="stops-search"
        id="stops-search"
        placeholder="Search a stop"
      />
      <datalist id="stops">
        <option value="PetroDragonic Apocalypse"></option>
        <option value="Changes"></option>
        <option value="Laminated Denim"></option>
        <option value="Ice, Death, Planets, Lungs, Mushrooms and Lava"></option>
        <option value="Omnium Gatherum"></option>
        <option value="Made in Timeland"></option>
        <option value="Butterfly 3000"></option>
        <option value="L.W."></option>
        <option value="K.G."></option>
        <option value="Infest the Rats' Nest"></option>
        <option value="Fishing for Fishies"></option>
        <option value="Gumboot Soup"></option>
        <option value="Polygondwanaland"></option>
        <option value="Sketches of Brunswick East"></option>
        <option value="Murder of the Universe"></option>
        <option value="Flying Microtonal Banana"></option>
        <option value="Nonagon Infinity"></option>
        <option value="Paper Mâché Dream Balloon"></option>
        <option value="Quarters!"></option>
        <option value="I'm in Your Mind Fuzz"></option>
        <option value="Oddments"></option>
        <option value="Float Along - Fill Your Lungs"></option>
        <option value="Eyes Like the Sky"></option>
        <option value="12 Bar Bruise"></option>
      </datalist>
    </div>
  );
}
