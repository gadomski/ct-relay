import { featureCollection, point } from "@turf/turf";
import type { FeatureCollection, LineString } from "geojson";
import { Layer, Source } from "react-map-gl/maplibre";
import useColors from "../hooks/colors";

export default function Segments({
  segments,
  showSegments,
}: {
  segments: FeatureCollection<LineString>;
  showSegments: boolean;
}) {
  const { primaryColor, secondaryColor } = useColors();
  const layout: { visibility: "visible" | "none" | undefined } = {
    visibility: showSegments ? "visible" : "none",
  };

  return (
    <Source
      id="segments-source"
      type="geojson"
      data={featureCollection(
        segments.features.map((segment) =>
          point(
            segment.geometry.coordinates[
              segment.geometry.coordinates.length - 1
            ],
            segment.properties,
            { id: segment.id }
          )
        )
      )}
    >
      <Layer
        id="segment-end-outer"
        type="circle"
        layout={layout}
        paint={{ "circle-radius": 10, "circle-color": primaryColor }}
      ></Layer>
      <Layer
        id="segment-end-inner"
        type="circle"
        layout={layout}
        paint={{ "circle-radius": 8, "circle-color": secondaryColor }}
      ></Layer>
      <Layer
        id="segment-end-number"
        type="symbol"
        layout={{
          ...layout,
          "text-field": ["id"],
          "text-size": 10,
        }}
        paint={{ "text-color": primaryColor }}
      ></Layer>
    </Source>
  );
}
