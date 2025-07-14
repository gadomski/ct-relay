import {
  Blockquote,
  FormatNumber,
  Heading,
  Highlight,
  Span,
  Stack,
  Table,
  Text,
} from "@chakra-ui/react";
import { feature, length, type Units } from "@turf/turf";
import dayjs from "dayjs";
import useAppState from "../hooks/app-state";
import { BEX_SOLID, KELLY_SOLID } from "../hooks/person-colors";

const KELLY = {
  fontWeight: "bold",
  bg: "blue.emphasized",
  color: "blue.fg",
};

const BEX = {
  fontWeight: "bold",
  bg: "green.emphasized",
  color: "green.fg",
};

export default function Sidebar() {
  return (
    <Stack px={4} pt={6} gap={8}>
      <Stack>
        <Heading>
          <Span p="1" {...BEX}>
            Bex 🚴‍♀️
          </Span>{" "}
          and{" "}
          <Span p="1" {...KELLY}>
            Kelly 🏃‍♀️
          </Span>{" "}
          relay the <abbr title="Colorado Trail">CT</abbr>
        </Heading>
        <Text fontWeight={"lighter"} fontSize={"sm"}>
          Summer 2025
        </Text>
        <Blockquote.Root>
          <Blockquote.Content>
            <Highlight query={"Kelly"} styles={KELLY}>
              The Colorado trail is 490 miles (From Denver to Durango) with
              89,000' of elevation gain. The route also traverses six wilderness
              areas. Just before and after each of these wilderness areas is
              where Kelly and I will exchange our baton and she will run through
              those sections, as those zones do not allow any wheels on the
              ground! The wilderness sections are especially beautiful and
              rugged!
            </Highlight>
          </Blockquote.Content>
          <Blockquote.Caption>
            —{" "}
            <cite>
              <Span {...BEX}>Bex</Span>
            </cite>
          </Blockquote.Caption>
        </Blockquote.Root>
      </Stack>

      <Mileage></Mileage>
    </Stack>
  );
}

function Mileage() {
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
                  <FormatNumber
                    value={bex[i]}
                    style="unit"
                    unit="mile"
                  ></FormatNumber>
                </Table.Cell>
                <Table.Cell color={KELLY_SOLID} fontWeight={"bold"}>
                  <FormatNumber
                    value={kelly[i]}
                    style="unit"
                    unit="mile"
                  ></FormatNumber>
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
