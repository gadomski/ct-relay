import { FormatNumber, Span, Stack, Table, Text } from "@chakra-ui/react";
import { length } from "@turf/turf";
import dayjs from "dayjs";
import type { Feature, LineString } from "geojson";
import { BEX_COLOR, KELLY_COLOR } from "../hooks/colors";
import type { Legs, Person, Track } from "../types/ct-relay";

export default function Progress({
  coloradoTrail,
  legs,
  track,
}: {
  coloradoTrail: Feature<LineString>;
  legs: Legs;
  track: Track;
}) {
  const lastSeen = track[track.length - 1];
  const getLength = (line: Feature<LineString>) =>
    Number(length(line, { units: "miles" }).toFixed(1));
  const completed = legs.map((leg) => getLength(leg)).reduce((n, v) => n + v);
  const total = getLength(coloradoTrail);
  const daysCompleted = Math.max(...legs.map((leg) => leg.properties.day));
  const bexMiles = new Array(daysCompleted).fill(0);
  const kellyMiles = new Array(daysCompleted).fill(0);
  const totalMiles = new Array(daysCompleted).fill(0);
  legs.forEach((leg) => {
    const index = leg.properties.day - 1;
    const distance = getLength(leg);
    totalMiles[index] += distance;
    switch (leg.properties.person) {
      case "Bex":
        bexMiles[index] += distance;
        break;
      case "Kelly":
        kellyMiles[index] += distance;
        break;
    }
  });

  return (
    <Stack>
      <Text>
        As of {dayjs(lastSeen.properties.datetime).fromNow()}, they've completed{" "}
        <Span fontWeight={"bolder"} fontSize={"lg"}>
          <FormatNumber
            style="percent"
            value={completed / total}
          ></FormatNumber>
        </Span>
        .
      </Text>

      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Day</Table.ColumnHeader>
            <Table.ColumnHeader>Bex 🚵‍♀️</Table.ColumnHeader>
            <Table.ColumnHeader>Kelly 🏃‍♀️</Table.ColumnHeader>
            <Table.ColumnHeader>Total</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {totalMiles.map((total, i) => (
            <Table.Row key={"day-" + (i + 1)}>
              <Table.Cell>{i + 1}</Table.Cell>
              <Table.Cell>
                <PersonMiles person="Bex" miles={bexMiles[i]}></PersonMiles>
              </Table.Cell>
              <Table.Cell>
                <PersonMiles person="Kelly" miles={kellyMiles[i]}></PersonMiles>
              </Table.Cell>
              <Table.Cell>
                <FormatNumber
                  value={total}
                  unit="mile"
                  style="unit"
                ></FormatNumber>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Stack>
  );
}

function PersonMiles({ person, miles }: { person: Person; miles: number }) {
  return (
    <Text color={person == "Bex" ? BEX_COLOR : KELLY_COLOR} fontWeight={"bold"}>
      {miles == 0 ? (
        "—"
      ) : (
        <FormatNumber value={miles} unit="mile" style="unit"></FormatNumber>
      )}
    </Text>
  );
}
