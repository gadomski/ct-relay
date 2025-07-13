import type { ExpressionSpecification } from "maplibre-gl";

export const PERSON_COLORS: ExpressionSpecification = [
  "match",
  ["get", "person"],
  "Bex",
  "#17A34A",
  "Kelly",
  "#2463EB",
  "black",
];
