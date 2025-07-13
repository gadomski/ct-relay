import type { Feature, LineString, Point } from "geojson";
import { createContext } from "react";
import type { Checkin, Person } from "./types/ct-relay";

export interface ContextType {
  coloradoTrail: LineString;
  track: Feature<Point, Checkin>[];
  legs: Feature<LineString, { person: Person }>[];
  showTrack: boolean;
  setShowTrack: (showTrack: boolean) => void;
}

export const Context = createContext<ContextType | null>(null);
