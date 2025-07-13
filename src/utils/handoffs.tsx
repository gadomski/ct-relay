import { midpoint } from "@turf/turf";
import data from "../data/handoffs.json";
import getLocations from "./locations";

export function getHandoffs() {
  return data.map((handoff) => {
    return {
      person: handoff.person as "Bex" | "Kelly",
      datetime: new Date(handoff.datetime),
    };
  });
}

export function getHandoffLocations() {
  const locations = getLocations();
  const handoffs = getHandoffs();
  return handoffs.map((handoff) => {
    for (let index = 0; index < locations.length - 1; index++) {
      const a = locations[index];
      const b = locations[index + 1];
      if (a.properties.datetime >= handoff.datetime) {
        return a;
      } else if (
        a.properties.datetime <= handoff.datetime &&
        handoff.datetime <= b.properties.datetime
      ) {
        const point = midpoint(a, b);
        if (!point.properties) {
          point.properties = {};
        }
        point.properties.person = handoff.person;
        point.properties.datetime = handoff.datetime;
        return point;
      }
    }
    throw new Error("Couldn't get the handoff location");
  });
}
