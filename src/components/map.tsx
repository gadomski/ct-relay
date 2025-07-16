import { Box, Center, Spinner, Text, VStack } from "@chakra-ui/react";
import type { Feature, FeatureCollection, LineString } from "geojson";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useState } from "react";
import {
  Map as MaplibreMap,
  NavigationControl,
  ScaleControl,
  type MapRef,
} from "react-map-gl/maplibre";
import type { Legs, Track as TrackType } from "../types/ct-relay";
import Control from "./control";
import OpenTopoMap from "./open-topo-map";
import Segments from "./segments";
import Track from "./track";
import Trail from "./trail";
import { useColorModeValue } from "./ui/color-mode";

export default function Map({
  coloradoTrail,
  legs,
  segments,
  track,
}: {
  coloradoTrail: Feature<LineString> | undefined;
  legs: Legs | undefined;
  segments: FeatureCollection<LineString> | undefined;
  track: TrackType | undefined;
}) {
  const [loading, setLoading] = useState(true);
  const [showSegments, setShowSegments] = useState(true);
  const [showTrack, setShowTrack] = useState(false);
  const [showOpenTopoMap, setShowOpenTopoMap] = useState(false);
  const mapRef = useRef<MapRef>(null);
  const mapStyle = useColorModeValue(
    "positron-gl-style",
    "dark-matter-gl-style"
  );

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.on("load", () => setLoading(false));
    }
  });

  return (
    <Box position={"relative"} h={"full"}>
      {loading && <Loading></Loading>}
      <MaplibreMap
        id="map"
        ref={mapRef}
        initialViewState={{
          bounds: [-108.03876, 37.33136, -105.09369, 39.5515],
          fitBoundsOptions: {
            padding: {
              top: 20,
              left: 20,
              right: 20,
              bottom: 120,
            },
          },
        }}
        mapStyle={`https://basemaps.cartocdn.com/gl/${mapStyle}/style.json`}
      >
        {coloradoTrail && legs && segments && track && (
          <>
            <OpenTopoMap showOpenTopoMap={showOpenTopoMap}></OpenTopoMap>
            <Trail coloradoTrail={coloradoTrail} legs={legs}></Trail>
            <Segments
              segments={segments}
              showSegments={showSegments}
            ></Segments>
            <Track track={track} showTrack={showTrack}></Track>
            <NavigationControl></NavigationControl>
            <ScaleControl
              unit="imperial"
              position="top-left"
              style={{ marginTop: "200px", marginLeft: "20px" }}
            ></ScaleControl>
          </>
        )}
      </MaplibreMap>
      <Box position={"absolute"} inset={4} pointerEvents={"none"}>
        <Control
          showSegments={showSegments}
          setShowSegments={setShowSegments}
          showTrack={showTrack}
          setShowTrack={setShowTrack}
          showOpenTopoMap={showOpenTopoMap}
          setShowOpenTopoMap={setShowOpenTopoMap}
          legs={legs}
          coloradoTrail={coloradoTrail}
          track={track}
        ></Control>
      </Box>
    </Box>
  );
}

function Loading() {
  return (
    <Box position="absolute" inset={0} userSelect={"none"}>
      <Center h={"full"}>
        <VStack fontSize={"xl"} gap={8}>
          <Spinner size={"lg"} />
          <VStack>
            <Text>We ❤️ maps</Text>
            <Text>🚵‍♀️ 🏔️ 🏃‍♀️</Text>
          </VStack>
        </VStack>
      </Center>
    </Box>
  );
}
