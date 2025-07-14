import type { Feature, LineString, Point } from "geojson";
import { createContext } from "react";
import type { Checkin, CheckinRange } from "./types/ct-relay";

export interface ContextType {
  coloradoTrail: LineString;
  track: Feature<Point, Checkin>[];
  legs: Feature<LineString, CheckinRange>[];
  showTrack: boolean;
  setShowTrack: (showTrack: boolean) => void;
  showSegments: boolean;
  setShowSegments: (showSegments: boolean) => void;
  showOpenTopoMap: boolean;
  setShowOpenTopoMap: (showOpenTopoMap: boolean) => void;
}

export const Context = createContext<ContextType | null>(null);
