import { along, featureCollection, length } from "@turf/turf";
import type { Feature, LineString } from "geojson";
import useColoradoTrail from "./colorado-trail";

export default function useSegmentPoints() {
  const coloradoTrail = useColoradoTrail();
  const centers = featureCollection(
    coloradoTrail.features.map((feature: Feature<LineString>) => {
      const point = along(feature.geometry, length(feature) / 2);
      if (point.properties) {
        point.properties.segment = feature.properties?.segment;
      }
      return point;
    })
  );
  const starts = featureCollection(
    coloradoTrail.features.map((feature: Feature<LineString>) => {
      const point = along(feature.geometry, 0);
      if (point.properties) {
        point.properties.segment = feature.properties?.segment;
      }
      return point;
    })
  );
  const ends = featureCollection(
    coloradoTrail.features.map((feature: Feature<LineString>) => {
      const point = along(feature.geometry, length(feature));
      if (point.properties) {
        point.properties.segment = feature.properties?.segment;
      }
      return point;
    })
  );
  return { centers, starts, ends };
}
