import {
  GridItem,
  Heading,
  SimpleGrid,
  Span,
  Stack,
  Text,
} from "@chakra-ui/react";
import Map from "./components/map";

export default function App() {
  return (
    <>
      <SimpleGrid columns={4}>
        <GridItem shadow={"inset"}>
          <Stack p={4} gap={4}>
            <Heading size={"2xl"}>A Colorado Trail relay</Heading>
            <Text>
              Brought to you by{" "}
              <Span
                fontWeight="bold"
                bg="green.emphasized"
                color="green.fg"
                p="1"
              >
                Bex 🚴‍♀️
              </Span>{" "}
              and{" "}
              <Span
                fontWeight={"bold"}
                bg="blue.emphasized"
                color="blue.fg"
                p="1"
              >
                Kelly 🏃‍♀️
              </Span>
            </Text>
          </Stack>
        </GridItem>
        <GridItem colSpan={3} h={"100dvh"}>
          <Map></Map>
        </GridItem>
      </SimpleGrid>
    </>
  );
}
