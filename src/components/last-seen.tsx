import { Avatar, Card } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Layer, Popup, Source, useMap } from "react-map-gl/maplibre";
import bexImg from "../img/bex.jpg";
import kellyImg from "../img/kelly.jpg";
import getLastSeen from "../utils/last-seen";
import { PERSON_COLORS } from "./colors";

interface PopupInfo {
  person: "Bex" | "Kelly";
  datetime: Date;
  src: string;
}

export default function LastSeen() {
  const map = useMap();
  const lastSeen = getLastSeen();
  const [popupInfo, setPopupInfo] = useState<PopupInfo | undefined>({
    person: lastSeen.properties.person,
    datetime: lastSeen.properties.datetime,
    src: lastSeen.properties.person == "Bex" ? bexImg : kellyImg,
  });

  useEffect(() => {
    if (map.current) {
      map.current.on("click", "last-seen-circle", () => {
        setPopupInfo({
          person: lastSeen.properties.person,
          datetime: lastSeen.properties.datetime,
          src: lastSeen.properties.person == "Bex" ? bexImg : kellyImg,
        });
      });
    }
  }, [map, lastSeen]);

  return (
    <>
      <Source data={lastSeen} type="geojson" id="last-seen">
        <Layer
          type="circle"
          id="last-seen-circle"
          paint={{ "circle-color": PERSON_COLORS }}
        ></Layer>
      </Source>
      {popupInfo && (
        <Popup
          anchor="top"
          offset={10}
          longitude={lastSeen.geometry.coordinates[0]}
          latitude={lastSeen.geometry.coordinates[1]}
          onClose={() => setPopupInfo(undefined)}
          closeButton={false}
        >
          <Card.Root size={"sm"} variant={"subtle"}>
            <Card.Body>
              <Avatar.Root>
                <Avatar.Fallback></Avatar.Fallback>
                <Avatar.Image src={kellyImg}></Avatar.Image>
              </Avatar.Root>
              <Card.Title>Kelly</Card.Title>
              <Card.Description>
                {lastSeen.properties.datetime.toLocaleString()}
              </Card.Description>
            </Card.Body>
          </Card.Root>
        </Popup>
      )}
    </>
  );
}
