import {
  Button,
  ButtonGroup,
  Checkbox,
  Drawer,
  HStack,
  IconButton,
  Stack,
} from "@chakra-ui/react";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useState } from "react";
import { LuExternalLink, LuInfo, LuRadio } from "react-icons/lu";
import useAppState from "../hooks/app-state";
import Info from "./info";
import "./map.css";
import { ColorModeButton } from "./ui/color-mode";

export default function Control() {
  const {
    showTrack,
    setShowTrack,
    showSegments,
    setShowSegments,
    showOpenTopoMap,
    setShowOpenTopoMap,
  } = useAppState();
  const [showInfo, setShowInfo] = useState(false);
  const [segmentsChecked, setSegmentsChecked] = useState(showSegments);
  const [trackChecked, setTrackChecked] = useState(showTrack);
  const [openTopoMapChecked, setOpenTopoMapChecked] = useState(showOpenTopoMap);

  useEffect(() => {
    setShowSegments(segmentsChecked);
  }, [segmentsChecked, setShowSegments]);

  useEffect(() => {
    setShowTrack(trackChecked);
  }, [trackChecked, setShowTrack]);

  useEffect(() => {
    setShowOpenTopoMap(openTopoMapChecked);
  }, [openTopoMapChecked, setShowOpenTopoMap]);

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
        <Checkbox.Root
          variant={"subtle"}
          checked={openTopoMapChecked}
          onCheckedChange={(e) => setOpenTopoMapChecked(!!e.checked)}
        >
          <Checkbox.HiddenInput></Checkbox.HiddenInput>
          <Checkbox.Control></Checkbox.Control>
          <Checkbox.Label>
            <HStack>Show OpenTopoMap</HStack>
          </Checkbox.Label>
        </Checkbox.Root>
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
              <Info></Info>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>
    </>
  );
}
