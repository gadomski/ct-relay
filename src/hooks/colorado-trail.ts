import type { FeatureCollection, LineString } from "geojson";
import data from "../data/colorado-trail.json";

export default function useColoradoTrail() {
  return data as FeatureCollection<LineString>;
}
