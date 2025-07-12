import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef } from "react";
import { Layer, Map as MaplibreMap, Source } from "react-map-gl/maplibre";
import useLocations from "../hooks/locations";

export default function Map() {
  const mapRef = useRef(null);
  const locations = useLocations();

  useEffect(() => {}, [locations]);

  return (
    <MaplibreMap
      id="map"
      ref={mapRef}
      initialViewState={{
        longitude: 0,
        latitude: 0,
        zoom: 1,
      }}
      mapStyle={"https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"}
      style={{
        height: "100dvh",
        width: "100dvw",
      }}
    >
      <Source data={locations} type="geojson">
        <Layer id="locations" type={"circle"}></Layer>
      </Source>
    </MaplibreMap>
  );
}
