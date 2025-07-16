import { featureCollection } from "@turf/turf";
import { Layer, Source } from "react-map-gl/maplibre";
import useColors from "../hooks/colors";
import type { Track as TrackType } from "../types/ct-relay";

export default function Track({
  track,
  showTrack,
}: {
  track: TrackType;
  showTrack: boolean;
}) {
  const { primaryColor, secondaryColor } = useColors();
  const layout: { visibility: "visible" | "none" | undefined } = {
    visibility: showTrack ? "visible" : "none",
  };

  return (
    <Source
      id="track-source"
      type="geojson"
      data={featureCollection(track)}
      cluster={true}
    >
      <Layer
        id="track"
        type="circle"
        layout={layout}
        paint={{ "circle-radius": 10, "circle-color": primaryColor }}
      ></Layer>
      <Layer
        id="track-cluster-count"
        type="symbol"
        layout={{
          ...layout,
          "text-field": ["coalesce", ["get", "point_count"], "1"],
          "text-size": 10,
        }}
        paint={{ "text-color": secondaryColor }}
      ></Layer>
    </Source>
  );
}
