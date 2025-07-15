import { FormatNumber, Span, Stack, Table, Text } from "@chakra-ui/react";
import { feature, length, type Units } from "@turf/turf";
import dayjs from "dayjs";
import useAppState from "../hooks/app-state";
import { BEX_SOLID, KELLY_SOLID } from "../hooks/person-colors";

export default function Mileage() {
  const { coloradoTrail, legs, track } = useAppState();
  const units = { units: "miles" as Units };
  const completed = Number(
    legs.reduce((n, leg) => n + length(leg, units), 0).toFixed(0)
  );
  const total = Number(length(feature(coloradoTrail), units).toFixed(0));
  const startMidnight = new Date(track[0].properties.datetime).setHours(
    0,
    0,
    0,
    0
  );
  const endMidnight = new Date(
    track[track.length - 1].properties.datetime
  ).setHours(0, 0, 0, 0);
  const days = dayjs(endMidnight).diff(startMidnight, "day");
  const bex = new Array(days + 1).fill(0);
  const kelly = new Array(days + 1).fill(0);
  const perDay = new Array(days + 1).fill(0);
  legs.forEach((leg) => {
    const day = dayjs(leg.properties.endDatetime).diff(startMidnight, "day");
    const distance = Number(length(leg, units).toFixed(1));
    perDay[day] += distance;
    switch (leg.properties.person) {
      case "Bex":
        bex[day] += distance;
        break;
      case "Kelly":
        kelly[day] += distance;
        break;
    }
  });
  const cumSum = (a: number[]) => {
    let sum = 0;
    return a.map((n) => (sum += n));
  };
  const cumulative = cumSum(perDay);

  return (
    <Stack>
      <Text>
        As of {dayjs(track[track.length - 1].properties.datetime).fromNow()},
        they've completed{" "}
        <Span fontWeight={"bolder"} fontSize={"lg"}>
          <FormatNumber
            value={completed / total}
            style={"percent"}
          ></FormatNumber>
        </Span>
        .
      </Text>

      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Day</Table.ColumnHeader>
            <Table.ColumnHeader>Bex 🚴‍♀️</Table.ColumnHeader>
            <Table.ColumnHeader>Kelly 🏃‍♀️</Table.ColumnHeader>
            <Table.ColumnHeader>Total</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {perDay.map((_, i) => {
            return (
              <Table.Row key={"day-" + i}>
                <Table.Cell>{i + 1}</Table.Cell>
                <Table.Cell color={BEX_SOLID} fontWeight={"bold"}>
                  {bex[i] == 0 ? (
                    "—"
                  ) : (
                    <FormatNumber
                      value={bex[i]}
                      style="unit"
                      unit="mile"
                    ></FormatNumber>
                  )}
                </Table.Cell>
                <Table.Cell color={KELLY_SOLID} fontWeight={"bold"}>
                  {kelly[i] == 0 ? (
                    "—"
                  ) : (
                    <FormatNumber
                      value={kelly[i]}
                      style="unit"
                      unit="mile"
                    ></FormatNumber>
                  )}
                </Table.Cell>
                <Table.Cell>
                  <FormatNumber
                    value={cumulative[i]}
                    style="unit"
                    unit="mile"
                  ></FormatNumber>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </Stack>
  );
}
