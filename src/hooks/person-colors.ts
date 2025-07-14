import type { ExpressionSpecification } from "maplibre-gl";
import { useColorModeValue } from "../components/ui/color-mode";

export const BEX_SOLID = "#17A34A";
export const KELLY_SOLID = "#2463EB";

export default function usePersonColors() {
  return [
    "match",
    ["get", "person"],
    "Bex",
    BEX_SOLID,
    "Kelly",
    KELLY_SOLID,
    useFallbackPersonColor(),
  ] as ExpressionSpecification;
}

export function useFallbackPersonColor() {
  return useColorModeValue("black", "white");
}
