import {
  ButtonGroup,
  Checkbox,
  Drawer,
  HStack,
  IconButton,
  Stack,
} from "@chakra-ui/react";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useState } from "react";
import { LuInfo, LuRadio } from "react-icons/lu";
import {
  Map as MaplibreMap,
  NavigationControl,
  ScaleControl,
  type MapRef,
} from "react-map-gl/maplibre";
import useAppState from "../hooks/app-state";
import ColoradoTrail from "./colorado-trail";
import Info from "./info";
import Legs from "./legs";
import "./map.css";
import Segments from "./segments";
import Track from "./track";
import { ColorModeButton, useColorModeValue } from "./ui/color-mode";

export default function Map() {
  const mapRef = useRef<MapRef>(null);
  const mapStyle = useColorModeValue(
    "positron-gl-style",
    "dark-matter-gl-style"
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
      interactiveLayerIds={["track"]}
    >
      <Legs></Legs>
      <ColoradoTrail></ColoradoTrail>
      <Segments></Segments>
      <Track></Track>
      <NavigationControl></NavigationControl>
      <ScaleControl unit="imperial"></ScaleControl>
      <MapControl></MapControl>
    </MaplibreMap>
  );
}

function MapControl() {
  const { showTrack, setShowTrack, showSegments, setShowSegments } =
    useAppState();
  const [showInfo, setShowInfo] = useState(false);
  const [segmentsChecked, setSegmentsChecked] = useState(showSegments);
  const [trackChecked, setTrackChecked] = useState(showTrack);

  useEffect(() => {
    setShowSegments(segmentsChecked);
  }, [segmentsChecked, setShowSegments]);

  useEffect(() => {
    setShowTrack(trackChecked);
  }, [trackChecked, setShowTrack]);

  return (
    <>
      <Stack
        position={"absolute"}
        top={0}
        left={0}
        margin={4}
        background={"bg.panel"}
        boxShadow={"md"}
        rounded={4}
        px={4}
        pb={2}
        pt={4}
        gap={4}
      >
        <Checkbox.Root
          variant={"subtle"}
          checked={segmentsChecked}
          onCheckedChange={(e) => setSegmentsChecked(!!e.checked)}
        >
          <Checkbox.HiddenInput></Checkbox.HiddenInput>
          <Checkbox.Control></Checkbox.Control>
          <Checkbox.Label>
            <HStack>Show segments</HStack>
          </Checkbox.Label>
        </Checkbox.Root>
        <Checkbox.Root
          variant={"subtle"}
          checked={trackChecked}
          onCheckedChange={(e) => setTrackChecked(!!e.checked)}
        >
          <Checkbox.HiddenInput></Checkbox.HiddenInput>
          <Checkbox.Control></Checkbox.Control>
          <Checkbox.Label>
            <HStack>Show track</HStack>
          </Checkbox.Label>
        </Checkbox.Root>
        <ButtonGroup variant={"ghost"} gap={0} size={"sm"}>
          <ColorModeButton></ColorModeButton>
          <IconButton asChild>
            <a href="https://share.garmin.com/JOYQV" target="_blank">
              <LuRadio></LuRadio>
            </a>
          </IconButton>
          <IconButton hideFrom={"md"} onClick={() => setShowInfo(true)}>
            <LuInfo></LuInfo>
          </IconButton>
        </ButtonGroup>
      </Stack>
      <Drawer.Root open={showInfo} onOpenChange={(e) => setShowInfo(e.open)}>
        <Drawer.Backdrop></Drawer.Backdrop>
        <Drawer.Trigger></Drawer.Trigger>
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Body>
              <Info></Info>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>
    </>
  );
}
