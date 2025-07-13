import { featureCollection, point } from "@turf/turf";
import type { FeatureCollection } from "geojson";
import "maplibre-gl/dist/maplibre-gl.css";
import { useRef } from "react";
import {
  Layer,
  Map as MaplibreMap,
  Source,
  type MapRef,
} from "react-map-gl/maplibre";
import coloradoTrail from "../data/colorado-trail.json";
import useLocations from "../hooks/locations";
import useSegmentPoints from "../hooks/segment-points";
import { useColorModeValue } from "./ui/color-mode";

export default function Map({
  showSegmentDetails,
}: {
  showSegmentDetails: boolean;
}) {
  const mapRef = useRef<MapRef>(null);
  const mapStyle = useColorModeValue(
    "positron-gl-style",
    "dark-matter-gl-style"
  );
  const {
    centers: segmentCenters,
    starts: segmentStarts,
    ends: segmentEnds,
  } = useSegmentPoints();
  const locations = useLocations().map((location) =>
    point([location.longitude, location.latitude], {
      person: location.person,
      datetime: location.datetime,
    })
  );

  return (
    <MaplibreMap
      id="map"
      ref={mapRef}
      initialViewState={{
        bounds: [-108.03876, 37.33136, -105.09369, 39.5515],
        fitBoundsOptions: {
          padding: 20,
        },
      }}
      mapStyle={`https://basemaps.cartocdn.com/gl/${mapStyle}/style.json`}
      interactiveLayerIds={["colorado-trail"]}
    >
      <Source data={coloradoTrail as FeatureCollection} type="geojson">
        <Layer
          id="colorado-trail"
          type="line"
          paint={{ "line-width": 1 }}
        ></Layer>
      </Source>
      <Source data={segmentStarts} type="geojson">
        <Layer
          id="segment-starts"
          type="circle"
          layout={{ visibility: showSegmentDetails ? "visible" : "none" }}
          paint={{
            "circle-radius": 2,
          }}
        ></Layer>
      </Source>
      <Source data={segmentEnds} type="geojson">
        <Layer
          id="segment-ends"
          type="circle"
          layout={{ visibility: showSegmentDetails ? "visible" : "none" }}
          paint={{
            "circle-radius": 2,
          }}
        ></Layer>
      </Source>
      <Source data={featureCollection(locations)} type="geojson">
        <Layer
          id="locations"
          type="circle"
          paint={{
            "circle-radius": 6,
            "circle-color": [
              "match",
              ["get", "person"],
              "Bex",
              "#17A34A",
              "Kelly",
              "#2463EB",
              "black",
            ],
          }}
        ></Layer>
      </Source>
      <Source data={segmentCenters} type="geojson">
        <Layer
          id="segment-centers"
          type="circle"
          layout={{ visibility: showSegmentDetails ? "visible" : "none" }}
          paint={{
            "circle-radius": 8,
            "circle-stroke-width": 2,
            "circle-stroke-color": "black",
            "circle-color": "white",
          }}
        ></Layer>
        <Layer
          id="segment-centers-numbers"
          type="symbol"
          layout={{
            "text-field": ["get", "segment"],
            "text-size": 8,
            visibility: showSegmentDetails ? "visible" : "none",
          }}
        ></Layer>
      </Source>
    </MaplibreMap>
  );
}
