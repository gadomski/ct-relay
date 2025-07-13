import "maplibre-gl/dist/maplibre-gl.css";
import { useRef } from "react";
import {
  Map as MaplibreMap,
  NavigationControl,
  ScaleControl,
  type MapRef,
} from "react-map-gl/maplibre";
import ColoradoTrail from "./colorado-trail";
import LastSeen from "./last-seen";
import "./map.css";
import { useColorModeValue } from "./ui/color-mode";

export default function Map() {
  const mapRef = useRef<MapRef>(null);
  const mapStyle = useColorModeValue(
    "positron-gl-style",
    "dark-matter-gl-style"
  );

  return (
    <MaplibreMap
      id="map"
      ref={mapRef}
      initialViewState={{
        bounds: [-108.03876, 37.33136, -105.09369, 39.5515],
        fitBoundsOptions: {
          padding: 20,
        },
      }}
      mapStyle={`https://basemaps.cartocdn.com/gl/${mapStyle}/style.json`}
      interactiveLayerIds={["last-seen-circle"]}
    >
      <ColoradoTrail></ColoradoTrail>
      <LastSeen></LastSeen>
      <NavigationControl></NavigationControl>
      <ScaleControl unit="imperial"></ScaleControl>
    </MaplibreMap>
  );
}
