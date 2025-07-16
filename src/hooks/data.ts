import { useQuery } from "@tanstack/react-query";
import {
  along,
  feature,
  getGeom,
  length,
  lineSlice,
  nearestPointOnLine,
  point,
} from "@turf/turf";
import type { Feature, FeatureCollection, LineString, Point } from "geojson";
import { useEffect, useState } from "react";
import type { Handoff, Legs, Track } from "../types/ct-relay";
import type { Track as GarminTrack } from "../types/garmin";

export default function useData() {
  const coloradoTrail = useColoradoTrail();
  const track = useTrack();
  const legs = useLegs(coloradoTrail, track);
  const segments = useSegments();

  return { coloradoTrail, legs, track, segments };
}

function useColoradoTrail() {
  return useDataFetch<Feature<LineString>>("colorado-trail.json");
}

function useTrack() {
  const [track, setTrack] = useState<Track>();
  const day_1 = useDataFetch<GarminTrack>("tracks/2025-07-12.json");
  const day_2 = useDataFetch<GarminTrack>("tracks/2025-07-13.json");
  const day_3 = useDataFetch<GarminTrack>("tracks/2025-07-14.json");
  const day_4 = useDataFetch<GarminTrack>("tracks/2025-07-15.json");
  const day_5 = useDataFetch<GarminTrack>("tracks/2025-07-16.json");

  useEffect(() => {
    if (day_1 && day_2 && day_3 && day_4 && day_5) {
      const seen = new Set();
      const track = [...day_1.M, ...day_2.M, ...day_3.M, ...day_4.M, ...day_5.M]
        .flatMap((message) =>
          message.A.flatMap((payload) =>
            payload.Locations.map((location) => {
              if (location.M && !seen.has(location.M)) {
                seen.add(location.M);
                return point([location.N, location.L], {
                  datetime: new Date(location.D),
                });
              } else {
                return null;
              }
            })
          )
        )
        .filter((point) => !!point);
      track.sort((a, b) => +a.properties.datetime - +b.properties.datetime);
      setTrack(track);
    }
  }, [day_1, day_2, day_3, day_4, day_5]);

  return track;
}

function useLegs(
  coloradoTrail: Feature<LineString> | undefined,
  track: Track | undefined
) {
  const [legs, setLegs] = useState<Legs>();
  const rawHandoffs = useDataFetch<Handoff[]>("handoffs.json");

  useEffect(() => {
    if (rawHandoffs && coloradoTrail && track) {
      const handoffs = rawHandoffs.map((handoff) => {
        return { ...handoff, datetime: new Date(handoff.datetime) };
      });
      const legs = [];
      let startPosition = point(coloradoTrail.geometry.coordinates[0]);
      let person = handoffs[0].person;
      let handoffIndex = 1;
      let day = 1;
      const makeLeg = (endPosition: Feature<Point>) => {
        const l = getGeom(lineSlice(startPosition, endPosition, coloradoTrail));
        l.coordinates[0][2] = startPosition.geometry.coordinates[2];
        l.coordinates[l.coordinates.length - 1][2] =
          endPosition.geometry.coordinates[2];
        return feature(l, {
          person,
          day,
        });
      };
      for (let index = 0; index < track.length; index++) {
        const trackPoint = track[index];
        const handoff = handoffs.at(handoffIndex);
        if (index == track.length - 1) {
          // End of track
          const endPosition = nearestPointOnLine(coloradoTrail, trackPoint);
          legs.push(makeLeg(endPosition));
        } else if (
          handoff &&
          index > 0 &&
          handoff.datetime < trackPoint.properties.datetime
        ) {
          // Handoff
          const endPosition = interpolate(
            coloradoTrail,
            track[index - 1],
            trackPoint,
            handoff.datetime
          );
          legs.push(makeLeg(endPosition));
          person = handoff.person;
          startPosition = endPosition;
          handoffIndex += 1;
        } else if (
          trackPoint.properties.datetime.getDay() !=
          track[index + 1].properties.datetime.getDay()
        ) {
          const midnight = new Date(track[index + 1].properties.datetime);
          midnight.setHours(0, 0, 0);
          const endPosition = interpolate(
            coloradoTrail,
            trackPoint,
            track[index + 1],
            midnight
          );
          legs.push(makeLeg(endPosition));
          startPosition = endPosition;
          day += 1;
        }
      }
      setLegs(legs);
    }
  }, [rawHandoffs, coloradoTrail, track]);

  return legs;
}

function useSegments() {
  return useDataFetch<FeatureCollection<LineString>>(
    "colorado-trail-segments.json"
  );
}

function useDataFetch<T>(path: string) {
  const { data } = useQuery<T>({
    queryKey: [path],
    queryFn: async () => {
      return await fetch(import.meta.env.BASE_URL + "/" + path).then(
        (response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("could not fetch data at path: " + path);
          }
        }
      );
    },
  });
  return data;
}

function interpolate(
  trail: Feature<LineString>,
  start: Feature<Point, { datetime: Date }>,
  end: Feature<Point, { datetime: Date }>,
  datetime: Date
) {
  const delta =
    (+datetime - +start.properties.datetime) /
    (+end.properties.datetime - +start.properties.datetime);
  const trailSlice = lineSlice(start, end, trail);
  const interpolatedLength = length(trailSlice) * delta;
  const p = along(trailSlice, interpolatedLength);
  const info = nearestPointOnLine(trail, p);
  p.geometry.coordinates[2] =
    trail.geometry.coordinates[info.properties.index][2];
  return p;
}
