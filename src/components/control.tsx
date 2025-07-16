import {
  Button,
  ButtonGroup,
  Checkbox,
  Drawer,
  Flex,
  IconButton,
  Stack,
} from "@chakra-ui/react";
import type { Feature, LineString } from "geojson";
import { useState } from "react";
import { LuExternalLink, LuInfo, LuRadio } from "react-icons/lu";
import type { Legs, Track } from "../types/ct-relay";
import Info from "./info";
import { ColorModeButton } from "./ui/color-mode";

export default function Control({
  showSegments,
  setShowSegments,
  showTrack,
  setShowTrack,
  showOpenTopoMap,
  setShowOpenTopoMap,
  coloradoTrail,
  legs,
  track,
}: {
  showSegments: boolean;
  setShowSegments: (showSegments: boolean) => void;
  showTrack: boolean;
  setShowTrack: (showTrack: boolean) => void;
  showOpenTopoMap: boolean;
  setShowOpenTopoMap: (showOpenTopoMap: boolean) => void;
  coloradoTrail: Feature<LineString> | undefined;
  legs: Legs | undefined;
  track: Track | undefined;
}) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <Flex>
      <Stack
        p={4}
        bg={"bg.panel"}
        boxShadow={"md"}
        pointerEvents={"auto"}
        gap={4}
      >
        <Stack>
          <Checkbox.Root
            variant={"subtle"}
            checked={showSegments}
            onCheckedChange={(e) => setShowSegments(!!e.checked)}
          >
            <Checkbox.HiddenInput></Checkbox.HiddenInput>
            <Checkbox.Control></Checkbox.Control>
            <Checkbox.Label>Show segments</Checkbox.Label>
          </Checkbox.Root>
          <Checkbox.Root
            variant={"subtle"}
            checked={showTrack}
            onCheckedChange={(e) => setShowTrack(!!e.checked)}
          >
            <Checkbox.HiddenInput></Checkbox.HiddenInput>
            <Checkbox.Control></Checkbox.Control>
            <Checkbox.Label>Show track</Checkbox.Label>
          </Checkbox.Root>
          <Checkbox.Root
            variant={"subtle"}
            checked={showOpenTopoMap}
            onCheckedChange={(e) => setShowOpenTopoMap(!!e.checked)}
          >
            <Checkbox.HiddenInput></Checkbox.HiddenInput>
            <Checkbox.Control></Checkbox.Control>
            <Checkbox.Label>Show OpenTopoMap</Checkbox.Label>
          </Checkbox.Root>
        </Stack>
        <ButtonGroup variant={"subtle"} size={"sm"}>
          <Button asChild>
            <a href="https://share.garmin.com/JOYQV" target="_blank">
              <LuRadio></LuRadio>
              Live tracking
              <LuExternalLink></LuExternalLink>
            </a>
          </Button>
          <IconButton hideFrom={"md"} onClick={() => setShowInfo(true)}>
            <LuInfo></LuInfo>
          </IconButton>
          <ColorModeButton></ColorModeButton>
        </ButtonGroup>
      </Stack>
      <Drawer.Root open={showInfo} onOpenChange={(e) => setShowInfo(e.open)}>
        <Drawer.Backdrop></Drawer.Backdrop>
        <Drawer.Trigger></Drawer.Trigger>
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Body>
              <Info
                coloradoTrail={coloradoTrail}
                legs={legs}
                track={track}
              ></Info>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>
    </Flex>
  );
}
