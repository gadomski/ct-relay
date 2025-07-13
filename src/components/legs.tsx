import { featureCollection } from "@turf/turf";
import { Layer, Source } from "react-map-gl/maplibre";
import useAppState from "../hooks/app-state";
import { PERSON_COLORS } from "./colors";

export default function Legs() {
  const { legs } = useAppState();
  return (
    <Source data={featureCollection(legs)} type="geojson" id="legs-source">
      <Layer
        type="line"
        layout={{ "line-cap": "butt", "line-join": "round" }}
        paint={{
          "line-color": PERSON_COLORS,
          "line-width": 6,
          "line-opacity": 0.8,
        }}
      ></Layer>
    </Source>
  );
}
