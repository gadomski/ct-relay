import { featureCollection } from "@turf/turf";
import type { Feature, LineString } from "geojson";
import { Layer, Source } from "react-map-gl/maplibre";
import useColors, { MAPLIBRE_PERSON_COLOR } from "../hooks/colors";
import type { Legs } from "../types/ct-relay";

export default function Trail({
  coloradoTrail,
  legs,
}: {
  coloradoTrail: Feature<LineString>;
  legs: Legs;
}) {
  const { primaryColor, secondaryColor } = useColors();

  return (
    <>
      <Source id="colorado-trail-source" type="geojson" data={coloradoTrail}>
        <Layer
          id="colorado-trail-buffer"
          type="line"
          paint={{ "line-color": secondaryColor, "line-width": 6 }}
        ></Layer>
        <Layer
          id="colorado-trail"
          type="line"
          paint={{ "line-color": primaryColor, "line-width": 2 }}
        ></Layer>
      </Source>
      <Source id="legs-source" type="geojson" data={featureCollection(legs)}>
        <Layer
          id="legs"
          type="line"
          beforeId="colorado-trail"
          paint={{ "line-width": 6, "line-color": MAPLIBRE_PERSON_COLOR }}
        ></Layer>
      </Source>
    </>
  );
}
