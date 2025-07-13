import { Checkbox, Heading, Span, Stack, Text } from "@chakra-ui/react";

export default function Sidebar({
  showSegmentDetails,
  setShowSegmentDetails,
}: {
  showSegmentDetails: boolean;
  setShowSegmentDetails: (showSegmentDetails: boolean) => void;
}) {
  return (
    <Stack px={4} pt={8} gap={4}>
      <Heading>
        <Span fontWeight="bold" bg="green.emphasized" color="green.fg" p="1">
          Bex 🚴‍♀️
        </Span>{" "}
        and{" "}
        <Span fontWeight={"bold"} bg="blue.emphasized" color="blue.fg" p="1">
          Kelly 🏃‍♀️
        </Span>{" "}
        do a <abbr title="Colorado Trail">CT</abbr> relay
      </Heading>
      <Text fontWeight={"lighter"} fontSize={"sm"}>
        Summer 2025
      </Text>
      <Checkbox.Root
        checked={showSegmentDetails}
        onCheckedChange={(e) => setShowSegmentDetails(!!e.checked)}
      >
        <Checkbox.HiddenInput></Checkbox.HiddenInput>
        <Checkbox.Label>Show segment details?</Checkbox.Label>
        <Checkbox.Control></Checkbox.Control>
      </Checkbox.Root>
    </Stack>
  );
}
