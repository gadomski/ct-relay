import { point } from "@turf/turf";
import track_0 from "../data/tracks/0.json";
import track_1 from "../data/tracks/1.json";
import type { Handoff, Location } from "../types/ct-relay";
import type { Track } from "../types/garmin";
import { getHandoffs } from "./handoffs";

export default function getLocations() {
  const handoffs = getHandoffs();
  const locations = updateLocations(
    updateLocations([], handoffs, track_0),
    handoffs,
    track_1
  );
  return locations.sort(
    (a, b) => a.properties.datetime - b.properties.datetime
  );
}

function updateLocations(
  locations: Location[],
  handoffs: Handoff[],
  track: Track
) {
  return locations.concat(
    track.M.flatMap((message) =>
      message.A.flatMap((payload) =>
        payload.Locations.map((location) => {
          const datetime = new Date(location.D);
          const person = getPerson(handoffs, datetime);
          return point([location.N, location.L], {
            datetime,
            person,
          });
        })
      )
    )
  );
}

function getPerson(handoffs: Handoff[], datetime: Date) {
  for (let index = 0; index < handoffs.length - 1; index++) {
    const a = handoffs[index];
    const b = handoffs[index + 1];
    if (datetime >= a.datetime && datetime <= b.datetime) {
      return a.person;
    }
  }
  return handoffs[handoffs.length - 1].person;
}
