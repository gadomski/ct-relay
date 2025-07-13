import rawTransitions from "../data/transitions.json";
import data from "../data/update-user.json";

export default function useLocations() {
  const transitions = rawTransitions.map((transition) => {
    return { ...transition, datetime: new Date(transition.datetime) };
  });
  const getPerson = (datetime: Date) => {
    for (let index = 0; index < transitions.length - 1; index++) {
      if (
        datetime >= transitions[index].datetime &&
        datetime <= transitions[index + 1].datetime
      ) {
        return transitions[index].person;
      }
      return transitions[transitions.length - 1].person;
    }
  };
  return data.M.flatMap((message) =>
    message.A.flatMap((message) =>
      message.Locations.map((location) => {
        const datetime = new Date(location.D);
        return {
          latitude: location.L,
          longitude: location.N,
          datetime,
          person: getPerson(datetime),
        };
      })
    )
  );
}
