import { GridItem, SimpleGrid } from "@chakra-ui/react";
import {
  along,
  distance,
  feature,
  lineSlice,
  point,
  shortestPath,
} from "@turf/turf";
import type { Feature, FeatureCollection, LineString, Point } from "geojson";
import { useState } from "react";
import Map from "./components/map";
import Sidebar from "./components/sidebar";
import { Context } from "./context";
import rawColoradoTrail from "./data/colorado-trail.json";
import rawHandoffs from "./data/handoffs.json";
import rawTrack from "./data/track.json";
import type { Checkin, Person } from "./types/ct-relay";
import type { Track } from "./types/garmin";

export default function App() {
  const coloradoTrail = (rawColoradoTrail as FeatureCollection<LineString>)
    .features[0].geometry;
  const handoffs = getHandoffs(rawHandoffs);
  const track = getTrack(rawTrack, handoffs);
  const handoffPoints = getHandoffPoints(track, handoffs);
  const legs = getLegs(coloradoTrail, handoffPoints, track[track.length - 1]);
  const [showTrack, setShowTrack] = useState(false);

  return (
    <Context.Provider
      value={{
        coloradoTrail,
        track,
        legs,
        showTrack,
        setShowTrack,
      }}
    >
      <SimpleGrid columns={{ base: 2, md: 4 }} h={"100dvh"}>
        <GridItem shadow={"inset"} hideBelow={"md"}>
          <Sidebar></Sidebar>
        </GridItem>
        <GridItem colSpan={{ base: 2, md: 3 }}>
          <Map></Map>
        </GridItem>
      </SimpleGrid>
    </Context.Provider>
  );
}

function getHandoffs(rawHandoffs: { person: string; datetime: string }[]) {
  return rawHandoffs.map(({ person, datetime }) => {
    return { person: person as Person, datetime: new Date(datetime) };
  });
}

function getTrack(rawTrack: Track, handoffs: Checkin[]) {
  let id = 0;
  const points = rawTrack.M.flatMap((m) =>
    m.A.flatMap((a) =>
      a.Locations.map((location) => {
        const datetime = new Date(location.D);
        const person = getActivePerson(handoffs, datetime);
        return point(
          [location.N, location.L],
          {
            person,
            datetime,
          },
          { id: id++ }
        );
      })
    )
  );
  points.sort((a, b) => +a.properties.datetime - +b.properties.datetime);
  return points;
}

function getActivePerson(handoffs: Checkin[], datetime: Date) {
  for (let index = 0; index < handoffs.length - 1; index++) {
    const a = handoffs[index];
    const b = handoffs[index + 1];
    if (datetime < b.datetime) {
      return a.person;
    }
  }
  return handoffs[handoffs.length - 1].person;
}

function getHandoffPoints(
  track: Feature<Point, Checkin>[],
  handoffs: Checkin[]
) {
  const handoffPoints: Feature<Point, Checkin>[] = [];
  for (let index = 0; index < track.length - 1; index++) {
    if (handoffPoints.length >= handoffs.length) {
      break;
    }
    const handoff = handoffs[handoffPoints.length];
    const a = track[index];
    const b = track[index + 1];

    if (handoff.datetime < a.properties.datetime) {
      handoffPoints.push(a);
    } else if (handoff.datetime <= b.properties.datetime) {
      const delta =
        (+handoff.datetime - +a.properties.datetime) /
        (+b.properties.datetime - +a.properties.datetime);
      const fullDistance = distance(a, b);
      const path = shortestPath(a, b);
      const p = along(path, delta * fullDistance);
      handoffPoints.push(point(p.geometry.coordinates, handoff));
    }
  }
  return handoffPoints;
}

function getLegs(
  coloradoTrail: LineString,
  handoffPoints: Feature<Point, Checkin>[],
  lastSeen: Feature<Point, Checkin>
) {
  const legs = [];
  for (let index = 0; index < handoffPoints.length; index++) {
    const a = handoffPoints[index];
    const b =
      index + 1 == handoffPoints.length ? lastSeen : handoffPoints[index + 1];
    legs.push(
      feature(lineSlice(a, b, coloradoTrail).geometry, {
        person: a.properties.person,
      })
    );
  }
  return legs;
}
