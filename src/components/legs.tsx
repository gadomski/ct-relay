import { featureCollection } from "@turf/turf";
import { Layer, Source } from "react-map-gl/maplibre";
import useAppState from "../hooks/app-state";
import usePersonColors from "../hooks/person-colors";

export default function Legs() {
  const { legs } = useAppState();

  return (
    <Source data={featureCollection(legs)} type="geojson" id="legs-source">
      <Layer
        id="legs"
        type="line"
        layout={{ "line-cap": "butt", "line-join": "round" }}
        paint={{
          "line-color": usePersonColors(),
          "line-width": 6,
          "line-opacity": 0.8,
        }}
      ></Layer>
    </Source>
  );
}
