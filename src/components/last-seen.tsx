import { Avatar, Card } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Layer, Popup, Source, useMap } from "react-map-gl/maplibre";
import bexImg from "../img/bex.jpg";
import kellyImg from "../img/kelly.jpg";
import getLastSeen from "../utils/last-seen";
import { PERSON_COLORS } from "./colors";

export default function LastSeen() {
  const map = useMap();
  const lastSeen = getLastSeen();
  const [open, setOpen] = useState(true);
  const src = lastSeen.properties.person == "Bex" ? bexImg : kellyImg;

  useEffect(() => {
    if (map.current) {
      map.current.on("click", "last-seen-circle", () => {
        setOpen((previous) => (!previous ? true : false));
      });

      map.current.on("mouseenter", "last-seen-circle", () => {
        if (map.current) {
          map.current.getCanvas().style.cursor = "pointer";
        }
      });

      map.current.on("mouseleave", "last-seen-circle", () => {
        if (map.current) {
          map.current.getCanvas().style.cursor = "";
        }
      });
    }
  }, [map, lastSeen]);

  return (
    <>
      <Source data={lastSeen} type="geojson" id="last-seen">
        <Layer
          type="circle"
          id="last-seen-circle"
          paint={{ "circle-color": PERSON_COLORS, "circle-radius": 6 }}
        ></Layer>
      </Source>
      {open && (
        <Popup
          anchor="top"
          offset={10}
          longitude={lastSeen.geometry.coordinates[0]}
          latitude={lastSeen.geometry.coordinates[1]}
          closeButton={false}
          focusAfterOpen={false}
          onClose={() => {
            setOpen(false);
          }}
        >
          <Card.Root size={"sm"}>
            <Card.Body>
              <Avatar.Root>
                <Avatar.Fallback></Avatar.Fallback>
                <Avatar.Image src={src}></Avatar.Image>
              </Avatar.Root>
              <Card.Title>{lastSeen.properties.person}</Card.Title>
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
