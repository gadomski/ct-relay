import { point } from "@turf/turf";
import type { FeatureCollection } from "geojson";
import data from "../data/update-user.json";
import type { Message, UpdateUser } from "../types/garmin";

export default function useLocations(): FeatureCollection {
  const updateUser: Message<UpdateUser> = data;
  return {
    type: "FeatureCollection",
    features: updateUser.M.flatMap((payload) =>
      payload.A.flatMap((payload) =>
        payload.Locations.map((location) => {
          return point([location.N, location.L]);
        })
      )
    ),
  };
}
