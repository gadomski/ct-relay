import { featureCollection } from "@turf/turf";
import type { Feature, LineString } from "geojson";
import { useEffect, useState } from "react";
import { Layer, Source, useMap } from "react-map-gl/maplibre";
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
  const [hoveredLeg, setHoveredLeg] = useState<number>();
  const map = useMap();

  useEffect(() => {
    if (map.current) {
      map.current.on("mouseenter", "legs", (e) => {
        setHoveredLeg(e.features && Number(e.features[0].id));
      });

      map.current.on("mouseleave", "legs", () => {
        setHoveredLeg(undefined);
      });
    }
  }, [map]);

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
          paint={{
            "line-width": [
              "case",
              ["==", ["to-number", ["id"]], hoveredLeg || -1],
              10,
              6,
            ],
            "line-color": MAPLIBRE_PERSON_COLOR,
          }}
        ></Layer>
      </Source>
    </>
  );
}
