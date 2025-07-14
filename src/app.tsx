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
import day_1 from "./data/tracks/2025-07-12.json";
import day_2 from "./data/tracks/2025-07-13.json";
import day_3 from "./data/tracks/2025-07-14.json";
import type { Checkin, Person } from "./types/ct-relay";
import type { Track } from "./types/garmin";

export default function App() {
  const coloradoTrail = (rawColoradoTrail as FeatureCollection<LineString>)
    .features[0].geometry;
  const handoffs = getHandoffs(rawHandoffs);
  const track = getTrack([day_1, day_2, day_3], handoffs);
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
      <SimpleGrid columns={{ base: 1, md: 3 }} h={"100dvh"}>
        <GridItem
          shadow={"inset"}
          hideBelow={"md"}
          h={"100%"}
          overflow={"scroll"}
        >
          <Sidebar></Sidebar>
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 2 }}>
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

function getTrack(rawTracks: Track[], handoffs: Checkin[]) {
  const seen = new Set<number>();
  const points = rawTracks
    .flatMap((track) =>
      track.M.flatMap((m) =>
        m.A.flatMap((a) =>
          a.Locations.map((location) => {
            if (seen.has(location.M)) {
              return null;
            } else {
              seen.add(location.M);
              const datetime = new Date(location.D);
              const person = getActivePerson(handoffs, datetime);
              return point(
                [location.N, location.L],
                {
                  person,
                  datetime,
                },
                { id: location.M }
              );
            }
          })
        )
      )
    )
    .filter((value) => !!value);
  points.sort(
    (a, b) => a.properties.datetime.getTime() - b.properties.datetime.getTime()
  );
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
  let handoffIndex = 0;
  for (let index = 0; index < track.length - 1; index++) {
    const handoff = handoffs.at(handoffIndex);
    const a = track[index];
    const b = track[index + 1];

    if (handoff && handoff.datetime < a.properties.datetime) {
      handoffPoints.push(a);
      handoffIndex += 1;
    } else if (
      a.properties.datetime.getDay() != b.properties.datetime.getDay()
    ) {
      const midnight = new Date(b.properties.datetime);
      midnight.setHours(0, 0, 0, 0);
      const p = interpolate(a, b, midnight);
      handoffPoints.push(point(p.geometry.coordinates, a.properties));
    } else if (handoff && handoff.datetime <= b.properties.datetime) {
      const p = interpolate(a, b, handoff.datetime);
      handoffPoints.push(point(p.geometry.coordinates, handoff));
      handoffIndex += 1;
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
        startDatetime: a.properties.datetime,
        endDatetime: b.properties.datetime,
      })
    );
  }
  return legs;
}

function interpolate(
  a: Feature<Point, Checkin>,
  b: Feature<Point, Checkin>,
  datetime: Date
) {
  const delta =
    (+datetime - +a.properties.datetime) /
    (+b.properties.datetime - +a.properties.datetime);
  const fullDistance = distance(a, b);
  const path = shortestPath(a, b);
  return along(path, delta * fullDistance);
}
