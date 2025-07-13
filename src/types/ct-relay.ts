import type { Feature, GeoJsonProperties, Point } from "geojson";

export type Location = Feature<Point, LocationProperties>;

export type LocationProperties = GeoJsonProperties & {
  person: "Bex" | "Kelly";
};

export interface Handoff {
  datetime: Date;
  person: "Bex" | "Kelly";
}
