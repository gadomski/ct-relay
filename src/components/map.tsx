import { ButtonGroup, HStack, IconButton } from "@chakra-ui/react";
import "maplibre-gl/dist/maplibre-gl.css";
import { useRef } from "react";
import { LuRadio } from "react-icons/lu";
import {
  Map as MaplibreMap,
  NavigationControl,
  ScaleControl,
  type MapRef,
} from "react-map-gl/maplibre";
import useAppState from "../hooks/app-state";
import ColoradoTrail from "./colorado-trail";
import Legs from "./legs";
import "./map.css";
import Track from "./track";
import { ColorModeButton, useColorModeValue } from "./ui/color-mode";

export default function Map() {
  const mapRef = useRef<MapRef>(null);
  const mapStyle = useColorModeValue(
    "positron-gl-style",
    "dark-matter-gl-style"
  );
  const { showTrack } = useAppState();

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
      {showTrack && <Track></Track>}
      <ColoradoTrail></ColoradoTrail>
      <NavigationControl></NavigationControl>
      <ScaleControl unit="imperial"></ScaleControl>
      <HStack
        position={"absolute"}
        top={0}
        left={0}
        margin={4}
        background={"bg.panel"}
        boxShadow={"md"}
        rounded={4}
      >
        <ButtonGroup variant={"ghost"} gap={0}>
          <ColorModeButton></ColorModeButton>
          <IconButton asChild>
            <a href="https://share.garmin.com/JOYQV" target="_blank">
              <LuRadio></LuRadio>
            </a>
          </IconButton>
        </ButtonGroup>
      </HStack>
    </MaplibreMap>
  );
}
