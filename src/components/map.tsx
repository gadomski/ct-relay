import "maplibre-gl/dist/maplibre-gl.css";
import { useRef } from "react";
import {
  Map as MaplibreMap,
  NavigationControl,
  ScaleControl,
  type MapRef,
} from "react-map-gl/maplibre";
import ColoradoTrail from "./colorado-trail";
import Control from "./control";
import Elevation from "./elevation";
import "./map.css";
import OpenTopoMap from "./open-topo-map";
import Segments from "./segments";
import Track from "./track";
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
          padding: {
            top: 20,
            left: 20,
            right: 20,
            bottom: 120,
          },
        },
      }}
      mapStyle={`https://basemaps.cartocdn.com/gl/${mapStyle}/style.json`}
      interactiveLayerIds={["track"]}
    >
      <ColoradoTrail></ColoradoTrail>
      <OpenTopoMap></OpenTopoMap>
      <Segments></Segments>
      <Track></Track>
      <NavigationControl></NavigationControl>
      <ScaleControl
        unit="imperial"
        position="top-left"
        style={{ marginTop: "210px", marginLeft: "20px" }}
      ></ScaleControl>
      <Control></Control>
      <Elevation></Elevation>
    </MaplibreMap>
  );
}
