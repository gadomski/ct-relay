import {
  Blockquote,
  Checkbox,
  Heading,
  Highlight,
  HStack,
  Separator,
  Span,
  Stack,
  Text,
} from "@chakra-ui/react";
import { LuCircle } from "react-icons/lu";
import useAppState from "../hooks/app-state";
import { BEX_SOLID, KELLY_SOLID } from "./colors";

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
  const { showTrack, setShowTrack } = useAppState();

  return (
    <Stack px={4} pt={6} gap={8}>
      <Stack gap={4}>
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

      <Separator></Separator>

      <Stack>
        <Checkbox.Root
          variant={"subtle"}
          checked={showTrack}
          onCheckedChange={(e) => setShowTrack(!!e.checked)}
        >
          <Checkbox.HiddenInput></Checkbox.HiddenInput>
          <Checkbox.Label>
            <HStack>
              <LuCircle color={BEX_SOLID} fill={BEX_SOLID}></LuCircle>
              <LuCircle color={KELLY_SOLID} fill={KELLY_SOLID}></LuCircle>
              Show track
            </HStack>
          </Checkbox.Label>
          <Checkbox.Control></Checkbox.Control>
        </Checkbox.Root>
      </Stack>
    </Stack>
  );
}
