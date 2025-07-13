import "maplibre-gl/dist/maplibre-gl.css";
import { useRef } from "react";
import {
  Map as MaplibreMap,
  NavigationControl,
  ScaleControl,
  type MapRef,
} from "react-map-gl/maplibre";
import useAppState from "../hooks/app-state";
import ColoradoTrail from "./colorado-trail";
import Legs from "./legs";
import "./map.css";
import Track from "./track";
import { useColorModeValue } from "./ui/color-mode";

export default function Map() {
  const mapRef = useRef<MapRef>(null);
  const mapStyle = useColorModeValue(
    "positron-gl-style",
    "dark-matter-gl-style"
  );
  const { showTrack } = useAppState();

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
      interactiveLayerIds={["track"]}
    >
      <Legs></Legs>
      {showTrack && <Track></Track>}
      <ColoradoTrail></ColoradoTrail>
      <NavigationControl></NavigationControl>
      <ScaleControl unit="imperial"></ScaleControl>
    </MaplibreMap>
  );
}
