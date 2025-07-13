import type { ExpressionSpecification } from "maplibre-gl";

export const BEX_SOLID = "#17A34A";
export const KELLY_SOLID = "#2463EB";

export const PERSON_COLORS: ExpressionSpecification = [
  "match",
  ["get", "person"],
  "Bex",
  BEX_SOLID,
  "Kelly",
  KELLY_SOLID,
  "black",
];
