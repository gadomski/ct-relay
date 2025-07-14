import { featureCollection, point } from "@turf/turf";
import type { FeatureCollection, LineString } from "geojson";
import { Layer, Source } from "react-map-gl/maplibre";
import data from "../data/colorado-trail-segments.json";
import useAppState from "../hooks/app-state";
import { useColorModeValue } from "./ui/color-mode";

export default function Segments() {
  const { showSegments } = useAppState();
  const points = (
    data as FeatureCollection<LineString, { segment: number }>
  ).features.map((feature) =>
    point(
      feature.geometry.coordinates[
        // Hack to deal with five being backwards
        feature.properties.segment == 5
          ? 0
          : feature.geometry.coordinates.length - 1
      ],
      { segment: feature.properties.segment }
    )
  );
  const primaryColor = useColorModeValue("black", "white");
  const secondaryColor = useColorModeValue("white", "black");

  return (
    <Source
      type="geojson"
      data={featureCollection(points)}
      id="segments-source"
    >
      <Layer
        id="segment-ends"
        type="circle"
        layout={{ visibility: showSegments ? "visible" : "none" }}
        paint={{ "circle-color": primaryColor, "circle-radius": 10 }}
      ></Layer>
      <Layer
        id="segment-ends-inner"
        type="circle"
        layout={{ visibility: showSegments ? "visible" : "none" }}
        paint={{ "circle-color": secondaryColor, "circle-radius": 8 }}
      ></Layer>
      <Layer
        id="segment-numbers"
        type="symbol"
        layout={{
          "text-field": ["get", "segment"],
          "text-size": 10,
          visibility: showSegments ? "visible" : "none",
        }}
        paint={{ "text-color": primaryColor }}
      ></Layer>
    </Source>
  );
}
