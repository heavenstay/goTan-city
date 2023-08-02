import Map from 'react-map-gl/maplibre';

export function GotanMap() {
  const mapStyle: string = `https://api.maptiler.com/maps/streets/style.json?key=${import.meta.env.VITE_MAPTILER_KEY}`;

  return (
      <Map
          initialViewState={{
              longitude: -122.4,
              latitude: 37.8,
              zoom: 14
          }}
          style={{width: 1200, height: 600}}
          mapStyle={mapStyle}
      />
  );
}