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
    <>
      <Source
        id="segment-start-source"
        type="geojson"
        data={featureCollection(
          segments.features.map((segment) =>
            point(segment.geometry.coordinates[2], segment.properties, {
              id: segment.id,
            })
          )
        )}
      >
        <Layer
          id="segment-start-outer"
          type="circle"
          layout={layout}
          paint={{ "circle-radius": 10, "circle-color": primaryColor }}
        ></Layer>
        <Layer
          id="segment-start-inner"
          type="circle"
          layout={layout}
          paint={{ "circle-radius": 8, "circle-color": secondaryColor }}
        ></Layer>
        <Layer
          id="segment-start-number"
          type="symbol"
          layout={{
            ...layout,
            "text-field": ["id"],
            "text-size": 10,
          }}
          paint={{ "text-color": primaryColor }}
        ></Layer>
      </Source>
      <Source
        id="segment-end-source"
        type="geojson"
        data={featureCollection(
          segments.features.map((segment) =>
            point(
              segment.geometry.coordinates[
                segment.geometry.coordinates.length - 3
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
    </>
  );
}
