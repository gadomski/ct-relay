import { feature } from "@turf/turf";
import { Layer, Source } from "react-map-gl/maplibre";
import useAppState from "../hooks/app-state";
import { useColorModeValue } from "./ui/color-mode";

export default function ColoradoTrail() {
  const lineColor = useColorModeValue("black", "white");
  const { coloradoTrail } = useAppState();

  return (
    <Source
      data={feature(coloradoTrail)}
      type="geojson"
      id="colorado-trail-source"
    >
      <Layer
        type="line"
        id="colorado-trail"
        paint={{ "line-color": lineColor }}
      ></Layer>
    </Source>
  );
}
