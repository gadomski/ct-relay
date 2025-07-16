import type { ExpressionSpecification } from "maplibre-gl";
import { useColorModeValue } from "../components/ui/color-mode";

export const BEX_COLOR = "#17A34A";
export const KELLY_COLOR = "#2463EB";

export const MAPLIBRE_PERSON_COLOR: ExpressionSpecification = [
  "match",
  ["get", "person"],
  "Bex",
  BEX_COLOR,
  "Kelly",
  KELLY_COLOR,
  "#666666",
];

export default function useColors() {
  const primaryColor = useColorModeValue("black", "white");
  const secondaryColor = useColorModeValue("white", "black");

  return { primaryColor, secondaryColor };
}
