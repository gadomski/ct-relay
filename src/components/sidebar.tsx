import { Heading, Span, Stack, Text } from "@chakra-ui/react";

export default function Sidebar() {
  return (
    <Stack px={4} pt={6} gap={4}>
      <Heading>
        <Span fontWeight="bold" bg="green.emphasized" color="green.fg" p="1">
          Bex 🚴‍♀️
        </Span>{" "}
        and{" "}
        <Span fontWeight={"bold"} bg="blue.emphasized" color="blue.fg" p="1">
          Kelly 🏃‍♀️
        </Span>{" "}
        relay the <abbr title="Colorado Trail">CT</abbr>
      </Heading>
      <Text fontWeight={"lighter"} fontSize={"sm"}>
        Summer 2025
      </Text>
    </Stack>
  );
}
