import type { FeatureCollection } from "geojson";
import "maplibre-gl/dist/maplibre-gl.css";
import { useRef } from "react";
import {
  Layer,
  Map as MaplibreMap,
  type MapRef,
  Source,
} from "react-map-gl/maplibre";
import coloradoTrail from "../data/colorado-trail.json";
import useLocations from "../hooks/locations";

export default function Map() {
  const mapRef = useRef<MapRef>(null);
  const locations = useLocations();

  return (
    <MaplibreMap
      id="map"
      ref={mapRef}
      initialViewState={{
        longitude: -106,
        latitude: 38,
        zoom: 4,
      }}
      mapStyle={"https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"}
      style={{
        height: "100%",
        width: "100%",
      }}
      onLoad={() => {
        mapRef.current?.fitBounds([-108.03876, 37.33136, -105.09369, 39.5515], {
          padding: 20,
        });
      }}
    >
      <Source data={locations} type="geojson">
        <Layer
          id="locations"
          type={"circle"}
          paint={{
            "circle-radius": 6,
            "circle-color": [
              "match",
              ["get", "person"],
              "Bex",
              "#17A34A",
              "Kelly",
              "#2463EB",
              "black",
            ],
          }}
        ></Layer>
      </Source>
      <Source data={coloradoTrail as FeatureCollection} type="geojson">
        <Layer id="coloradoTrail" type={"line"}></Layer>
      </Source>
    </MaplibreMap>
  );
}
