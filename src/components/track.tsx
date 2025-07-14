import { Button, Card, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { featureCollection } from "@turf/turf";
import type { Feature, Point } from "geojson";
import { useEffect, useState } from "react";
import { Layer, Popup, Source, useMap } from "react-map-gl/maplibre";
import useAppState from "../hooks/app-state";
import type { Checkin } from "../types/ct-relay";
import { PERSON_COLORS } from "./colors";
import { PersonAvatar } from "./person";

export default function Track() {
  const { track, showTrack } = useAppState();
  const map = useMap();
  const [hover, setHover] = useState<string | number>();
  const [click, setClick] = useState<Feature<Point, Checkin>>();

  useEffect(() => {
    if (map.current) {
      map.current.on("mouseenter", "track", (e) => {
        if (e.features) {
          setHover(e.features.at(0)?.id);
        }
        if (map.current) {
          map.current.getCanvas().style.cursor = "pointer";
        }
      });

      map.current.on("click", "track", (e) => {
        if (e.features) {
          setClick(e.features.at(0) as Feature<Point, Checkin> | undefined);
        }
      });

      map.current.on("mouseleave", "track", () => {
        setHover(undefined);
        if (map.current) {
          map.current.getCanvas().style.cursor = "";
        }
      });
    }
  }, [map]);

  return (
    <>
      <Source
        type="geojson"
        id="track-source"
        data={featureCollection(track)}
        cluster={true}
      >
        <Layer
          type="circle"
          id="track"
          layout={{
            visibility: showTrack ? "visible" : "none",
          }}
          paint={{
            "circle-color": PERSON_COLORS,
            "circle-radius": [
              "case",
              ["==", ["id"], hover || -1],
              10,
              ["==", ["id"], click?.id || -1],
              10,
              6,
            ],
            "circle-stroke-color": "black",
            "circle-stroke-width": 2,
          }}
        ></Layer>
      </Source>
      {click && (
        <Popup
          longitude={click.geometry.coordinates[0]}
          latitude={click.geometry.coordinates[1]}
          onClose={() => setClick(undefined)}
          closeButton={false}
          offset={10}
        >
          <TrackPopupCard
            feature={click}
            onClose={() => setClick(undefined)}
          ></TrackPopupCard>
        </Popup>
      )}
    </>
  );
}

function TrackPopupCard({
  feature,
  onClose,
}: {
  feature: Feature<Point, Checkin>;
  onClose: () => void;
}) {
  return (
    <Card.Root
      colorPalette={feature.properties.person == "Bex" ? "green" : "blue"}
    >
      <Card.Body>
        <Stack gap={3}>
          <Text fontWeight={"light"}>Track</Text>
          <HStack>
            <PersonAvatar person={feature.properties.person}></PersonAvatar>
            <Heading size={"md"}>{feature.properties.person}</Heading>
          </HStack>
          <Text>
            {new Date(
              feature.properties.datetime as unknown as string
            ).toLocaleString()}
          </Text>
        </Stack>
      </Card.Body>
      <Card.Footer justifyContent={"flex-end"}>
        <Button onClick={onClose} size={"xs"}>
          Close
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}
