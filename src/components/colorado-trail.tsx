import { featureCollection, lineSlice } from "@turf/turf";
import type { FeatureCollection, LineString } from "geojson";
import { Layer, Source } from "react-map-gl/maplibre";
import coloradoTrail from "../data/colorado-trail.json";
import { getHandoffLocations } from "../utils/handoffs";
import getLastSeen from "../utils/last-seen";
import { PERSON_COLORS } from "./colors";
import { useColorModeValue } from "./ui/color-mode";

export default function ColoradoTrail() {
  const lineColor = useColorModeValue("black", "white");
  const lastSeen = getLastSeen();

  const locations = getHandoffLocations();
  locations.push(lastSeen);

  const line = (coloradoTrail as FeatureCollection<LineString>).features[0];
  const lines = [];
  for (let index = 0; index < locations.length - 1; index++) {
    const a = locations[index];
    const b = locations[index + 1];
    const slice = lineSlice(
      index === 0 ? line.geometry.coordinates[0] : a,
      b,
      line
    );
    slice.properties = {};
    slice.properties.person = a.properties?.person;
    lines.push(slice);
  }

  return (
    <>
      <Source
        data={coloradoTrail as FeatureCollection}
        type="geojson"
        id="colorado-trail"
      >
        <Layer
          type="line"
          id="colorado-trail"
          paint={{ "line-color": lineColor }}
        ></Layer>
      </Source>
      <Source
        data={featureCollection(lines)}
        type="geojson"
        id="colorado-trail-completed"
      >
        <Layer
          type="line"
          id="colorado-trail-line"
          paint={{ "line-color": PERSON_COLORS, "line-width": 4 }}
        ></Layer>
      </Source>
    </>
  );
}
