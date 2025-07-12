import { Button, Heading, HStack, Span, Stack, Text } from "@chakra-ui/react";
import { LuExternalLink } from "react-icons/lu";
import useLocations from "../hooks/locations";

export default function Sidebar() {
  const locations = useLocations();
  locations.features.sort(
    (a, b) => b.properties?.datetime - a.properties?.datetime
  );

  return (
    <Stack p={4} gap={4}>
      <Heading size={"2xl"}>A Colorado Trail relay</Heading>
      <Text>
        Brought to you by{" "}
        <Span fontWeight="bold" bg="green.emphasized" color="green.fg" p="1">
          Bex 🚴‍♀️
        </Span>{" "}
        and{" "}
        <Span fontWeight={"bold"} bg="blue.emphasized" color="blue.fg" p="1">
          Kelly 🏃‍♀️
        </Span>
      </Text>
      <HStack>
        <Button variant={"outline"} asChild>
          <a href="https://share.garmin.com/JOYQV/" target="_blank">
            Live tracking <LuExternalLink></LuExternalLink>
          </a>
        </Button>
      </HStack>
      <Text fontSize={"sm"} fontWeight={"light"}>
        These data were last updated{" "}
        {locations.features[0].properties?.datetime.toLocaleString()}.
      </Text>
    </Stack>
  );
}
