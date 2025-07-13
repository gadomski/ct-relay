import type { FeatureCollection } from "geojson";
import { Layer, Source } from "react-map-gl/maplibre";
import coloradoTrail from "../data/colorado-trail.json";
import { useColorModeValue } from "./ui/color-mode";

export default function ColoradoTrail() {
  const color = useColorModeValue("black", "white");

  return (
    <Source
      data={coloradoTrail as FeatureCollection}
      type="geojson"
      id="colorado-trail"
    >
      <Layer
        type="line"
        id="colorado-trail-line"
        paint={{ "line-color": color }}
      ></Layer>
    </Source>
  );
}
