import getLocations from "./locations";

export default function getLastSeen() {
  const locations = getLocations();
  return locations[locations.length - 1];
}
