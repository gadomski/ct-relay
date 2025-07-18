import { Card, FormatNumber } from "@chakra-ui/react";
import { featureCollection, length, point } from "@turf/turf";
import type { Feature, FeatureCollection, LineString } from "geojson";
import { useEffect, useState } from "react";
import {
  Layer,
  Popup,
  Source,
  useMap,
  type MapMouseEvent,
} from "react-map-gl/maplibre";
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
  const [segmentId, setSegmentId] = useState<number>();
  const [segment, setSegment] = useState<Feature<LineString>>();
  const map = useMap();

  useEffect(() => {
    const pointer = () => {
      if (map.current) {
        map.current.getCanvas().style.cursor = "pointer";
      }
    };

    const defaultCursor = () => {
      if (map.current) {
        map.current.getCanvas().style.cursor = "";
      }
    };

    const showPopup = (e: MapMouseEvent) => {
      if (e.features) {
        setSegmentId(e.features[0]?.id as number | undefined);
      }
    };

    if (map.current) {
      map.current.on("mouseenter", "segment-end-outer", pointer);
      map.current.on("click", "segment-end-outer", showPopup);
      map.current.on("mouseleave", "segment-end-outer", defaultCursor);
    }
  }, [map]);

  useEffect(() => {
    setSegment(segments.features.find((feature) => feature.id === segmentId));
  }, [segmentId, segments.features]);

  return (
    <>
      <Source type="geojson" data={segments} id="segments-source">
        <Layer
          id="segment"
          type="line"
          paint={{
            "line-width": ["case", ["==", ["id"], segmentId || 0], 4, 0],
            "line-color": "#FDE047",
          }}
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
      {segment && (
        <Popup
          longitude={
            segment.geometry.coordinates[
              segment.geometry.coordinates.length - 1
            ][0]
          }
          latitude={
            segment.geometry.coordinates[
              segment.geometry.coordinates.length - 1
            ][1]
          }
          onClose={() => setSegmentId(undefined)}
          closeButton={false}
        >
          <Card.Root size={"sm"}>
            <Card.Body>
              <Card.Title>Segment {segment.id}</Card.Title>
              <Card.Description>
                <FormatNumber
                  value={Number(length(segment, { units: "miles" }).toFixed(1))}
                  style="unit"
                  unit="mile"
                ></FormatNumber>
              </Card.Description>
            </Card.Body>
          </Card.Root>
        </Popup>
      )}
    </>
  );
}
