import {
  Blockquote,
  Heading,
  Highlight,
  SkeletonText,
  Span,
  Stack,
  Text,
} from "@chakra-ui/react";
import type { Feature, LineString } from "geojson";
import type { Legs, Track } from "../types/ct-relay";
import Progress from "./progress";

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

export default function Info({
  coloradoTrail,
  legs,
  track,
}: {
  coloradoTrail: Feature<LineString> | undefined;
  legs: Legs | undefined;
  track: Track | undefined;
}) {
  return (
    <Stack px={4} pt={6} gap={8}>
      <Stack>
        <Heading>
          <Span p="1" {...BEX}>
            Bex 🚵‍♀️
          </Span>{" "}
          and{" "}
          <Span p="1" {...KELLY}>
            Kelly 🏃‍♀️
          </Span>{" "}
          relay the <abbr title="Colorado Trail">CT</abbr> 🏔️
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

      {(coloradoTrail && legs && track && (
        <Progress
          coloradoTrail={coloradoTrail}
          track={track}
          legs={legs}
        ></Progress>
      )) || (
        <SkeletonText
          noOfLines={10}
          gap={4}
          loading={!coloradoTrail || !legs || !track}
        ></SkeletonText>
      )}
    </Stack>
  );
}
