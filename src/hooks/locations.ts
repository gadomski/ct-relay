import { point } from "@turf/turf";
import type { FeatureCollection } from "geojson";
import rawTransitions from "../data/transitions.json";
import rawUpdateUser from "../data/update-user.json";
import type { Transition } from "../types/custom";
import type { Message, UpdateUser } from "../types/garmin";

export default function useLocations(): FeatureCollection {
  const updateUser: Message<UpdateUser> = rawUpdateUser;
  return {
    type: "FeatureCollection",
    features: updateUser.M.flatMap((payload) =>
      payload.A.flatMap((payload) =>
        payload.Locations.map((location) => {
          const datetime = new Date(location.D);
          return point([location.N, location.L], {
            person: getActivePerson(datetime),
            datetime,
          });
        })
      )
    ),
  };
}

function getActivePerson(datetime: Date) {
  const transitions: Transition[] = rawTransitions.map((transition) => {
    return {
      datetime: new Date(transition.datetime),
      person: transition.person as "Bex" | "Kelly",
    };
  });
  const lastTransition = transitions.find((transition, index) => {
    if (index + 1 >= transitions.length) {
      return true;
    } else if (
      transition.datetime <= datetime &&
      datetime <= transitions[index + 1].datetime
    ) {
      return true;
    } else {
      return false;
    }
  });
  return lastTransition?.person;
}
